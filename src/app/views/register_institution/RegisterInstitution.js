// @flow weak
/* eslint-disable no-console */

import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import RegisterInstitutionForm from './RegisterInstitutionForm';
import AnimatedView from '../../components/animatedView/AnimatedView';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';

class RegisterInstitution extends PureComponent {

  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // views:
    currentView: PropTypes.string.isRequired,
    enterRegisterInstitution: PropTypes.func.isRequired,
    leaveRegisterInstitution: PropTypes.func.isRequired,
    // institution:
    isFetching: PropTypes.bool,
    insertInstitutionIfNeeded: PropTypes.func.isRequired,
    // cities
    isFetchingCities: PropTypes.bool,
    getCitiesIfNeeded: PropTypes.func.isRequired,
    //states
    isFetchingStates: PropTypes.bool,
    getStatesIfNeeded: PropTypes.func.isRequired,

    //address
    
    getAddressByZipcode: PropTypes.func.isRequired
  };

  state = {
    listStates: [],
    states: [{ value: '', text: 'Selecione' }],
    cities: [{ value: '', text: 'Selecione' }],
    disableAddress: false,
    disableAddressZipCode: false,
    lastZipCode: null,
    canViewForm: false,
    disablePhones: false,
    newPhone: false,
    newAddress: false,
  }

  static defaultProps = {
    isFetchingCities: false,
    isFetchingStates: false,
    isFetching: false
  }

  componentDidMount() {
    const { enterRegisterInstitution } = this.props;
    enterRegisterInstitution();

    this.getStates();

    this.getAddressByCep('');

  }

  componentWillUnmount() {
    const { leaveRegisterInstitution } = this.props;
    leaveRegisterInstitution();
  }

  submit = async (values) => {
    try {

      const User = {
        Name: values.fantasyName,
        Login: values.cnpj,
        Email: values.institutionEmail,
        Password: values.password,
        UserType: 12
      }

      const Phones = {
        DDD: values.ddd,
        Number: values.number,
        Branch: values.branch

      }

      const Address = {
        Zip_Code: values.zip_code,
        Street: values.address,
        Number: values.addressNumber,
        District: values.district,
        City: values.city,
        State: values.uf,
        Complement: values.complement
      }

      const HealthUnit = {

        Corporate_Name: values.corporateName,
        Contact_Name: values.ownerName,
        Corporate_Email: values.ownerEmail,
        Fantasy_Name: values.fantasyName,
        Id_HeadquartersHealthUnit: values.institutions,
        CNPJ: values.cnpj,
        User: User,
        Phones: [Phones],
        Address: Address,
        newPhone: this.state.newPhone,
        newAddress: this.state.newAddress,
      }


      if (HealthUnit.User.Password !== values.passwordConfirmation) {
        UIkit.modal.alert("A senha e a confirmação de senha diferem");
        return;
      }


      const { insertInstitutionIfNeeded } = this.props;
      const response = await insertInstitutionIfNeeded(HealthUnit);
      
      if (response.error !== undefined) {
        UIkit.modal.alert('Erro ao realizar cadastro: ' + response.error.response.data.Message);
        return;
      }
      if (response.payload.status === 200) {
        UIkit.modal.alert('Cadastro Realizado com Sucesso. O seu Login é: ' + values.cnpj.replace('/', '').replace(".", '').replace(".", '').replace('-', ''));
        const {
          history
        } = this.props;
        history.push({ pathname: '/' });

      }

      if (response.payload.status === 400) {
        UIkit.modal.alert("Erro interno (400)");
        return;
      }
    }
    catch (error) {
      console.log('post institution went wrong..., error: ', error);
    }
  }




  handleNewAddress = () => {

    this.setState({newAddress: true})
    this.enableAddressFields();
    this.props.changeFieldValue("zip_code", '');
    this.props.changeFieldValue("address", '');
    this.props.changeFieldValue("addressNumber", '');
    this.props.changeFieldValue("complement", '');
    this.props.changeFieldValue("district", '');
    this.props.changeFieldValue("uf", '');    

    const cities = [{ value: '', text: 'Selecione' }];
    this.setState({ cities: cities }, () => callback());    
  }


  handleNewPhone = () => {
    this.setState({disablePhones: false})
    this.setState({newPhone: true})
    this.props.changeFieldValue("ddd", '');   
    this.props.changeFieldValue("number", '');   
    this.props.changeFieldValue("branch", '');   
    
  }



	handleSearch = async () => {
		try {

      
      var cnpj = (document.querySelector('input[name=cnpj]')).value;
      
			if (cnpj != '') {
        
        cnpj = cnpj.replace('-', '') 
        cnpj = cnpj.replaceAll('.', '') 
        cnpj = cnpj.replace('/', '') 
				const { getInstitutionIfNeeded } = this.props;
				const response = await getInstitutionIfNeeded(cnpj, 0);
        const { data } = response.payload;


        if (!data || data.length == 0) {
          this.setState({ canViewForm: true })
          this.props.changeFieldValue("fantasyName", '');
          this.props.changeFieldValue("corporateName", '');
          this.props.changeFieldValue("institutionEmail", '');
        }
        else if (data.campaigns.length > 0)
        {
          UIkit.modal.alert("Instituição já cadastrada");
          this.props.changeFieldValue("cnpj", '');   
          return;
        }
        else
        {
          
          this.setState({ canViewForm: true })
          this.props.changeFieldValue("fantasyName", data.fantasy_Name);
          this.props.changeFieldValue("corporateName", data.corporate_Name);
          this.props.changeFieldValue("institutionEmail", data.corporate_Email);

          if (data.address != undefined)
          {
            this.props.changeFieldValue("zip_code", data.address.zip_Code);
            this.props.changeFieldValue("address", data.address.street);
            this.props.changeFieldValue("addressNumber", data.address.number);
            this.props.changeFieldValue("complement", data.address.complement);
            this.props.changeFieldValue("district", data.address.district);
            this.props.changeFieldValue("uf", data.address.state);
            
            //Atualiza combo de cidades
            this.getCityByState(data.address.state.toUpperCase(), () => this.props.changeFieldValue('city', data.address.city.toUpperCase()));
            this.disableAddressZipCodeFields();
          }

          if (data.phones.length > 0)
          {
            //this.setState({ disablePhones: true })
            this.props.changeFieldValue("ddd", data.phones[0].ddd);
            this.props.changeFieldValue("number", data.phones[0].number);
            this.props.changeFieldValue("branch", data.phones[0].branch);
          }
        }
        

      }
		} catch (error) {
			console.log('get instituition went wrong..., error: ', error);
		}
	}


  handleStateChange = async (values) => {
    try {

      const state = document.getElementById('uf').value;

      this.getCityByState(state);

    } catch (error) {
      console.log('get cities went wrong..., error: ', error);
    }
  }

  getCityByState = async (state, callback) => {
    try {

      const { getCitiesIfNeeded } = this.props;
      const request = await getCitiesIfNeeded(state);
      const { data } = request.payload;
      
      if (!data || data.length == 0) {
        return;
      }

      const cities = [{ value: '', text: 'Selecione' }];

      data.forEach(city => {
        cities.push({ value: city.name, text: city.name });
      }, this);

      this.setState({ cities: cities }, () => callback());

    } catch (e) {
      console.error('getCityByState went wrong..., error: ', e);
    }
  }

  getStates = async () => {
    try {
      const { getStatesIfNeeded } = this.props;
      const response = await getStatesIfNeeded();

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);
        return;
      }

      if (response.payload.status === 204) {
        UIkit.modal.alert("Nenhum estado encontrado");
        return;
      }

      const { data } = response.payload;
      const states = [{ value: '', text: 'Selecione' }];

      data.forEach(state => {
        states.push({ value: state.state, text: state.state });
      }, this);

      this.setState({ states: states });
      this.setState({ listStates: data });

    } catch (error) {
      console.log('get states went wrong..., error: ', error);
    }
  }

  handleCepOnChange = async (e) => {
    try {

      this.clearAddressForm();

      const cep = e.target.value.replace(/[^0-9]/g, '');
      if (cep.length < 8 || this.state.lastZipCode == cep) {

        this.enableAddressFields();

        return;

      }

      this.getAddressByCep(cep);

    } catch (e) {
      console.error('handleCepOnChange went wrong..., error: ', e);
    }
  }

  enableAddressFields = () => this.setState({ disableAddress: false });

  enableAddressZipCodeFields = () => this.setState({ disableAddressZipCode: false });

  clearAddressForm = () => {
    try {

      this.props.changeFieldValue("address", '');
      this.props.changeFieldValue("district", '');
      this.props.changeFieldValue("uf", '');
      this.props.changeFieldValue("city", '');

      this.setState({ cities: [{ value: '', text: 'Selecione' }] });

    } catch (e) {
      console.error('clearAddressForm went wrong..., error: ', e);
    }
  }

  getAddressByCep = async (cep) => {
    try {
    
      const request = await this.props.getAddressByZipcode(cep);
      const response = request.payload.data.Return;

      this.setState({ lastZipCode: cep });

      this.disableAddressZipCodeFields();

      if (!response) {
        this.enableAddressFields();
        this.enableAddressZipCodeFields();

        return;
      }

      this.fillAddressFields(response);

    } catch (e) {

    }
  }

  disableAddressFields = () => {
    this.setState({ disableAddress: true });
    this.setState({ disableAddressZipCode: true });
  }

  disableAddressZipCodeFields = () => {
    this.setState({ disableAddressZipCode: true });
  }

  fillAddressFields = (data) => {
    try {

      this.props.changeFieldValue("address", data.LOGRNome.toUpperCase());
      this.props.changeFieldValue("district", data.BAINome.toUpperCase());
      this.props.changeFieldValue("uf", data.LOCUF.toUpperCase());

      this.getCityByState(data.LOCUF.toUpperCase(), () => this.props.changeFieldValue("city", data.LOCNome.toUpperCase()));        

    } catch (e) {
      console.error('fillAddressFields went wrong..., error: ', e);
    }
  }

  render() {
    return (
      <AnimatedView>
        <div style={{ minHeight: '60vh' }} className="uk-container uk-container-center">
          <h1 className="uk-h1 uk-margin-top uk-text-center-small">
            CADASTRO DE INSTITUIÇÃO
          </h1>
          <hr />

          <RegisterInstitutionForm
            onSubmit={this.submit}
            isSubmitFetching={this.props.isFetching}
            handleStateChange={this.handleStateChange}
            cities={this.state.cities}
            states={this.state.states}
            disableAddress={this.state.disableAddress}
            disableAddressZipCode={this.state.disableAddressZipCode}
            handleCepOnChange={this.handleCepOnChange}
            handleSearch={this.handleSearch}
            handleNewAddress={this.handleNewAddress}
            canViewForm={this.state.canViewForm}
            disablePhones={this.state.disablePhones}
            handleNewPhone={this.handleNewPhone}
            isFetchingGet = {this.props.isFetchingGet}
          />
        </div>
      </AnimatedView>
    );
  }
}

RegisterInstitution = reduxForm({
  form: 'RegisterInstitution'
})(RegisterInstitution);

function mapStateToProps(state) {
  return {
    formValues: state.form
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('RegisterInstitutionForm', field, value));
    },
    untouchField: function (field) {
      dispatch(untouch('RegisterInstitutionForm', field));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterInstitution);
