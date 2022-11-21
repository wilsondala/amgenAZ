// @flow weak

import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import * as examActions           from '../../redux/modules/exam';
import * as healthUnitActions     from '../../redux/modules/healthUnit';
import * as patientActions        from '../../redux/modules/patient';
import * as physicianActions      from '../../redux/modules/physician';
import * as statesActions         from '../../redux/modules/states';
import * as stagesActions         from '../../redux/modules/stages';
import * as citiesActions         from '../../redux/modules/cities';
import * as viewsActions          from '../../redux/modules/views';
import * as addressActions        from '../../redux/modules/address';
import * as institutionActions    from '../../redux/modules/institution';
import RequestExamFormHandler     from './RequestExamFormHandler';

const mapStateToProps = (state) => {
  return {
    // views
    currentView: state.views.currentView,
    isFetching: state.exam.isFetching || state.patient.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      //exams
      ...examActions,
      //healthUnits
      ...healthUnitActions,         
      // patients
      ...patientActions,
      //physician
      ...physicianActions,
      //states
      ...statesActions, 
      //stage
      ...stagesActions,
      //address
      ...addressActions,
      //institution
      ...institutionActions,
      // views
      enterRequestExamForm: viewsActions.enterRequestExamForm,
      leaveRequestExamForm: viewsActions.leaveRequestExamForm,
      getCitiesIfNeeded: citiesActions.getCitiesIfNeeded,
      getAddressByZipcode: addressActions.getAddressByZipcodeIfNeeded
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestExamFormHandler);
