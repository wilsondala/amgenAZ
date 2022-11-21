// @flow weak
/* eslint-disable no-console */

import { PureComponent } from 'react';
import React from 'react';

import { connect } from 'react-redux';

import { change } from 'redux-form';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import _ from 'lodash';

import AnimatedView from '../../components/animatedView/AnimatedView';
import RegisterPhysicianForm from './RegisterPhysicianForm';
import Modal from './components/modal/Modal';

class RegisterPhysician extends PureComponent {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // views:
    currentView: PropTypes.string.isRequired,
    enterRegisterPhysician: PropTypes.func.isRequired,
    leaveRegisterPhysician: PropTypes.func.isRequired,
    // consumer:
    isFetching: PropTypes.bool,
    insertPhysicianIfNeeded: PropTypes.func.isRequired,
    // states
    isFetchingStates: PropTypes.bool,
    getStatesIfNeeded: PropTypes.func.isRequired,
    // health units
    getHealthUnitListIfNeeded: PropTypes.func.isRequired,
    getHealthUnitByUnscodIfNeeded: PropTypes.func.isRequired
  };

  state = {
    listStates: [],
    states: [{ value: '', text: 'Selecione' }],
    canHandle: false,
    physician: [],
    healthUnits: [{ value: '', text: 'Selecione' }],
    labelHealthUnit1: false,
    fantasyNameHealthUnit1: '',
    cnpjHealthUnit1: '',
    addressHealthUnit1: '',
    labelHealthUnit2: false,
    fantasyNameHealthUnit2: '',
    cnpjHealthUnit2: '',
    addressHealthUnit2: '',
    registerAddress1: false,
    registerAddress2: false,
    specialty: [
      { value: '', text: 'Selecione' },
      { value: '13', text: 'ONCOLOGISTA' },
      { value: '24', text: 'PATOLOGISTA' },
      { value: '99', text: 'OUTROS' }
    ],
    isOtherSpecialty: false,
    otherSpecialty: [{ id: '', description: '' }],
    showModal: false
  };

  static defaultProps = {
    isFetching: false
  };

  componentDidMount() {
    const { enterRegisterPhysician } = this.props;
    this.getStates();
    this.getHealthUnits();
    enterRegisterPhysician();
  }

  componentWillUnmount() {
    const { leaveRegisterPhysician } = this.props;
    leaveRegisterPhysician();
  }

  submit = async (values) => {
    try {
      const Accepts = {
        RegulationAccept: values.regulationAccept,
        ContactAccept: values.contactAccept,
        DataAccept: values.dataAccept
      };

      const HealthUnits = [];
      HealthUnits.push({ Id: values.healthUnit1 });
      if (values.healthUnit2) {
        HealthUnits.push({ Id: values.healthUnit2 });
      }

      if (values.zipCode1) {
        HealthUnits[0] = {
          Id: values.healthUnit1,
          Address: {
            Zip_Code: values.zipCode1,
            State: values.state1,
            City: values.city1,
            District: values.district1,
            Street: values.publicPlace1,
            Number: values.number1,
            Complement: values.Complement1 ? values.complement1 : null
          }
        };
      }

      if (values.zipCode2) {
        HealthUnits[1] = {
          Id: values.healthUnit2,
          Address: {
            Zip_Code: values.zipCode2,
            State: values.state2,
            City: values.city2,
            District: values.district2,
            Street: values.publicPlace2,
            Number: values.number2,
            Complement: values.Complement2 ? values.complement2 : null
          }
        };
      }

      const Phones = {
        DDD: values.ddd,
        Number: values.number,
        Branch: values.branch
      };

      const User = {
        Email: values.email,
        Password: values.password,
        Name: values.name,
        UserType: 9,
        Login: values.crm.concat(values.crm_uf)
      };

      let specialty = values.specialty;
      if (values.specialty == '99') {
        specialty = this.state.otherSpecialty.id;
      }

      // Chamar serviço
      const physicianModel = {
        Name: values.name,
        CRM: values.crm,
        CRM_UF: values.crm_uf,
        Email: values.email,
        Phones: [Phones],
        User: User,
        EspCod: specialty,
        HealthUnits: HealthUnits,
        Accept: true
      };

      if (physicianModel.User.Password !== values.passwordConfirmation) {
        UIkit.modal.alert('A senha e a confirmação de senha diferem.');
        return;
      }

      if (this.validatePassword() == -1) {
        UIkit.modal.alert('A senha deve conter no mínimo 8 caracteres.');
        return;
      }
      if (this.validatePassword() < 4) {
        UIkit.modal.alert(
          'A senha deve conter letras maiúsculas, letras minúsculas, números e caracteres especiais.'
        );
        return;
      }

      physicianModel.CRM_UF = values.crm_uf;
      physicianModel.User.Login = physicianModel.CRM.concat(
        physicianModel.CRM_UF
      );

      const { insertPhysicianIfNeeded } = this.props;
      const response = await insertPhysicianIfNeeded(physicianModel);

      if (response.error !== undefined) {
        UIkit.modal.alert(
          'Erro ao realizar cadastro: ' + response.error.response.data.Message
        );
        return;
      }

      if (response.payload.status === 200) {
        UIkit.modal.alert(
          'Cadastro realizado com sucesso. O seu Login é: ' +
            physicianModel.CRM +
            physicianModel.CRM_UF
        );
        const { history } = this.props;
        history.push({ pathname: '/' });
      }
    } catch (error) {
      console.log('post physician went wrong..., error: ', error);
    }
  };

  validatePassword() {
    const password = document.querySelector('input[name=password]').value;
    let securityLevel = 0;

    if (password.length < 8) {
      return -1;
    }
    if (password.match(/[a-z]/)) {
      // letras minusculas
      securityLevel = securityLevel + 1;
    }
    if (password.match(/[A-Z]/)) {
      // letras maiusculas
      securityLevel = securityLevel + 1;
    }
    if (password.match(/\d/)) {
      // numeros
      securityLevel = securityLevel + 1;
    }
    if (password.match(/[!@#$%&*()-+.?_]/)) {
      // caracteres especiais
      securityLevel = securityLevel + 1;
    }
    return securityLevel;
  }

  handleSpecialtyChange = async (value) => {
    if (value == '99') {
      this.setState({ isOtherSpecialty: true });
    } else {
      this.setState({
        isOtherSpecialty: false,
        otherSpecialty: { id: '', description: '' }
      });
      this.props.changeFieldValue('otherSpecialty', '');
    }
  };

  handleSearch = async () => {
    try {
      const crm = document.querySelector('input[name=crm]').value;
      const crm_uf = document.querySelector('select[name=crm_uf]').value;

      if (crm != '' && crm_uf != '') {
        const { getPhysicianDataIfNeeded } = this.props;
        const response = await getPhysicianDataIfNeeded(0, crm, crm_uf);

        if (response.error !== undefined) {
          UIkit.modal.alert(response.error);
          return;
        }

        if (response.payload.data == null || response.payload.data.Id == 0) {
          UIkit.modal.alert(
            'CRM-UF informado não foi encontrado na base do CFM'
          );
          return;
        }

        if (response.payload.data.Id == -1) {
          UIkit.modal.alert(
            'CRM-UF informado não se encontra ativo no CFM. Status atual: ' +
              response.payload.data.StatusCfm
          );
          return;
        }

        if (response.payload.status === 204) {
          UIkit.modal.alert('Médico não encontrado');
          return;
        }

        // Informa que médico já está cadastrado na campanha
        if (response.payload.data.usuCod !== undefined) {
          UIkit.modal.alert('Médico já cadastrado na campanha');
          this.props.history.push({ pathname: '/login' });
          return;
        }

        this.setState({ physician: response.payload.data });

        if (this.state.physician == null) {
          this.setState({ canHandle: true });

          this.props.changeFieldValue('name', '');
          this.props.changeFieldValue('email', '');
          this.props.changeFieldValue('ddd', '');
          this.props.changeFieldValue('number', '');
          this.props.changeFieldValue('branch', '');
        } else {
          this.setState({ canHandle: true });
          this.props.changeFieldValue('name', this.state.physician.name);
          this.props.changeFieldValue('email', this.state.physician.email);
          this.props.changeFieldValue('ddd', '');
          this.props.changeFieldValue('number', '');
          this.props.changeFieldValue('branch', '');
        }
      } else if (crm != '') {
        UIkit.modal.alert('O campo CRM está vazio');
      } else if (crm_uf != '') {
        UIkit.modal.alert('O campo UF está vazio');
      }
    } catch (error) {
      console.log('get physician went wrong..., error: ', error);
    }
  };

  getStates = async () => {
    try {
      const { getStatesIfNeeded } = this.props;
      const response = await getStatesIfNeeded();

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);
        return;
      }

      if (response.payload.status === 204) {
        UIkit.modal.alert('Nenhum estado encontrado');
        return;
      }

      const { data } = response.payload;
      const states = [{ value: '', text: 'Selecione' }];

      data.forEach((state) => {
        states.push({ value: state.state, text: state.state });
      }, this);

      this.setState({ states: states });
      this.setState({ listStates: data });
    } catch (error) {
      console.log('get states went wrong..., error: ', error);
    }
  };

  getHealthUnits = async () => {
    try {
      const { getHealthUnitListIfNeeded } = this.props;
      const response = await getHealthUnitListIfNeeded(12);

      if (response.error !== undefined) {
        this.setState({
          flash: {
            visible: true,
            message: <span>{response.error.response.data.Message}</span>,
            kind: 'danger'
          }
        });
        return;
      }

      if (response.payload.status === 204) {
        this.setState({
          flash: {
            visible: true,
            message: <span>Nenhuma instituição encontrada</span>,
            kind: 'danger'
          }
        });
        return;
      }

      const { data } = response.payload;
      const healthUnits = [{ value: '', text: 'Selecione' }];

      data.forEach((healthUnit) => {
        healthUnits.push({ value: healthUnit.Id, text: healthUnit.Name });
      }, this);
      
      healthUnits.push({ value: '42026', text: 'OUTROS' });
      
      this.setState({ healthUnits: healthUnits });
    } catch (error) {
      console.log('get health units went wrong..., error: ', error);
    }
  };

  clearHealthUnit1Form = () => {
    this.setState({
      labelHealthUnit1: false,
      fantasyNameHealthUnit1: '',
      cnpjHealthUnit1: '',
      addressHealthUnit1: ''
    });
  };
  clearHealthUnit2Form = () => {
    this.setState({
      labelHealthUnit2: false,
      fantasyNameHealthUnit2: '',
      cnpjHealthUnit2: '',
      addressHealthUnit2: ''
    });
  };

  scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  showInstitutionRegistrationModal = () => {
    this.openModal();
    this.scrollToTop();
  };

  handleHealthUnitChange = async (value, num) => {
    if (value == 42026) {
      this.showInstitutionRegistrationModal();
      if (num == 1) {
        this.clearHealthUnit1Form();
      } else if (value == 2) {
        this.clearHealthUnit2Form();
      }
    } else {
      this.getHealthUnit(value, num);
    }

    if (value == '') {
      if (num == 1) {
        this.clearHealthUnit1Form();
      } else if (value == 2) {
        this.clearHealthUnit2Form();
      }
    } else {
      this.getHealthUnit(value, num);
    }
  };

  handleSearchSPE = async () => {
    const esp = document.querySelector('input[name=otherSpecialty]').value;

    this.setState({
      otherSpecialty: { id: '', description: '' }
    });

    const { getPhysicianSpecialtyIfNeeded } = this.props;
    const response = await getPhysicianSpecialtyIfNeeded(esp);

    if (response.error !== undefined) {
      UIkit.modal.alert(response.error.response.data.Message);
      return;
    }
    const { data } = response.payload;

    if (data != null) {
      this.setState({
        otherSpecialty: { id: data.Id, description: data.Description }
      });
    } else {
      UIkit.modal.alert('Especialidade inválida.');
      return;
    }
  };

  getHealthUnit = async (unscod: int, num: int) => {
    try {
      const { getHealthUnitByUnscodIfNeeded } = this.props;
      const response = await getHealthUnitByUnscodIfNeeded(unscod);

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);
        return;
      }

      if (response.payload.status === 204) {
        UIkit.modal.alert('Instituição não encontrada');
        return;
      }

      const { data } = response.payload;

      if (num == 1) {
        this.setState({
          labelHealthUnit1: true,
          fantasyNameHealthUnit1: data.Fantasy_Name,
          cnpjHealthUnit1: data.CNPJ,
          addressHealthUnit1: data.Address_Description
        });
      } else if (num == 2) {
        this.setState({
          labelHealthUnit2: true,
          fantasyNameHealthUnit2: data.Fantasy_Name,
          cnpjHealthUnit2: data.CNPJ,
          addressHealthUnit2: data.Address_Description
        });
      }
    } catch (error) {
      console.log('get health unit went wrong..., error: ', error);
    }
  };

  goHome = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    const { history } = this.props;
    history.push({ pathname: '/' });
  };

  openModal = () => {
    this.setState({showModal: true})
  }

  closeModal = () => {
    this.setState({showModal: false})
  }

  render() {
    return (
      <AnimatedView>
        <div
          style={{ minHeight: '60vh' }}
          className="uk-container uk-container-center"
        >
          <h1 className="uk-h1 uk-margin-top uk-text-center-small">
            CADASTRO DE MÉDICO
          </h1>
          <hr />
           {this.state.showModal && <Modal getHealthUnits={this.getHealthUnits} closeModal={this.closeModal}/>}

          <RegisterPhysicianForm
            onSubmit={this.submit}
            isSubmitFetching={this.props.isFetching}
            goHome={this.goHome}
            states={this.state.states}
            canHandle={this.state.canHandle}
            handleSearch={this.handleSearch}
            healthUnits={this.state.healthUnits}
            handleHealthUnitChange={this.handleHealthUnitChange}
            labelHealthUnit1={this.state.labelHealthUnit1}
            fantasyNameHealthUnit1={this.state.fantasyNameHealthUnit1}
            cnpjHealthUnit1={this.state.cnpjHealthUnit1}
            addressHealthUnit1={this.state.addressHealthUnit1}
            labelHealthUnit2={this.state.labelHealthUnit2}
            fantasyNameHealthUnit2={this.state.fantasyNameHealthUnit2}
            cnpjHealthUnit2={this.state.cnpjHealthUnit2}
            addressHealthUnit2={this.state.addressHealthUnit2}
            registerAddress={{
              registerAddress1: this.state.registerAddress1,
              registerAddress2: this.state.registerAddress2
            }}
            specialty={this.state.specialty}
            handleSpecialtyChange={this.handleSpecialtyChange}
            handleSearchSPE={this.handleSearchSPE}
            isOtherSpecialty={this.state.isOtherSpecialty}
            otherSpecialty={this.state.otherSpecialty}
            isFetchingListPhysician={this.props.isFetchingListPhysician}
          />
        </div>
      </AnimatedView>
    );
  }
}

RegisterPhysician = reduxForm({
  form: 'RegisterPhysician', // a unique name for this form
  enableReinitialize: true
})(RegisterPhysician);

function mapStateToProps(state) {
  return {
    formValues: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('RegisterPhysicianForm', field, value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPhysician);
