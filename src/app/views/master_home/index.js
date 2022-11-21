// @flow weak

import { connect }                 from 'react-redux';
import { bindActionCreators }      from 'redux';
import * as viewsActions           from '../../redux/modules/views';
import MasterHome                  from './MasterHome';

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
      enterMasterHome: viewsActions.enterMasterHome,
      leaveMasterHome: viewsActions.leaveMasterHome
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterHome);
