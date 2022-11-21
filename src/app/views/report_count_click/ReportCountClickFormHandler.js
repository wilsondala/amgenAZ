// @flow weak

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { change, untouch } from 'redux-form';
import Auth, { auth } from '../../services/auth';
import AnimatedView from '../../components/animatedView/AnimatedView';
import ReportCountClickForm from './ReportCountClickForm';


class ReportCountClickFormHandler extends PureComponent {

  static PropTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    //views
    currentView: PropTypes.string.isRequired,
    enterReportCountClickForm: PropTypes.func.isRequired,
    leaveReportCountClickForm: PropTypes.func.isRequired,
    //Exams
    getExamTypeListIfNeeded: PropTypes.func.isRequired,
    //Physician
    getPhysicianListIfNeeded: PropTypes.func.isRequired,

    isFetching: PropTypes.bool
  };

  static defaultProps = {
  }

  state = {
    user: [],
    profile: 0,
    tumorType: [],
    exams: [],
    examStatus: [],
    physicians: [],
    exam: {
      Id: undefined,
      ExamType: undefined,
      Ticket: undefined,
    },
    dInitialDate: '',
    dFinalDate: '',
    dTumorType: '',
    dExam: '',
    dExamStatus: '',
    dPhysician: '',
    dPatientCPF: '',
    dTicket: '',
    filterCPF: '',
    filterTPXCOD: '',
    allRequests: [],
    clientRequests: [],
    physicianRequests: [],
    examObs: '',
    examUltObs: '',

    dataRequest: [],
    reportColumns: [],
    templateColumns: {
        master:[
        { Header: 'Nome do Usuário', accessor: 'Usuario', width: 300 },
        { Header: 'Perfil do Usuário', accessor: 'Perfil', width: 100 },
        { Header: 'Login Autenticado', accessor: 'Authentication' , style: { textAlign: 'center' }},
        { Header: 'Nova Solicitação de Exame', accessor: 'NovoExame', style: { textAlign: 'center' } },
        { Header: 'Baixa de Exame', accessor: 'BaixaExame', style: { textAlign: 'center' } },
        { Header: 'Relatório Solicitação de Exame', accessor: 'RelatorioExame', style: { textAlign: 'center' } },
        { Header: 'Relatório TAT', accessor: 'RelatorioExameTAT', style: { textAlign: 'center' } },
        { Header: 'Relatório Solicitação Exame Bacchi', accessor: 'RelatorioExameBacchi', style: { textAlign: 'center' } },
        { Header: 'Download Laudo IHQ', accessor: 'DownloadLaudoIHQ', style: { textAlign: 'center' } },
        { Header: 'Download Laudo NGS', accessor: 'DownloadLaudoNGS', style: { textAlign: 'center' } },
        { Header: 'Download Termo Consentimento', accessor: 'DownloadTermoConsentimento', style: { textAlign: 'center' } },
        { Header: 'Download Laudo Anatomopatologico', accessor: 'DownloadLaudoAnatomopatologico', style: { textAlign: 'center' } },
        { Header: 'Download Laudo PDL1', accessor: 'DownloadLaudoPDL1', style: { textAlign: 'center' } },
        { Header: 'Download Laudo Foundation One', accessor: 'DownloadLaudoFoundationOne', style: { textAlign: 'center' } }
       ],
      },
    isBacchi: false
  }

  componentDidMount() {
    try {
      const { enterReportCountClickForm } = this.props;

      enterReportCountClickForm();

      const user = auth.getUserInfo();

      this.setState({ profile: user.UserType },
        () => {

          this.cleanForm();
          this.setReportColumns();

        });

    } catch (e) {

    }
  }

  componentWillUnmount() {
    const { leaveReportCountClickForm } = this.props;
    leaveReportCountClickForm();
    this.cleanForm();
  }


  

  setReportColumns = async () => {
    try {

      let userProfile = 'master';
      this.setState({ reportColumns: this.state.templateColumns[userProfile] });

    } catch (e) {
      console.log('setReportColumns() went wrong..., error: ', e);
    }
  }

  handleChange = (target, value) => {
    switch (target) {
      case 'InitialDate':
        this.setState({ dInitialDate: value });
        break;
      case 'FinalDate':
        this.setState({ dFinalDate: value });
        break;
      default:
    }

  }

  cleanForm = async () => {
  }

  handleSearch = async () => {
    try {
      const { getReportCountClickIfNeeded } = this.props;
      const user = Auth.getUserInfo();

      if (this.state.dInitialDate != '' && this.state.dFinalDate == '') {
        UIkit.modal.alert('A Data final deve ser preenchida.');
        return;
      }
      if (this.state.dInitialDate == '' && this.state.dFinalDate != '') {
        UIkit.modal.alert('A Data inicial deve ser preenchida.');
        return;
      }
      if (this.state.dInitialDate > this.state.dFinalDate) {
        UIkit.modal.alert('A Data inicial não pode ser maior do que a Data final.');
        return;
      }
      this.setState({ dataRequest: [] });

      let response = await getReportCountClickIfNeeded(
          this.state.dInitialDate,
          this.state.dFinalDate
        );

        if (response.error !== undefined) {
          UIkit.modal.alert(response.error.response.data.Message);
        }

        if (response.payload.data && response.payload.data.length > 0) {
          this.setState({ dataRequest: response.payload.data });

          console.log('dataRequest', this.state.dataRequest);

        } else {
          this.setState({ dataRequest: [] });
          UIkit.modal.alert('Não foram encontradas solicitações de exame.');
        }
     
      } catch (error) {
      console.error('get report went wrong..., error: ', error);
    }
  }



  render() {
    return (
      <AnimatedView>
        <div  style={{ minHeight: '50vh' }} className="uk-container uk-container-center">
          <div id='titleAmgenLogin' className='mobile' ><h2 className="uk-margin-top uk-text-center-small" >RELATÓRIO &nbsp;CONTROLE DE CLIQUES </h2></div>
          <hr />

          <ReportCountClickForm
            profile={this.state.profile}

            handles={{
              handleChange: this.handleChange,
              handleSearch: this.handleSearch              
            }}

            isFetching={this.props.isFetching}

            columns={this.state.reportColumns}
            dataRequest={this.state.dataRequest}

          />
        </div>
      </AnimatedView>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.ReportCountClickForm,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('ReportCountClickForm', field, value));
    },
    untouchField: function (field) {
      dispatch(untouch('ReportCountClickForm', field));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportCountClickFormHandler);
