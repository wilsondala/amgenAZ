// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReportRequestExamFormHandler from './ReportRequestExamFormHandler';
import * as viewsActions from '../../redux/modules/views';
import * as examActions from '../../redux/modules/exam';
import * as physicianActions from '../../redux/modules/physician';
import * as healthUnit from '../../redux/modules/healthUnit'

const mapStateToProps = (state) => {
  return {
    // viewsw
    currentView: state.views.currentView,
    isFetching: state.exam.isFetching || state.physician.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      //Exams
      ...examActions,
      insertObsExam: examActions.insertObsExamIfNeeded,
      //Physician
      ...physicianActions,
      //healthUnit
      ...healthUnit,
      //Views
      enterReportRequestExamForm: viewsActions.enterReportRequestExamForm,
      leaveReportRequestExamForm: viewsActions.leaveReportRequestExamForm
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportRequestExamFormHandler);