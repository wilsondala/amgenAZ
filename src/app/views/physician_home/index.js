// @flow weak

import { connect }                 from 'react-redux';
import { bindActionCreators }      from 'redux';
import * as viewsActions           from '../../redux/modules/views';
import PhysicianHome                  from './PhysicianHome';

const mapStateToProps = (state) => {
  return {
    // views
    currentView:  state.views.currentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views
      enterPhysicianHome: viewsActions.enterPhysicianHome,
      leavePhysicianHome: viewsActions.leavePhysicianHome
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhysicianHome);
