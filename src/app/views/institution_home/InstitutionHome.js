// @flow weak

import React, {PureComponent} from 'react';
import PropTypes              from 'prop-types';
import { Link }               from 'react-router-dom';
import Grid                   from '../../components/formDecorators/Grid';
import Column                 from '../../components/formDecorators/Column';
import AnimatedView           from '../../components/animatedView/AnimatedView';

class InstitutionHome extends PureComponent {

  static PropTypes ={
        // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
        // views:
    currentView:    PropTypes.string.isRequired,
    enterInstitutionHome: PropTypes.func.isRequired,
    leaveInstitutionHome: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {enterInstitutionHome} = this.props;
    enterInstitutionHome();
  }

  componentWillMount() {
    const {leaveInstitutionHome} = this.props;
    leaveInstitutionHome();
  }

  render() {
    return(
            <AnimatedView>

                <div style={{minHeight:'60vh'}} className="uk-container uk-container-center">
        
                <h2 className=" uk-margin-top uk-text-center-small">Portal do Programa Amgen</h2>
                <hr/>               
        
                <div className="uk-form-row uk-margin-large-top"> 
                    <Grid styleNames="uk-grid-small ">
                        <Column cols={3} col={1} size="medium" styleNames="uk-text-center uk-margin-large-bottom">
                            <Link to={'/admin/institution/request_exam'} className="black boxed ">
                            <i className="fa fa-calendar-check-o fa-4x" />
                            <br />
                            <span>Solicitação de <br /> Exame</span>
                            </Link>
                        </Column>

                        <Column cols={3} col={1} size="medium" styleNames="uk-text-center uk-margin-large-bottom">
                            <Link to={'/admin/laboratory/report_request_exam'} className="black boxed ">
                            <i className="fa fa-pie-chart fa-4x" />
                            <br />
                            <span>Relatório Solicitação <br />de Exame</span>
                            </Link>
                        </Column>

                        <Column cols={3} col={1} size="medium" styleNames="uk-text-center uk-margin-large-bottom">
                            <Link to={'/documents'} className="black boxed ">
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

export default InstitutionHome;
