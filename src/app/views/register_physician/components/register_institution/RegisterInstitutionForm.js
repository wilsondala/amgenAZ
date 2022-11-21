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
import Input from '../../../../components/formDecorators/Input';
import Select from '../../../../components/formDecorators/Select';
import Checkbox from '../../../../components/formDecorators/Checkbox';
import Grid from '../../../../components/formDecorators/Grid';
import Column from '../../../../components/formDecorators/Column';
import getLocationOrigin from '../../../../services/utils/getLocationOrigin';

const required = (value) => value ? undefined : 'Obrigatório';

class RegisterInstitutionForm extends PureComponent {

  static propTypes = {
    cities: PropTypes.array,
    states: PropTypes.array,
    institutions: PropTypes.array,
    handleStateChange: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitFetching: PropTypes.bool.isRequired,
    
    handleSearch: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, isSubmitFetching, handleStateChange, cities, states, disableAddress, disableAddressZipCode, handleCepOnChange,
            handleSearch, handleNewAddress, canViewForm, disablePhones, handleNewPhone, isFetchingGet, closeModal} = this.props;
    return (
      <form onSubmit={handleSubmit} className="uk-form">
        <div className={`uk-form-row`}>

          <h3>Dados da Instituição</h3>
          <hr />

          <Grid styleNames="uk-grid-small">

            <Column cols={10} col={3} size="medium" styleNames="uk-margin-bottom uk-margin-right">
              <Field
                name="cnpj"
                label="CNPJ*"
                type="text"
                component={Input}
                validate={[required]}
                placeholder="CNPJ"
                mask="99.999.999/9999-99"
                annotation="Não utilize pontos ou outros caracteres especiais."
              />
            </Column>

            <Column cols={2} col={1} size="medium" styleNames="uk-margin-top">
              <button 
                type="button" className="uk-button uk-button-large client-color" 
                onClick={handleSearch} 
                disabled={isFetchingGet}
              >
                {
                  isFetchingGet
                  ? <span><i className="fa fa-spinner fa-pulse fa-fw" />&nbsp;Buscando...</span>
                  :
                  <span><i className="fa fa-search" /> &nbsp;Buscar</span>
                }
              </button>


            </Column>
            </Grid>

          {canViewForm &&
          <div>
          <Grid styleNames="uk-grid-small">

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
              />
            </Column>
          </Grid>

          <Grid styleNames="uk-grid-small">            
            <Column cols={10} col={10} size="medium" styleNames="uk-margin-bottom field-padding-right">
              <Field
                name="password"
                label="Senha de Acesso*"
                type="password"
                component={Input}
                validate={[required]}
                placeholder="Senha"
                annotation={'A senha precisa no mínimo oito dígitos, ter letras maiúsculas e minúsculas, números, caractere especial'}
              />
            </Column>

            <Column cols={10} col={10} size="medium" styleNames="uk-margin-bottom">
              <Field
                name="passwordConfirmation"
                label="Confirmação da Senha de Acesso*"
                type="password"
                component={Input}
                validate={[required]}
                placeholder="Confirmação da Senha"
              />
            </Column>

          </Grid>
          <h3>Endereço</h3>
          <hr />

          <Grid styleNames="uk-grid">

            <Column cols={10} col={1} size="medium" styleNames="uk-margin-bottom">
              <Field
                name="zip_code"
                label="CEP*"
                type="text"
                component={Input}
                validate={[required]}
                placeholder="CEP"
                onChange={handleCepOnChange}
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
                disabled={disableAddressZipCode}
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
                disabled={disableAddressZipCode}
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
                disabled={disableAddressZipCode}
                placeholder="UF"
                onChange={handleStateChange}

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
                disabled={disableAddressZipCode}
                placeholder="Cidade"

              />
            </Column>


          </Grid>

         

          {/* <Grid styleNames="uk-grid-small">

                <Column cols={2} col={1} size="medium" styleNames="uk-margin-top">
                  <button type="button" className="uk-button uk-button-large client-color" onClick={handleNewAddress} >
                    <span>Novo Endereço</span>
                  </button>
                </Column>
          </Grid> */}
          <br></br>
          <h3>Contato</h3>
          <hr />

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

          {/* <Grid styleNames="uk-grid-small">

                <Column cols={2} col={1} size="medium" styleNames="uk-margin-top">
                  <button type="button" className="uk-button uk-button-large client-color" onClick={handleNewPhone} >
                    <span>Novo Telefone</span>
                  </button>
                </Column>
          </Grid> */}

          <hr />
          <br></br>

          <div className="uk-margin-top uk-text-left uk-width-medium-1-1 uk-margin-bottom">
            <a target="_blank" href={`${getLocationOrigin()}/materiais/Termo de Uso do Portal para Médicos.pdf`} className="uk-button uk-button-large uk-button-primary"> <i className="uk-icon-download" /> Regulamento do Programa</a>
          </div>



          <Grid styleNames="uk-grid-small uk-margin-bottom">
            <Column cols={1} col={10} size="small" styleNames="uk-margin-top uk-margin-bottom uk-text-left">
              <Field
                name="regulationAccept"
                label="Li e aceito o regulamento do Programa Rastrear Pulmão."
                type="checkbox"
                component={Checkbox}
                validate={[required]}
                styleNames=""
              />
            </Column>
          </Grid>
          </div>
        }
        </div>

        {canViewForm &&
        <div uk-margin-bottom>
          <button className="uk-button uk-button-large uk-button-success uk-form-width-medium client-color" type="submit" disabled={isSubmitFetching}>
            {
              isSubmitFetching
                ? <span>Cadastrando...&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                : <span>Cadastrar</span>
            }
          </button>

          &nbsp;&nbsp;

          <a className="uk-button uk-button-large uk-button-danger uk-form-width-medium" onClick={closeModal} disabled={isSubmitFetching}>Cancelar</a>

        </div>
        }
      </form >
    );
  }
}


RegisterInstitutionForm = reduxForm({
  form: 'RegisterInstitutionForm'
})(RegisterInstitutionForm);

function mapStateToProps(state) {
  return {
    formValues: state.form
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('RegisterInstitutionForm', field, value));
      dispatch(change('RegisterInstitution', field, value));
    },
    untouchField: function (field) {
      dispatch(untouch('RegisterInstitutionForm', field));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterInstitutionForm);
