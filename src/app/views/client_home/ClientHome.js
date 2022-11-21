// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '../../components/formDecorators/Grid';
import Column from '../../components/formDecorators/Column';
import AnimatedView from '../../components/animatedView/AnimatedView';

class ClientHome extends PureComponent {

  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // views:
    currentView: PropTypes.string.isRequired,
    // enterClientHome: PropTypes.func.isRequired,
    // leaveClientHome: PropTypes.func.isRequired
  };

  componentDidMount() {
    // const {enterClientHome} = this.props;
    // enterClientHome();
  }

  componentWillUnmount() {
    // const {leaveClientHome} = this.props;
    // leaveClientHome();
  }

  render() {
    return (
      <AnimatedView>

        <div style={{ minHeight: '60vh' }} className="uk-container uk-container-center">
          <div className='uk-client'>
            <h2 className="uk-margin-top uk-text-center-small ">ÁREA DO CLIENTE</h2>
          </div>
          <br />
          <br />
          <br />

          <div className="uk-form-row">
            <Grid styleNames="uk-grid-small uk-align-center">
              <Column cols={4} col={1} size="medium" styleNames="uk-text-center uk-margin-bottom">
                <Link to={'/admin/client/report_request_exam'} className="black boxed">
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

export default ClientHome;
