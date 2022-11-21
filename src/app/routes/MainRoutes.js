// @flow weak

import React from 'react';
import { Route, Switch } from 'react-router';
import PrivateRoute from '../components/privateRoute/PrivateRoute';


/* Home */
import Home from '../views/home';
import Login from '../views/login';
import InstitutionHome from '../views/institution_home';
import PhysicianHome from '../views/physician_home';
import MasterHome from '../views/master_home';
import ClientHome from '../views/client_home';

/* Public Routes */
import RegisterMenu from '../views/register_menu';
import RegisterPhysician from '../views/register_physician';
import RegisterInstitution from '../views/register_institution';
import RedefinePassword from '../views/redefine_password';
import ResetPassword from '../views/reset_password'
import PageInContruction from '../views/pageInConstruction';

import PhysicianProfile from '../views/physicianProfile';
import InstitutionProfile from '../views/institutionProfile';
import Documents from '../views/Documents';

/* Exam */
import RequestExam from '../views/request_exam';

/* Reports */
import ReportRequestExam from '../views/report_request_exam';
import ReportCountClick from '../views/report_count_click';

const MainRoutes = () => {
  return (
    <Switch>

      {/* public views */}
      <Route exact path="/" component={Home} />
      <Route path="/register_physician" component={RegisterPhysician} />
      
      <Route path="/register_institution" component={RegisterInstitution} />
      <Route path="/redefine_password" component={RedefinePassword} />
      <Route path="/register_menu" component={RegisterMenu} />
      <Route path="/admin/page_in_construction" component={PageInContruction} />
      <Route path="/documents" component={Documents} />

      {/* private views: need user to be authenticated */}
      
      {/* Data correction pages entered by users */}
      <PrivateRoute path="/sudo/reset_password" component={ResetPassword} />

      {/* Home */}
      {<PrivateRoute exact path="/admin/institution" component={InstitutionHome} />}
      {<PrivateRoute exact path="/admin/physician" component={PhysicianHome} />}
      {<PrivateRoute exact path="/admin/master" component={MasterHome} />}
      {<PrivateRoute exact path="/admin/client" component={ClientHome} />}

      {/* Physician */}
      
      {<PrivateRoute path="/admin/physician/request_exam" component={RequestExam} />}
      {<PrivateRoute exact={true} path="/admin/physician/report_request_exam" component={ReportRequestExam} />}
      {<PrivateRoute exact={true} path="/admin/physician/report_request_exam/:PESCPF/:TPXCOD" component={ReportRequestExam} />}
      {<PrivateRoute path="/physician_profile" component={PhysicianProfile} />}

      {/* Master */}
      {<PrivateRoute path="/admin/master/report_request_exam" component={ReportRequestExam} />}
      {<PrivateRoute path="/admin/master/report_count_click" component={ReportCountClick} />}


      {/* Laboratory */}
      {<PrivateRoute path="/admin/laboratory/report_request_exam" component={ReportRequestExam} />}

      {/* Institution */}
      {<PrivateRoute path="/admin/institution/request_exam" component={RequestExam} />}
      {<PrivateRoute path="/admin/institution/page_in_construction" component={PageInContruction} />}
      {<PrivateRoute path="/admin/institution/report_request_exam" component={ReportRequestExam} />}
      {<PrivateRoute path="/institution_profile" component={InstitutionProfile} />}

      {/* Client */}
      {<PrivateRoute path="/admin/client/report_request_exam" component={ReportRequestExam} />}

    </Switch>
  );
};

export default MainRoutes;
