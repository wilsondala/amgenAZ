// @flow weak

import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';
import { Link }               from 'react-router-dom';
import Grid                   from '../../components/formDecorators/Grid';
import Column                 from '../../components/formDecorators/Column';
import AnimatedView           from '../../components/animatedView/AnimatedView';

class MasterHome extends PureComponent {

  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // views:
    currentView:    PropTypes.string.isRequired,
    enterMasterHome: PropTypes.func.isRequired,
    leaveMasterHome: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {enterMasterHome} = this.props;
    enterMasterHome();
  }

  componentWillUnmount() {
    const {leaveMasterHome} = this.props;
    leaveMasterHome();
  }

  render() {
    return (
      <AnimatedView>
        <div style={{ minHeight: '0vh' }} className="uk-container uk-container-center">

          <h3 className="uk-h1 uk-margin-top uk-text-center-small">ÁREA DO MASTER</h3>
        
          <div className="uk-form-row ">
            <Grid styleNames="uk-grid-small uk-align-center uk-margin-large-top">
              <Column cols={2} col={1} size="medium" styleNames="uk-text-center uk-margin-bottom uk-margin-large-top">
                <Link to={'/admin/physician/request_exam'} className="black boxed">
                  <i className="fa fa-calendar-check-o fa-4x" />
                  <br />
                  <span>Solicitação de <br /> Exame</span>
                </Link>
              </Column>
              <Column cols={2} col={1} size="medium" styleNames="uk-text-center uk-margin-bottom uk-margin-large-top" >
                <Link to={'/admin/laboratory/report_request_exam'} className="black boxed">
                  <i className="fa fa-pie-chart fa-4x" />
                  <br />
                  <span>Relatório Solicitação <br />de Exame</span>
                </Link>
              </Column>
            </Grid>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

export default MasterHome;
