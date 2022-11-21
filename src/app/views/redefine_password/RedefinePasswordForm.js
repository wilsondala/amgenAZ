// @flow weak

import React, { PureComponent } from 'react';
import { Field, reduxForm, change, untouch } from 'redux-form';
import PropTypes from 'prop-types';
import Grid from '../../components/formDecorators/Grid';
import Column from '../../components/formDecorators/Column';
import Input from '../../components/formDecorators/Input';
import { connect } from 'react-redux'

const required = (value) => value ? undefined : 'Campo obrigatório';

class RedefinePasswordForm extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} className="uk-form">
        <div className="uk-form-row">
          <Grid styleNames="uk-grid-small">
            <Column cols={2} col={1} size="medium" styleNames="uk-margin-bottom">
              <Field
                label=""
                name="filter"
                type="filter"
                component={Input}
                validate={[required]}
                placeholder="(123456AC) ou  (11.222.333/4444-55)"                
                label="Digite o CRM com a UF ou CNPJ"
                
              />
            </Column>
          </Grid>
          <div className="uk-form-row uk-margin-large-top uk-margin-large-bottom uk-text-center-small">
            <button type="submit"
              className="uk-button uk-button-large uk-button-success uk-form-width-medium uk-margin-small-bottom client-color">
              <span>Redefinir</span>
            </button><br />
            <a className="uk-button uk-button-large uk-button-danger uk-form-width-medium uk-margin-small-bottom" href="#/">Voltar</a>
          </div>
        </div>

      </form>);
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form,
  }
}

RedefinePasswordForm = reduxForm({
  form: 'RedefinePasswordForm' // a unique name for this form
})(RedefinePasswordForm);

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('RedefinePasswordForm', field, value));
    },
    untouchField: function (field) {
      dispatch(untouch('RedefinePasswordForm', field));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedefinePasswordForm);