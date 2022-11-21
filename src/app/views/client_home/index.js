// @flow weak

import { connect }                 from 'react-redux';
import { bindActionCreators }      from 'redux';
import * as viewsActions           from '../../redux/modules/views';
import ClientHome                  from './ClientHome';

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
      // enterClientHome: viewsActions.enterClientHome,
      // leaveClientHome: viewsActions.leaveClientHome
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientHome);
