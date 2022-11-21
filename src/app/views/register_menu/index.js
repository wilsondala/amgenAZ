// @flow weak

import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import * as viewsActions        from '../../redux/modules/views';
import RegisterMenuForm     from './RegisterMenuForm';

const mapStateToProps = (state) => {
  return {
    // views
    currentView:          state.views.currentView,
    // institution:
    isFetching:           state.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views
      enterRegisterMenu: viewsActions.enterRegisterMenu,
      leaveRegisterMenu: viewsActions.leaveRegisterMenu
        
    },
    dispatch
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterMenuForm);
