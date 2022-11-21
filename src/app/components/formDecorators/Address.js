import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Column from './Column';
import Input from './Input';
import Select from './Select';
import { Field } from 'redux-form';
import Configs from '../../config/Configs.json';
import * as addressActions from '../../redux/modules/address';

const required = (value) => value ? undefined : 'Obrigatório';
class Address extends PureComponent {
	constructor(props) {
		super(props);

		this.fillFields(props.fullAddress);
	}

	state = {
		isCepFetching: false,
		lastZipCode: '',
		isGetStatesFetching: false,
		id: 0
	}

	static PropTypes = {
		changeFieldValue: PropTypes.func.isRequired
	}

	static defaultProps = {
		allowEditing: true,
		fullAddress: {
			zipCode: '',
			state: '',
			city: '',
			district: '',
			publicPlace: '',
			number: '',
			complement: ''
		}
	}

	handleOnCepChange = async (cep) => {
		const {
			changeFieldValue,
			id
		} = this.props;

		try {
			if (!this.state.isCepFetching) {
				this.setState({ isCepFetching: true });

				const _cep = cep.target.value.replace(/[^0-9]/g, '');
				if (_cep.length === 8 && this.state.lastZipCode !== _cep) {

					const response = await this.props.getAddressByZipcode(_cep);
					const ret = response.payload.data.Return;

					if (ret != undefined) {
						changeFieldValue('state' + id, ret.LOCUF);
						changeFieldValue('city' + id, ret.LOCNome);
						changeFieldValue('district' + id, ret.BAINome);
						changeFieldValue('publicPlace' + id, ret.LOGRNome);
					} else {
						changeFieldValue('state' + id, '');
						changeFieldValue('city' + id, '');
						changeFieldValue('district' + id, '');
						changeFieldValue('publicPlace' + id, '');
					}

					this.setState({ lastZipCode: _cep });
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			this.setState({ isCepFetching: false });
		}
	}

	componentWillReceiveProps(nextProps) {
		this.fillFields(nextProps.fullAddress);
		if(nextProps.id){
			this.setState({id})
		}
	}

	fillFields(fullAddress) {
		if (fullAddress && fullAddress.zipCode !== this.state.lastZipCode) {
			this.props.changeFieldValue('zipCode' + this.state.id, fullAddress.zipCode);
			this.props.changeFieldValue('state' + this.state.id, fullAddress.state);
			this.props.changeFieldValue('city' + this.state.id, fullAddress.city);
			this.props.changeFieldValue('district' + this.state.id, fullAddress.district);
			this.props.changeFieldValue('publicPlace' + this.state.id, fullAddress.publicPlace);
			this.props.changeFieldValue('number' + this.state.id, fullAddress.number);
			this.props.changeFieldValue('complement' + this.state.id, fullAddress.complement);

			this.setState({ lastZipCode: fullAddress.zipCode });
		}
	}

	render() {
		const {
			allowEditing,
			id
		} = this.props;

		return (
			<div>
				<Grid styleNames="uk-grid-small">
				<Column col={2} cols={10} size="medium" styleNames="uk-margin-bottom uk-margin-right">
						<Field
							name={"zipCode" + id}
							label="CEP"
							type="text"
							mask="99999-999"
							validate={[required]}
							onChange={this.handleOnCepChange}
							component={Input}
							disabled={!allowEditing} />
					</Column>
				</Grid>
				<Grid styleNames="uk-grid-small">
					<Column col={1} cols={10} size="medium" styleNames="uk-margin-bottom uk-margin-right">
						<Field
							name={"state" + id}
							label="UF"
							validate={[required]}
							options={Configs.UF}
							onChange={this.handleOnStateChange}
							component={Select}
							disabled={!allowEditing} />
					</Column>
					<Column col={4} cols={10} size="medium" styleNames="uk-margin-bottom uk-margin-right">
						<Field
							name={"city" + id}
							label="Cidade"
							type="text"
							validate={[required]}
							component={Input}
							disabled={!allowEditing} />
					</Column>
					<Column col={4} cols={10} size="medium" styleNames="uk-margin-bottom uk-margin-right">
						<Field
							name={"district" + id}
							label="Bairro"
							type="text"
							validate={[required]}
							component={Input}
							disabled={!allowEditing} />
					</Column>
				</Grid>
				<Grid styleNames="uk-grid-small">
					<Column col={4} cols={10} size="medium" styleNames="uk-margin-bottom uk-margin-right">
						<Field
							name={"publicPlace" + id}
							label="Logradouro"
							type="text"
							validate={[required]}
							component={Input}
							disabled={!allowEditing} />
					</Column>
					<Column col={1} cols={10} size="medium" styleNames="uk-margin-bottom uk-margin-right">
						<Field
							name={"number" + id}
							label="Número"
							type="text"
							validate={[required]}
							component={Input}
							disabled={!allowEditing} />
					</Column>
					<Column col={4} cols={10} size="medium" styleNames="uk-margin-bottom uk-margin-right">
						<Field
							name={"complement" + id}
							label="Complemento"
							component={Input}
							disabled={!allowEditing} />
					</Column>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {

	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			getCities: addressActions.getCitiesIfNeeded,
			getAddressByZipcode: addressActions.getAddressByZipcodeIfNeeded
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Address);
