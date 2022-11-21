// @flow weak

import React, { PureComponent } from 'react';
import Grid from '../../components/formDecorators/Grid';
import Column from '../../components/formDecorators/Column';
import PropTypes              from 'prop-types';




class RegisterMenuForm extends PureComponent {
  
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // views:
    currentView:    PropTypes.string.isRequired,
    enterRegisterMenu: PropTypes.func.isRequired,
    leaveRegisterMenu: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {enterRegisterMenu} = this.props;
    enterRegisterMenu();
  }

  componentWillUnmount() {
    const {leaveRegisterMenu} = this.props;
    leaveRegisterMenu();
  }
  render() {
    
    return (
      <form className="uk-form">
          <div id="titleAmgen" style={{ minHeight: '60vh' }} className="uk-container uk-container-center"><br />
          <h2 className="uk-h2 uk-margin-top uk-text-center-medium" >SELECIONE O SEU PERFIL</h2>
          <hr />
          <Grid styleNames="uk-grid-small uk-align-center">
              <Column cols={2} col={1} size="medium" styleNames="uk-text-center uk-margin-bottom">
                <a className="uk-button uk-button-large uk-button-default uk-width-1-1 uk-text-left green-button boxed" href='#/register_physician' >&nbsp;&nbsp;<i className="fa fa-user-md fa-2x" /> &nbsp;&nbsp;&nbsp;&nbsp;<span>Sou Médico</span></a>
              </Column>
              <Column cols={2} col={1} size="medium" styleNames="uk-text-center uk-margin-bottom">
                <a className="uk-button uk-button-large uk-button-default uk-width-1-1 uk-text-left green-button boxed" href='#/register_institution' >&nbsp;&nbsp;<i className="fa fa-institution fa-2x" /> &nbsp;&nbsp;<span>Sou Instituição</span></a>
              </Column>
            </Grid>
        </div>

      </form >
      
    );
  }
}

export default (RegisterMenuForm);
