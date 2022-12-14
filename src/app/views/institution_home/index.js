// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import InstitutionHome        from './InstitutionHome';

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
        enterInstitutionHome: viewsActions.enterInstitutionHome,
        leaveInstitutionHome: viewsActions.leaveInstitutionHome
      },
      dispatch
    );
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(InstitutionHome);