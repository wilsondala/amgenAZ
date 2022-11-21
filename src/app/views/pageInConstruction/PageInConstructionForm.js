// @flow weak

import React, { PureComponent } from 'react';
import {  reduxForm, change, untouch } from 'redux-form';

import { connect } from 'react-redux'

class PageInConstructionForm extends PureComponent {
  render() {
   

    return (
      <form className="uk-form">
        <div className="uk-form-row"></div>
      </form>);
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form,
  }
}

PageInConstructionForm = reduxForm({
  form: 'PageInConstructionForm' // a unique name for this form
})(PageInConstructionForm);

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('PageInConstructionForm', field, value));
    },
    untouchField: function (field) {
      dispatch(untouch('PageInConstructionForm', field));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageInConstructionForm);