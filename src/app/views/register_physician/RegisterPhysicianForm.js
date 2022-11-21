// @flow weak
import { connect } from 'react-redux';

import { change } from 'redux-form';
import { reduxForm } from 'redux-form';
import { untouch } from 'redux-form';
import { Field } from 'redux-form';

import { PureComponent } from 'react';
import React from 'react';

import PropTypes from 'prop-types';

import Column from '../../components/formDecorators/Column';
import Grid from '../../components/formDecorators/Grid';
import Input from '../../components/formDecorators/Input';
import Select from '../../components/formDecorators/Select';
import Checkbox from '../../components/formDecorators/Checkbox';

import onlyLetters from '../../validators/onlyLetters.js';

import getLocationOrigin from '../../services/utils/getLocationOrigin';

const required = (value) => value ? undefined : 'Obrigatório';
const formValidation = (values, props) => {
  const errors = {};

  if (!values.celphone && !values.phone) {
    errors.phone = 'É necessário informar ao menos um telefone';
    errors.celphone = 'É necessário informar ao menos um telefone';
  }

  return errors;
};


class RegisterPhysicianForm extends PureComponent {

  static propTypes = {
    states: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    isSubmitFetching: PropTypes.bool.isRequired
  };

  render() {
    const { handleSubmit, handleSearch, canHandle, isSubmitFetching, states, healthUnits,
      handleHealthUnitChange, isFetchingListPhysician} = this.props;

    return (
      <form onSubmit={handleSubmit} className="uk-form">

        <div className="uk-form-row">

          <h3>Dados do Médico</h3>
          <hr />

          <Grid styleNames="uk-grid">
            <Column cols={6} col={1} size="medium" styleNames="uk-margin-bottom uk-margin-right">
              <Field
                name="crm"
                label="CRM*"
                type="text"
                component={Input}
                validate={[required]}
                placeholder="CRM"
                disabled={canHandle}
              />
            </Column>

            <Column cols={6} col={1} size="medium" styleNames="uk-margin-bottom">
              <Field
                name="crm_uf"
                label="UF*"
                type="text"
                component={Select}
                options={states}
                validate={[required]}
                placeholder="CRM-UF"
                disabled={canHandle}
              />
            </Column>

            <Column cols={2} col={1} size="medium" styleNames="uk-margin-top">
              <button type="button" className="uk-button uk-button-large client-color" onClick={handleSearch} disabled={isFetchingListPhysician} >
                {isFetchingListPhysician ? <i className="fa fa-spinner fa-pulse fa-fw" /> : <span><i className="fa fa-search" />&nbsp;Buscar</span>}
              </button>
            </Column>
          </Grid>

          {
            (canHandle == true) ?
            // (true) ?
              <div className="uk-form-row">

                <hr />
                <Grid styleNames="uk-grid">

                  <Column cols={10} col={5} size="medium">
                    <Field
                      name="name"
                      label="Nome do Médico*"
                      type="text"
                      component={Input}
                      validate={[required, onlyLetters]}
                      placeholder="Nome"
                      normalize={value => value.toUpperCase()}
                      disabled={true}
                    />
                  </Column>

                  <Column cols={10} col={5} size="medium" >
                    <Field
                      name="email"
                      label="E-mail do Médico*"
                      type="text"
                      component={Input}
                      validate={[required]}
                      placeholder="E-mail"
                    />
                  </Column>
                </Grid>


                <Grid styleNames="uk-grid">

                  <Column cols={10} col={10} size="medium">
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
                </Grid>
                <Grid styleNames="uk-grid">
                  <Column cols={10} col={10} size="medium">
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

                <h3>Contato</h3>
                <hr />

                <Grid styleNames="uk-grid">
                  <Column cols={10} col={2} size="medium">
                    <Field
                      name="ddd"
                      label="DDD*"
                      type="text"
                      component={Input}
                      validate={[required]}
                      placeholder="DDD"
                      mask="99"
                    />
                  </Column>

                  <Column cols={10} col={5} size="medium" >
                    <Field
                      name="number"
                      label="Telefone*"
                      type="text"
                      component={Input}
                      validate={[required]}
                      placeholder="Telefone"
                      mask="999999999"
                    />
                  </Column>

                  <Column cols={10} col={3} size="medium" styleNames="uk-margin-bottom">
                    <Field
                      name="branch"
                      label="Ramal"
                      type="text"
                      component={Input}
                      placeholder="Ramal"
                    />
                  </Column>
                </Grid>

                <h3>Instituições</h3>
                <hr />

                <Grid >
                  <Column cols={10} col={10} >
                    <Field
                      id="healthUnit1"
                      name={'healthUnit1'}
                      label={'Instituição 1*'}
                      type="text"
                      component={Select}
                      options={healthUnits}
                      onChange={e => handleHealthUnitChange(e.target.value, 1)}
                    />
                  </Column>
                </Grid>

                <Grid >
                  <Column cols={10} col={10} >
                    <Field
                      id="healthUnit2"
                      name={'healthUnit2'}
                      label={'Instituição 2'}
                      type="text"
                      component={Select}
                      options={healthUnits}
                      onChange={e => handleHealthUnitChange(e.target.value, 2)}
                    /><br />
                  </Column>
                </Grid>
                

                <div className=" uk-text-left uk-width-medium-1-1">
                  <a target="_blank" href="https://api.azimute.med.br/Prod/Amgen/LungMapping/docs/Termo%20de%20Uso%20do%20Portal%20para%20M%C3%A9dicos.pdf"
                    className="uk-button uk-button-large uk-button-primary"> <i className="uk-icon-download" /> Regulamento do Programa
                  </a>
                </div>

                <Grid styleNames="uk-grid-small">
                  <Column cols={1} col={10} size="small" styleNames="uk-margin-top uk-margin-bottom uk-text-left">
                    <Field
                      name="regulationAccept"
                      label="Li e aceito o regulamento do Programa Rastrear Pulmão.*"
                      type="checkbox"
                      component={Checkbox}
                      validate={[required]}
                    />
                  </Column>
                </Grid>
                <br />
                <br />

                <div>
                  <button className="uk-button uk-button-large uk-button-success uk-form-width-medium uk-margin-small-bottom client-color" type="submit" disabled={isSubmitFetching}>
                    {
                      isSubmitFetching
                        ? <span>Cadastrando...&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                        : <span>Cadastrar</span>
                    }
                  </button>

                  &nbsp;&nbsp;

                  <a className="uk-button uk-button-large uk-button-danger uk-form-width-medium uk-margin-small-bottom" href="#" disabled={isSubmitFetching}>Cancelar</a>

                </div>
              </div>
              :
              null
          }
        </div>
      </form>
    );
  }
}

RegisterPhysicianForm = reduxForm({
  form: 'RegisterPhysicianForm',
  validate: formValidation
})(RegisterPhysicianForm);

function mapStateToProps(state) {
  return {
    formValues: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('RegisterPhysicianForm', field, value));
    },
    untouchField: function (field) {
      dispatch(untouch('RegisterPhysicianForm', field));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPhysicianForm);
