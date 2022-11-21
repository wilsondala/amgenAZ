// @flow weak

import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import * as viewsActions        from '../../redux/modules/views';
import * as institutionActions  from '../../redux/modules/institution';
import * as statesActions  from '../../redux/modules/states';
import * as citiesActions  from '../../redux/modules/cities';
import * as addressActions        from '../../redux/modules/address';
import RegisterInstitution      from './RegisterInstitution';

const mapStateToProps = (state) => {
  console.log("STATE: ", state.institution.isFetchingGet)
  return {
    // views
    currentView:          state.views.currentView,
    // institution:
    isFetching:           state.institution.isFetching,
    isFetchingGet:        state.institution.isFetchingGet,
  
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views
      enterRegisterInstitution: viewsActions.enterRegisterInstitution,
      leaveRegisterInstitution: viewsActions.leaveRegisterInstitution,
      
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
)(RegisterInstitution);
