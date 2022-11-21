// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Footer, BackToTop } from '../../components';
import MainRoutes from '../../routes/MainRoutes';
import Auth from '../../services/auth';

// NAVIGATION CONFIG
import NavModel from '../../config/navigation.json';
import NavModelInstitution from '../../config/navigationInstitution.json';
import NavModelLaboratory from '../../config/navigationLaboratory.json';
import NavModelManager from '../../config/navigationManager.json';
import NavModelPhysician from '../../config/navigationPhysician.json';
import NavModelMaster from '../../config/navigationMaster.json';
import NavModelClient from '../../config/navigationClient.json';

class App extends Component {

	static propTypes = {
		// react-router 4:
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		// views:
		currentView: PropTypes.string
	};

	state = {
		NModel: NavModel
	};

	componentWillMount() {
		const user = Auth.getUserInfo();
		// Sets the navbar accordingly to the user profile
		const profile = user ? user.profile.toUpperCase() : '';

		if (profile === Auth.PROFILE_ADMIN) {
			this.setState({ NModel: NavModelAdmin });
		} else if (profile === Auth.PROFILE_HEALTHUNIT) {
			this.setState({ NModel: NavModelInstitution });
		} else if (profile === Auth.PROFILE_LABORATORY) {
			this.setState({ NModel: NavModelLaboratory });
		} else if (profile === Auth.PROFILE_MANAGER) {
			this.setState({ NModel: NavModelManager });
		} else if (profile === Auth.PROFILE_PHYSICIAN) {
			this.setState({ NModel: NavModelPhysician });
		} else if (profile === Auth.PROFILE_CLIENT) {
			this.setState({ NModel: NavModelClient });
		} else if (profile === Auth.PROFILE_MASTER || profile === Auth.PROFILE_SUPERVISOR || profile === Auth.PROFILE_HEALTHOPERATOR) {
			this.setState({ NModel: NavModelMaster });
		} else {
			this.setState({ NModel: NavModel });
		}
	}

	render() {
		const { NModel } = this.state;
		const { currentView } = this.props;
		return (
			<div id="appContainer">
				<Header model={NModel} view={currentView} />
				<div id="mainContainer" className="container-fluid page-wrapper">
					<MainRoutes />
				</div>
				<Footer />
				<BackToTop minScrollY={40} scrollTo={'appContainer'} />
			</div>
		);
	}
}

export default App;
