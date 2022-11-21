// @flow weak

import React, { PureComponent } from 'react';
import {
  Field,
  reduxForm,
  change,
  untouch
} from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../components/formDecorators/Input';
import Select from '../../components/formDecorators/Select';
import Checkbox from '../../components/formDecorators/Checkbox';
import Grid from '../../components/formDecorators/Grid';
import Column from '../../components/formDecorators/Column';
import getLocationOrigin from '../../services/utils/getLocationOrigin';
import AnimatedView from '../../components/animatedView/AnimatedView';
import { auth } from '../../services/auth';

const required = (value) => value ? undefined : 'Obrigatório';

class InstitutionProfileForm extends PureComponent {

  static propTypes = {
    cities: PropTypes.array,
    states: PropTypes.array,
    institutions: PropTypes.array,
    handleStateChange: PropTypes.func
    
  };

  state = {
    states: [{ value: '', text: 'Selecione' }],
    cities: [{ value: '', text: 'Selecione' }],
    disableAddress: false,
    disableAddressZipCode: false,
    lastZipCode: null,
    canViewForm: false,
    disablePhones: false,
    newPhone: false,
    newAddress: false,
    aceiteTermo: true
  }

  static defaultProps = {
    isFetchingCities: false,
    isFetchingStates: false,
    isFetching: false
  }

  componentDidMount() {
    const { enterInstitutionProfile } = this.props;
    enterInstitutionProfile();

    this.getStates();

    this.getAddressByCep('');
    this.handleSearch();
  }

  componentWillUnmount() {
    const { leaveInstitutionProfile } = this.props;
    leaveInstitutionProfile();
  }

  handleNewAddress = () => {
    this.setState({newAddress: true});
    this.enableAddressFields();
    this.props.changeFieldValue('zip_code', '');
    this.props.changeFieldValue('address', '');
    this.props.changeFieldValue('addressNumber', '');
    this.props.changeFieldValue('complement', '');
    this.props.changeFieldValue('district', '');
    this.props.changeFieldValue('uf', '');    

    const cities = [{ value: '', text: 'Selecione' }];
    this.setState({ cities: cities }, () => callback());    
  }


  handleNewPhone = () => {
    this.setState({disablePhones: false});
    this.setState({newPhone: true});
    this.props.changeFieldValue('ddd', '');   
    this.props.changeFieldValue('number', '');   
    this.props.changeFieldValue('branch', '');
  }


  handleSearch = async () => {
    try {
      const user = auth.getUserInfo();
    
      const { getInstitutionIfNeeded } = this.props;
      const response = await getInstitutionIfNeeded('', user.code);
      const { data } = response.payload;


      this.props.changeFieldValue('cnpj', data.cnpj);
      this.props.changeFieldValue('fantasyName', data.fantasy_Name);
      this.props.changeFieldValue('corporateName', data.corporate_Name);
      this.props.changeFieldValue('institutionEmail', data.corporate_Email);

      if (data.address != undefined){
        this.disableAddressZipCodeFields();
        this.props.changeFieldValue('address_id', data.address.id);
        this.props.changeFieldValue('zip_code', data.address.zip_Code);
        this.props.changeFieldValue('address', data.address.street.toUpperCase());
        this.props.changeFieldValue('addressNumber', data.address.number);
        this.props.changeFieldValue('complement', data.address.complement);
        this.props.changeFieldValue('district', data.address.district.toUpperCase());
        this.props.changeFieldValue('uf', data.address.state);
        
        // Atualiza combo de cidades
        this.getCityByState(data.address.state.toUpperCase(), () => this.props.changeFieldValue('city', data.address.city.toUpperCase()));
        //this.disableAddressZipCodeFields();
      }

      if (data.phones.length > 0)        {
            // this.setState({ disablePhones: true })
        console.log(data.phones);
        this.props.changeFieldValue('phone_id', data.phones[0].id);
        this.props.changeFieldValue('ddd', data.phones[0].ddd);
        this.props.changeFieldValue('number', data.phones[0].number);
        this.props.changeFieldValue('branch', data.phones[0].branch);
      }

      this.props.changeFieldValue('password', '');
      this.props.changeFieldValue('passwordConfirmation', '');
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
        UIkit.modal.alert('Nenhum estado encontrado');
        return;
      }

      const { data } = response.payload;
      const states = [{ value: '', text: 'Selecione' }];

      data.forEach(state => {
        states.push({ value: state.state, text: state.state });
      }, this);

      this.setState({ states: states });
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
      this.props.changeFieldValue('address', '');
      this.props.changeFieldValue('district', '');
      this.props.changeFieldValue('uf', '');
      this.props.changeFieldValue('city', '');

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
      this.props.changeFieldValue('address', data.LOGRNome.toUpperCase());
      this.props.changeFieldValue('district', data.BAINome.toUpperCase());
      this.props.changeFieldValue('uf', data.LOCUF.toUpperCase());

      this.getCityByState(data.LOCUF.toUpperCase(), () => this.props.changeFieldValue('city', data.LOCNome.toUpperCase()));
    } catch (e) {
      console.error('fillAddressFields went wrong..., error: ', e);
    }
  }

  handleCheckers(e) {
    try{
        // console.log("ACEITE 1: ", this.state.aceiteTermo);

      this.setState({aceiteTermo: !this.state.aceiteTermo});
        
        // console.log("ACEITE 2: ", this.state.aceiteTermo);

      setTimeout(() => {
        if(this.state.aceiteTermo == false)            {
          UIkit.modal.alert('<h4 style=\'color: red;\'>Atenção</h4><hr/>⚠ <strong> Caso retire o aceite do termo do programa, este perfil perderá acesso ao programa.</strong>');
        }
      }, 1);
    }catch(erro)    {
      UIkit.modal.alert('<h4 style=\'color: red;\'>Atenção</h4><hr/>⚠ <strong>Ocorreu um erro inesperado ao tentar alterar o aceite de termo.</strong>');
      console.log('handleCheckers erro: ', erro);
    }
  }

  submit = async (values) => {
    try {
      const user = auth.getUserInfo();

      const User = {
        Code: user.code,
        Name: values.fantasyName,
        Login: values.cnpj,
        Email: values.institutionEmail,
        Password: values.password,
        UserType: 12
      };

      const Phones = {
        DDD: values.ddd,
        Number: values.number,
        Branch: values.branch,
        Id: values.phone_id
      };

      const Address = {
        Zip_Code: values.zip_code,
        Street: values.address,
        Number: values.addressNumber,
        District: values.district,
        City: values.city,
        State: values.uf,
        Complement: values.complement,
        Id: values.address_id
      };

      const HealthUnit = {

        Corporate_Name: values.corporateName,
        Contact_Name: values.ownerName,
        Corporate_Email: values.institutionEmail,
        Fantasy_Name: values.fantasyName,
        Id_HeadquartersHealthUnit: values.institutions,
        CNPJ: values.cnpj,
        User: User,
        Phones: [Phones],
        Address: Address,
        newPhone: this.state.newPhone,
        newAddress: this.state.newAddress,
        Accept: this.state.aceiteTermo
      };


      if (HealthUnit.User.Password !== values.passwordConfirmation) {
        UIkit.modal.alert('A senha e a confirmação de senha diferem');
        return;
      }


      const { updateInstitutionProfileIfNeeded } = this.props;
      const response = await updateInstitutionProfileIfNeeded(HealthUnit);
        
      if (response.error !== undefined) {
        UIkit.modal.alert('Erro ao realizar cadastro: ' + response.error.response.data.Message);
        return;
      }
      if (response.payload.status === 200) {
        const {history} = this.props;

        if(!this.state.aceiteTermo)            {
          UIkit.modal.alert('Seu <b>descadastro</b> foi realizado com sucesso.');
          history.push('/login');
        }            else{
          UIkit.modal.alert('<h4 style=\'color: green;\'>Sucesso</h4><hr/>⚠ <strong>Dados cadastrais atualizados com sucesso</strong>');
              
          history.push({ pathname: '/admin/institution' });
        }
      }

      if (response.payload.status === 400) {
        UIkit.modal.alert('Erro interno (400)');
        return;
      }
    }    catch (error) {
      UIkit.modal.alert('<h4 style=\'color: red;\'>Atenção</h4><hr/>⚠ <strong>Ocorreu um erro inesperado ao tentar atualizar os dados cadastrais.</strong>');
      console.log('post institution went wrong..., error: ', error);
    }
  }

  render() {
    const {aceiteTermo, states, cities} = this.state;
    const { handleSubmit, handleStateChange, disableAddress, disableAddressZipCode, handleCepOnChange,
            handleNewAddress, disablePhones, handleNewPhone, isFetchingUpdateProfile} = this.props;
    return (
        <AnimatedView>
            <div id='titleAmgenLogin' style={{ minHeight: '0vh' }} className="uk-container uk-container-center">
                <h2 className=" uk-margin-top uk-text-center-small">
                   MEU PERFIL 
                </h2>
                <hr />
                <form  className="uk-form">
                    <div className={'uk-form-row'}>

                    <h3>Dados Da Instituição</h3>
                    <hr />
                    <Grid styleNames="uk-grid">

                        <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom field-padding-right">
                        <Field
                            name="fantasyName"
                            label="Nome Fantasia*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            placeholder="Nome Fantasia"
                            normalize={value => value.toUpperCase()}
                        />
                        </Column>

                        <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="corporateName"
                            label="Razão Social*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            placeholder="Razão Social"
                            normalize={value => value.toUpperCase()}
                            disabled={true}
                        />
                        </Column>
                    </Grid>
                    <Grid styleNames="uk-grid">

                        <Column cols={3} col={1} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="cnpj"
                            label="CNPJ*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            placeholder="CNPJ"
                            mask="99.999.999/9999-99"
                            disabled={true}
                        />
                        </Column>
                        <Column cols={3} col={1} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="password"
                            label="Senha de Acesso*"
                            type="password"
                            component={Input}
                            // validate={[required]}
                            placeholder="Senha"
                        />
                        </Column>

                        <Column cols={3} col={1} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="passwordConfirmation"
                            label="Confirmação da Senha de Acesso*"
                            type="password"
                            component={Input}
                            // validate={[required]}
                            placeholder="Confirmação da Senha"
                        />
                        </Column>

                    </Grid>
                    <div>
                    
                    <h3 className='uk-margin-top-remove'>Endereço</h3>
                    <hr />
                    <Field
                        name="address_id"
                        type="text"
                        component={Input}
                        style={{display: 'none'}}
                    />

                    <Grid styleNames="uk-grid">                      
                        <Column cols={10} col={1} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="zip_code"
                            label="CEP*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            placeholder="CEP"
                            onChange={this.handleCepOnChange}
                            disabled={disableAddress}
                            mask="99999-999"
                        />
                        </Column>

                        <Column cols={10} col={8} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            id="address"
                            name="address"
                            label="Logradouro*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            placeholder="Logradouro"
                            disabled={this.state.disableAddressZipCode}
                            normalize={value => value.toUpperCase()}
                        />
                        </Column>

                        <Column cols={10} col={1} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="addressNumber"
                            label="Número*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            disabled={disableAddress}
                            placeholder="Nº"
                        />
                        </Column>

                    </Grid>

                    <Grid styleNames="uk-grid">

                        <Column cols={10} col={3} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="complement"
                            label="Complemento"
                            type="text"
                            component={Input}
                            disabled={disableAddress}
                            placeholder="Complemento"
                            normalize={value => value.toUpperCase()}
                        />
                        </Column>

                        <Column cols={10} col={3} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            id="district"
                            name="district"
                            label="Bairro*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            disabled={this.state.disableAddressZipCode}
                            placeholder="Bairro"
                            normalize={value => value.toUpperCase()}
                        />
                        </Column>

                        <Column cols={10} col={1} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            id="uf"
                            name="uf"
                            label="UF*"
                            type="text"
                            component={Select}
                            options={states}
                            validate={[required]}
                            disabled={this.state.disableAddressZipCode}
                            placeholder="UF"
                            onChange={this.handleStateChange}

                        />
                        </Column>

                        <Column cols={10} col={3} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            id="city"
                            name="city"
                            label="Cidade*"
                            type="text"
                            component={Select}
                            options={cities}
                            validate={[required]}
                            disabled={this.state.disableAddressZipCode}
                            placeholder="Cidade"

                        />
                        </Column>


                    </Grid>
                    
                    <h3>Contato</h3>
                    <hr />
                    <Field
                        name="phone_id"
                        type="text"
                        component={Input}
                        style={{display: 'none'}}
                    />

                    <Grid styleNames="uk-grid">
                        <Column cols={10} col={1} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="ddd"
                            label="DDD*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            placeholder="DDD"
                            disabled={disablePhones}
                            mask="99"
                        />
                        </Column>

                        <Column cols={10} col={4} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="number"
                            label="Telefone*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            placeholder="Telefone"
                            mask="999999999"
                            disabled={disablePhones}
                            onChange={handleStateChange}
                        />
                        </Column>

                        <Column cols={10} col={1} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="branch"
                            label="Ramal"
                            type="text"
                            component={Input}
                            placeholder="Ramal"
                            disabled={disablePhones}
                        />
                        </Column>
                        <Column cols={10} col={4} size="medium" styleNames="uk-margin-bottom">
                        <Field
                            name="institutionEmail"
                            label="E-mail*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            placeholder="E-mail da Instituição"
                        />
                        </Column>

                    </Grid>
                    <hr />
                    <Grid styleNames="uk-grid">
                    <div className="uk-width-1-1 uk-container uk-container-center uk-margin-top ">
                    <Column cols={10} col={5} size="small" styleNames="uk-margin-bottom uk-text-center-medium">
                        <a target="_blank" href={`${getLocationOrigin()}/materiais/Termo de Uso do Portal para Médicos.pdf`} className="uk-text-left-medium uk-button uk-button-link uk-button-large uk-button-primary uk-width-1-1"> <i className="uk-icon-download" /> Regulamento do Programa</a>
                    </Column>
                    </div>
                    </Grid>
                    <Grid styleNames="uk-grid">
                    <div className="uk-width-1-1 uk-margin-top uk-margin-large-right">
                        <Column cols={10} col={5} size="small" styleNames="uk-margin-bottom uk-text-small uk-text-bold">
                        <Field
                            name="regulationAccept"
                            label="Li e aceito o regulamento do Programa Rastrear Pulmão."
                            type="checkbox"
                            component={Checkbox}
                            // validate={[required]}
                            
                            checked={aceiteTermo}
                            onClick={e => this.handleCheckers(e)}
                        />
                        </Column>
                        </div>
                    </Grid>
                    </div>
                    
                    </div>
                    
                    <Grid styleNames='uk-grid' >
                      <Column cols={2} col={1} size="medium" styleNames="uk-margin-bottom uk-margin-small-top">
                    <button 
                      className="uk-button uk-button-large uk-button-success client-color uk-width-1-1 uk-margin-top" 
                      type="button"
                      onClick={handleSubmit(this.submit)} 
                      disabled={isFetchingUpdateProfile}>
                        {
                        isFetchingUpdateProfile
                            ? <span>Atualizando...&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                            : <span>Atualizar</span>
                        }
                    </button>
                    </Column>
                    <Column cols={2} col={1} size="medium" styleNames="uk-margin-bottom">
                    &nbsp;&nbsp;

                    <a className="uk-button uk-button-large uk-button-danger uk-width-1-1" href="/" disabled={isFetchingUpdateProfile}>Cancelar</a>
                    </Column>
                    </Grid>
                    
                </form >
            </div>
        </AnimatedView>
    );
  }
}


InstitutionProfileForm = reduxForm({
  form: 'InstitutionProfileForm'
})(InstitutionProfileForm);

function mapStateToProps(state) {
  return {
    formValues: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('InstitutionProfileForm', field, value));
      dispatch(change('InstitutionProfile', field, value));
    },
    untouchField: function (field) {
      dispatch(untouch('InstitutionProfileForm', field));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionProfileForm);
