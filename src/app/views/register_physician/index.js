// @flow weak

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import * as physicianActions from '../../redux/modules/physician';
import * as statesActions from '../../redux/modules/states';
import * as citiesActions from '../../redux/modules/cities';
import * as healthUnitActions from '../../redux/modules/healthUnit';
import * as viewsActions from '../../redux/modules/views';

import RegisterPhysician from './RegisterPhysician';

const mapStateToProps = (state) => {
  return {
    // views
    currentView: state.views.currentView,
    // physician:
    isFetching: state.physician.isFetching,
    isFetchingListPhysician: state.physician.isFetchingListPhysician,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views
      enterRegisterPhysician: viewsActions.enterRegisterPhysician,
      leaveRegisterPhysician: viewsActions.leaveRegisterPhysician,

      // actions
      ...physicianActions,
      ...statesActions,
      getCitiesIfNeeded: citiesActions.getCitiesIfNeeded,
      getHealthUnitListIfNeeded: healthUnitActions.getHealthUnitListIfNeeded,
      getHealthUnitByUnscodIfNeeded: healthUnitActions.getHealthUnitByUnscodIfNeeded
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPhysician);
