// @flow weak

import axios from 'axios';
import Auth from '../../services/auth';
import getLocationOrigin from '../../services/utils/getLocationOrigin'

export const FETCH_MOCK = 'FETCH_MOCK';
export const FETCH = 'FETCH';

const fetchMiddleware = store => next => action => {
	if (!action.fetch) {
		return next(action);
	}

	if (!action.fetch.type ||
		!action.fetch.type === FETCH_MOCK ||
		!action.fetch.type === FETCH) {
		return next(action);
	}

	if (!action.fetch.actionTypes) {
		return next(action);
	}

	/**
	 * fetch mock
	 * @type {[type]}
	 */
	if (action.fetch.type === FETCH_MOCK) {
		if (!action.fetch.mockResult) {
			throw new Error('Fetch middleware require a mockResult payload when type is "FETCH_MOCK"');
		}

		const {
			actionTypes: { request, success },
			mockResult
		} = action.fetch;

		// request
		store.dispatch({ type: request });

		// received successful for mock
		return Promise.resolve(
			store.dispatch({
				type: success,
				payload: {
					status: 200,
					data: mockResult
				}
			})
		);
	}

	if (action.fetch.type === FETCH) {
		const {
			actionTypes: { request, success, fail },
			url,
			method,
			headers,
			options
		} = action.fetch;

		// request
		store.dispatch({ type: request });

		let token = Auth.getToken();

		// fetch server (success or fail)
		// returns a Promise
		return axios.request({
			method,
			url,
			withCredentials: false,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': token ? `Bearer ${token}` : '',
				...headers
			},
			...options
		})
			.then(data => store.dispatch({ type: success, payload: data }))
			.catch(err => handleUnauthorizedToken(store, action.fetch, token, err));
	}
	return next(action);
};

function handleUnauthorizedToken(store, fetch, token, err) {
	const {
		actionTypes: { fail }
	} = fetch;

	if (err.response.status === 401) {
		return refreshToken(store, fetch, token);
	} else {
		console.error('Error Variable: ', err.response);
		return store.dispatch({ type: fail, error: err });
	}
}

function refreshToken(store, fetch, token) {
	const {
		url,
		method,
		headers,
		options,
		actionTypes: { success, fail }
	} = fetch;

	const tokenDecoded = Auth.decodedJWT(token);
	let user = Auth.getUserInfo()

	return axios.request({
		url: `${getLocationOrigin()}/api/Authentication`,
		method: 'POST',
		withCredentials: false,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': token ? `Bearer ${token}` : '',
			...headers
		},
		data: {
			grantType: 'refresh_token',
			Login: tokenDecoded ? tokenDecoded.unique_name : '',
			refreshToken: user && user.refreshToken ? user.refreshToken : ''
		}

	})
		.then(response => {
			Auth.clearUserInfo();
			Auth.clearToken();

			const { user, refreshToken, accessToken, created, expiration } = response.data;
			if (accessToken) {
				Auth.setToken(accessToken);
			}
			let newUser = { ...user, authDate: created, token: accessToken, refreshToken, expiration };
			Auth.setUserInfo(newUser);

			return newUser;
		})
		.then(newUser =>
			axios.request({
				url,
				method,
				withCredentials: false,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': newUser ? `Bearer ${newUser.token}` : '',
					...headers
				},
				...options
			})
			.then(data => store.dispatch({ type: success, payload: data }))
			.catch(err => {
				console.error('Error Variable: ', err.response);
				return store.dispatch({ type: fail, error: err });
			})
		)
		.catch(err => {
			console.error('Error Variable: ', err.response);
			return store.dispatch({ type: fail, error: err });
		});
}

export default fetchMiddleware;
