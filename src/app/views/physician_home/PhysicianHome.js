// @flow weak

import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';
import { Link }               from 'react-router-dom';
import * as _ from 'lodash'; 

import Grid                   from '../../components/formDecorators/Grid';
import Column                 from '../../components/formDecorators/Column';
import AnimatedView           from '../../components/animatedView/AnimatedView';
import { auth } from '../../services/auth';

class PhysicianHome extends PureComponent {

  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // views:
    currentView:    PropTypes.string.isRequired,
    enterPhysicianHome: PropTypes.func.isRequired,
    leavePhysicianHome: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {enterPhysicianHome} = this.props;
    enterPhysicianHome();
  }

  componentWillUnmount() {
    const {leavePhysicianHome} = this.props;
    leavePhysicianHome();
  }

  render() {
    const user = auth.getUserInfo();
    const isMedic = user.userType === 9;
    
    return (
      <AnimatedView>

        <div id='titleAmgenLogin' style={{ minHeight: '40vh' }} className="uk-container uk-container-center">
          { isMedic && <h3 className="uk-margin-large-bottom uk-text-center-medium">Olá Dr(a). {user.name}. Seja Bem-vindo!</h3>}
          <h2 className="uk-margin-top uk-text-center-small">ÁREA DO MÉDICO</h2>
          <hr/>
          <br/>
         
          <div className="uk-form-row uk-margin-top">
            <Grid styleNames="uk-grid-small uk-align-center">

              <Column cols={3} col={1} size="medium" styleNames="uk-text-center uk-margin-large-bottom">
                <Link to={'/admin/physician/request_exam'} className="black boxed ">
                  <i className="fa fa-calendar-check-o fa-4x" />
                  <br />
                  <span>Solicitação de <br /> Exame</span>
                </Link>
              </Column>
              <Column cols={3} col={1} size="medium" styleNames="uk-text-center uk-margin-large-bottom">
                <Link to={'/admin/laboratory/report_request_exam'} className="black boxed">
                  <i className="fa fa-pie-chart fa-4x" />
                  <br />
                  <span>Relatório Solicitação <br />de Exame</span>
                </Link>
              </Column>

              <Column cols={3} col={1} size="medium" styleNames="uk-text-center uk-margin-large-bottom">
                  <Link to={'/documents'} className="black boxed uk-margin-top">
                  <i className="fa fa-file-text-o fa-4x" />
                  <br />
                  <span>Documentos</span>
                  </Link>
              </Column>
            </Grid>

          </div>

        </div>
      </AnimatedView>
    );
  }
}

export default PhysicianHome;
