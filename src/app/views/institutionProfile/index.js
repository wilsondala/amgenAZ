// @flow weak

import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import * as viewsActions        from '../../redux/modules/views';
import * as institutionActions  from '../../redux/modules/institution';
import * as statesActions  from '../../redux/modules/states';
import * as citiesActions  from '../../redux/modules/cities';
import * as addressActions        from '../../redux/modules/address';
import InstitutionProfile      from './InstitutionProfile';

const mapStateToProps = (state) => {
  //console.log("state: ", state.isFetchingUpdateProfile)
  return {
    // views
    currentView:          state.views.currentView,
    // institution:
    isFetchingUpdateProfile: state.institution.isFetchingUpdateProfile,
  
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views
      enterInstitutionProfile: viewsActions.enterInstitutionProfile,
      leaveInstitutionProfile: viewsActions.leaveInstitutionProfile,
      
      // actions
      ...institutionActions,
      ...statesActions,
      ...citiesActions,
      getAddressByZipcode: addressActions.getAddressByZipcodeIfNeeded
    },
    dispatch
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstitutionProfile);
