// @flow weak

import React, {
  Component
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  Route,
  Redirect,
  withRouter
}                         from 'react-router-dom';
import auth               from '../../services/auth';

class PrivateRoute extends Component {
  
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    component:  PropTypes.any.isRequired,
    path:       PropTypes.string
  };

  render() {
    const {
      component: InnerComponent,
      ...rest
    } = this.props;
    const { location } = this.props;

    const isUserAuthenticated = this.isAuthenticated();
    const isTokenExpired      = this.isExpired();
    //console.log('Expirado -> ', isTokenExpired, isUserAuthenticated);
    return (
      <Route
        {...rest}
        render={
          props => (
            !isTokenExpired && isUserAuthenticated
              ? <InnerComponent {...props} />
              : <Redirect to={{ pathname: '/login', state: { from: location } }} />
          )
        }
      />
    );
  }

  isAuthenticated() {
    const checkUserHasId  = user => user && user.code;
    const user            = auth.getUserInfo() 
                            ? auth.getUserInfo() 
                            : null;
    const isAuthenticated = auth.getToken() && checkUserHasId(user) 
                            ? true
                            : false;
    return isAuthenticated;
  }

  isExpired() {
    // comment me:
    // console.log('token expires: ', auth.getTokenExpirationDate(auth.getToken()));

    return auth.isExpiredToken(auth.getToken());
  }
}

export default withRouter(PrivateRoute);
