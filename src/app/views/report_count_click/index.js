// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReportCountClickFormHandler from './ReportCountClickFormHandler';
import * as viewsActions from '../../redux/modules/views';
import * as examActions from '../../redux/modules/exam';
import * as physicianActions from '../../redux/modules/physician';

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
      //Physician
      ...physicianActions,
      //Views
      enterReportCountClickForm: viewsActions.enterReportCountClickForm,
      leaveReportCountClickForm: viewsActions.leaveReportCountClickForm
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportCountClickFormHandler);