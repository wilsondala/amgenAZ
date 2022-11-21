// @flow weak

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { change, untouch } from 'redux-form';
import Auth, { auth } from '../../services/auth';
import AnimatedView from '../../components/animatedView/AnimatedView';
import ReportRequestExamForm from './ReportRequestExamForm';
import downloadArchive from '../../Utils/downloadArchive';
import { valida_cpf } from '../../services/utils/ValidaCpfCnpj';
import { isNullOrUndefined } from 'util';
import { ModalUtils } from '../../components/formDecorators';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

class ReportRequestExamFormHandler extends PureComponent {

  static PropTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // views
    currentView: PropTypes.string.isRequired,
    enterReportRequestExamForm: PropTypes.func.isRequired,
    leaveReportRequestExamForm: PropTypes.func.isRequired,

    isFetching: PropTypes.bool
  };

  static defaultProps = {
  }

  state = {
    user: [],
    enumUserProfile: {
      4: 'supervisor',
      9: 'physician',
      13: 'physician',
      40: 'physician',
      6: 'client',
      12: 'institution'
    },
    profile: 0,
    tumorType: [],
    exams: [],
    laboratories: [],
    examStatus: [],
    physicians: [],
    exam: {
      Id: undefined,
      ExamType: undefined,
      Ticket: undefined
    },
    dInitialDate: '',
    dFinalDate: '',
    dExamType: '',
    dExamStatus: '',
    dLaboratory: '',
    dPhysicianCode: '',
    dPatientCPF: '',
    dPatientCode: '',
    dPatientName: '',
    dTicket: '',
    filterCPF: '',
    filterTPXCOD: '',
    allRequests: [],
    clientRequests: [],
    physicianRequests: [],
    examObs: '',
    examUltObs: '',
    disablePhysician: false,
    dataRequest: [],
    reportColumns: [],
    templateColumns: {
     
      physician: [
        { Header: 'Laudo PDL-1', accessor: 'CodLaudoPdl', Cell: row => this.addButtonLaudo(row.original, 3), style: { textAlign: 'center' }, export: false },
        { Header: 'Laudo FoundationOne CDX ', accessor: 'CodLaudoCdx', Cell: row => this.addButtonLaudo(row.original, 2), style: { textAlign: 'center' }, export: false },
        // { Header: 'Código do paciente', accessor: 'PatientId' },
        { Header: 'Nome do Paciente', accessor: 'PatientName' },
        { Header: 'Nº Protocolo', accessor: 'Ticket' },
        { Header: 'Status do Protocolo', accessor: 'ExamStatus' },
        { Header: 'CPF Paciente', accessor: 'PatientCPF' },
        // { Header: 'Orígem', accessor: 'Origim' },
        { Header: 'Dt. Solicitação', accessor: 'SolicitationDate' },
        { Header: 'Dt. Início Análise', accessor: 'AnalyzeDate' },
        { Header: 'Dt. Liberação Resultado', accessor: 'DtResultLiberation' },
        { Header: 'Instituição', accessor: 'InstitutionName' },
        // { Header: 'Nome do Médico Solicitante', accessor: 'PhysicianName' },
        // { Header: 'CRM', accessor: 'CRM' },
        { Header: 'Laboratório', accessor: 'LaboratoryName' },
        { Header: 'Tipo de Exame', accessor: 'ExamType' },
        { Header: 'Dt. de Cancelamento', accessor: 'CancelationDate' },
        { Header: 'Motivo Status', accessor: 'Reason' },
        { Header: 'Nº Protocolo', accessor: 'Ticket' },
        { Header: 'Resultado CDx', accessor: 'ResultadoCDx' },
        { Header: 'Resultado PD-L1', accessor: 'ResultadoPDL1' }
      ],
      
      institution: [
        { Header: 'Código do paciente', accessor: 'PatientId' },
        { Header: 'Nome do Paciente', accessor: 'PatientName' },
        { Header: 'Nº Protocolo', accessor: 'Ticket' },
        { Header: 'Status do Protocolo', accessor: 'ExamStatus' },
        { Header: 'CPF Paciente', accessor: 'PatientCPF' },
        // { Header: 'Orígem', accessor: 'Origim' },
        { Header: 'Dt. Solicitação', accessor: 'SolicitationDate' },
        { Header: 'Dt. Início Análise', accessor: 'AnalyzeDate' },
        { Header: 'Dt. Liberação Resultado', accessor: 'DtResultLiberation' },
        { Header: 'Instituição', accessor: 'InstitutionName' },
        { Header: 'Nome do Médico Solicitante', accessor: 'PhysicianName' },
        { Header: 'CRM', accessor: 'CRM' },
        { Header: 'Laboratório', accessor: 'LaboratoryName' },
        { Header: 'Tipo de Exame', accessor: 'ExamType' },
        { Header: 'Status do Exame', accessor: 'ExamStatus' },
        { Header: 'Dt. de Cancelamento', accessor: 'CancelationDate' },
        { Header: 'Motivo Status', accessor: 'Reason' },
        { Header: 'Resultado CDx', accessor: 'ResultadoCDx' },
        { Header: 'Resultado PD-L1', accessor: 'ResultadoPDL1' }
        
      ],

      client: [
        { Header: 'Código do paciente', accessor: 'PatientId' },
        { Header: 'Nº Protocolo', accessor: 'Ticket' },
        // { Header: 'Origem Solicitação', accessor: 'Origin' },
        { Header: 'Nome do médico', accessor: 'PhysicianName' },
        { Header: 'CRM', accessor: 'CRM' },
        { Header: 'Laboratório', accessor: 'LaboratoryName' },
        // { Header: 'UF', accessor: 'UF' },
        // { Header: 'Cidade', accessor: 'City' },
        { Header: 'Instituição', accessor: 'InstitutionName' },
        { Header: 'Dt. Solicitação', accessor: 'SolicitationDate' },
        // { Header: 'Dt. da Coleta', accessor: 'SampleCollectedDate' },
        { Header: 'Dt. Inicial de Pendência', accessor: 'InitialPendentDate' },
        { Header: 'Dt. Final de Pendência', accessor: 'FinalPendentDate' },
        { Header: 'Dt. da Analise', accessor: 'AnalyzeDate' },
        { Header: 'Dt. de Conclusão', accessor: 'ConclusionDate' },
        { Header: 'Dt. de Cancelamento', accessor: 'CancelationDate' },
        // { Header: 'Tipo de Tumor', accessor: 'TumorType' },
        { Header: 'Tipo de Exame', accessor: 'ExamType' },
        { Header: 'Status do Exame', accessor: 'ExamStatus' }
        // { Header: 'Resultado CDx', accessor: 'ResultadoCDx' }
        // { Header: 'Motivo Status', accessor: 'Reason' }
      ],


      allWithOutReports: [
        { Header: 'Código do paciente', accessor: 'PatientId' },
        { Header: 'Nº Protocolo', accessor: 'Ticket'
        // ,Cell: row => this.addObsButton(row.original), style: { textAlign: 'center' }, export: true  
         },
        { Header: 'Nome do paciente', accessor: 'PatientName' },
        { Header: 'CPF paciente', accessor: 'PatientCPF' },
        // { Header: 'Origem Solicitação', accessor: 'Origin' },
        { Header: 'Nome do médico', accessor: 'PhysicianName' },
        { Header: 'CRM', accessor: 'CRM' },
        { Header: 'Laboratório', accessor: 'LaboratoryName' },
        // { Header: 'UF', accessor: 'UF' },
        // { Header: 'Cidade', accessor: 'City' },
        { Header: 'Instituição', accessor: 'InstitutionName' },
        { Header: 'Dt. Solicitação', accessor: 'SolicitationDate' },
        // { Header: 'Dt. da Coleta', accessor: 'SampleCollectedDate' },
        { Header: 'Dt. Inicial de Pendência', accessor: 'InitialPendentDate' },
        { Header: 'Dt. Final de Pendência', accessor: 'FinalPendentDate' },
        { Header: 'Dt. da Analise', accessor: 'AnalyzeDate' },
        { Header: 'Dt. de Conclusão', accessor: 'ConclusionDate' },
        { Header: 'Dt. de Cancelamento', accessor: 'CancelationDate' },
        // { Header: 'Tipo de Tumor', accessor: 'TumorType' },
        { Header: 'Tipo de Exame', accessor: 'ExamType' },
        { Header: 'Status do Exame', accessor: 'ExamStatus' },
        // { Header: 'Resultado', accessor: 'Result' },
        // { Header: 'Resultado NTRK', accessor: 'ResultMutationNGS' },
        // { Header: 'Resultado PDL-1', accessor: 'ResultMutationPDL1' },
        { Header: 'Motivo Status', accessor: 'Reason' },
        { Header: 'Resultado CDx', accessor: 'ResultadoCDx' },
        { Header: 'Resultado PD-L1', accessor: 'ResultadoPDL1' }
      ]
    },
    isBacchi: false
  }

  componentDidMount() {
    try {
      const { enterReportRequestExamForm } = this.props;

      enterReportRequestExamForm();

      const user = auth.getUserInfo();
      
      this.setState({ profile: user.userType },
        () => {
          if (user.userType == 9) {
            this.setState({ dPhysicianCode: user.code, disablePhysician: true });
            this.props.changeFieldValue('physician', user.code);
          }

          this.cleanForm();
          this.getExams();
          this.getExamStatus();
          this.getPhysicians();
          this.setReportColumns();
          this.getLaboratories();
        });
    } catch (e) {

    }
  }

  componentWillUnmount() {
    const { leaveReportRequestExamForm } = this.props;
    leaveReportRequestExamForm();
    this.cleanForm();
  }

  addButtonLaudo(row, tlacod) {
    const codFile = tlacod === 2 ? row.CodLaudoCdx : row.CodLaudoPdl;
    const action = () => this.downloadLaudo(codFile);

    return (
      codFile &&
      <a className="uk-button uk-button-small uk-button-success  uk-margin-small-bottom"
        onClick={() => action()}>
        <i className="fa fa-download" />
      </a>);
  }

  downloadLaudo = async (exlcod) =>  {
    // console.log('TESTE BUTÃO DOWNLOAD. EXLCOD => ', exlcod);
    try{
      if(exlcod !== undefined && exlcod > 0)      {
        const { downloadLaudoIfNeeded } = this.props;
        const response = await downloadLaudoIfNeeded(exlcod);

        if (response.error !== undefined) {
          UIkit.modal.alert(response.error.response.data.Message);
          return;
        }

        if (response.payload.status === 204) {
          UIkit.modal.alert('Nenhum Exame encontrado');
          return;
        }

        const { data } = response.payload;

        downloadArchive(data.raw, data.fullName);

        // console.log("RETORNO: ", data);
      }
    }catch(erro) {
      UIkit.modal.alert('Ocorreu um erro inesperado ao tentar realizar o download do arquivo.');
      console.log('Erro ao tentar faxer download do arquivo: ', erro);
    }
  }

  getExams = async () => {
    try {
      const user = Auth.getUserInfo();

      if (user.UserType === 40) {
        await this.getExamsByHealthUnit(user.Id);
        return;
      }

      const { getExamTypeListIfNeeded } = this.props;
      const response = await getExamTypeListIfNeeded();

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);
        return;
      }

      if (response.payload.status === 204) {
        UIkit.modal.alert('Nenhum Exame encontrado');
        return;
      }

      const { data } = response.payload;

      const exams = [{ value: '', text: 'Selecione' }];

      data.forEach(state => {
        exams.push({ value: state.id, text: state.name });
      }, this);

      this.setState({ exams: exams });
    } catch (error) {
      console.log('get exams went wrong..., error: ', error);
    }
  }

  getLaboratories = async () => {
    try {
      const { getHealthUnitListIfNeeded } = this.props;
      
      const response = await getHealthUnitListIfNeeded(13);

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);
      } else if (response.payload.status === 204) {
        UIkit.modal.alert('Nenhum Laboratório encontrado');
      } else {
        const { data } = response.payload;
        const laboratories = [{ value: '', text: 'Selecione' }, {value: 48069, text: 'FOUNDATION MEDICINE'}];
        // data.forEach(state => {
        //   laboratories.push({ value: state.Id, text: state.Name });
        // }, this);

        this.setState({ laboratories: laboratories });
      }
    } catch (error) {
      console.error('get laboratories went wrong..., error: ', error);
    }
  }


  getExamsByHealthUnit = async (userId) => {
    try {
      const { getTypeExamsByHealthUnitIfNeeded } = this.props;
      const response = await getTypeExamsByHealthUnitIfNeeded(userId);

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);
        return;
      }

      if (response.payload.status === 204) {
        UIkit.modal.alert('Nenhum Exame encontrado');
        return;
      }

      const { data } = response.payload;
      const exams = [{ value: '', text: 'Selecione' }];

      if (this.state.IHQExam) {
        data.forEach(state => {
          if (_.includes(state.ExamTypeName, 'IHQ')) {
            exams.push({ value: state.ExamTypeId, text: state.ExamTypeName });
          }
        }, this);
      } else if (this.state.NGSExam) {
        data.forEach(state => {
          if (_.includes(state.ExamTypeName, 'NGS')) {
            exams.push({ value: state.ExamTypeId, text: state.ExamTypeName });
          }
        }, this);
      } else {
        data.forEach(state => {
          exams.push({ value: state.ExamTypeId, text: state.ExamTypeName });
        }, this);
      }

      this.setState({ exams: exams, specificLaboratoryExams: exams });
    } catch (error) {
      console.error('get exams went wrong..., error: ', error);
    }
  }

  getExamStatus = async () => {
    try {
      const agecod = 0; // Parameter to get all list of status
      const user = Auth.getUserInfo();

      const { getExamStatusIfNeeded } = this.props;
      const response = await getExamStatusIfNeeded();

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error);
        return;
      }
      if (response.payload.status === 204) {
        UIkit.modal.alert('Erro ao buscar status do exame');
        return;
      }
      if (response.payload.data != null) {
        const data = response.payload.data;
        const exam = [{ value: '', text: 'Selecione' }];

        data.forEach(state => {
          if (user.UserType == 13 && (state.Status != 'PENDENTE APROVAÇÃO BAYER' && state.Status != 'NEGADO')) {
            exam.push({ value: state.Id, text: state.Status });
          }          else if (user.UserType != 13) {
            exam.push({ value: state.Id, text: state.Status });
          }
        });

        this.setState({ examStatus: exam });
      }
    } catch (error) {
      console.log('get exam status went wrong..., error: ', error);
    }
  }

  getPhysicians = async () => {
    try {
      const user = auth.getUserInfo();
      let response;

      if (user.UserType == 40 && user.Id != 2903380) {
        const { getPhysicianListByUsucodIfNeeded } = this.props;
        response = await getPhysicianListByUsucodIfNeeded(user.Id);
      } else if (user.UserType == 40 && user.Id == 3031704) {
        const { getPhysicianListIfNeeded } = this.props;
        response = await getPhysicianListIfNeeded(0);
      } else {
        const { getPhysicianListIfNeeded } = this.props;
        const usuCod = user.UserType == 12 ? user.Id : 0;
        response = await getPhysicianListIfNeeded(usuCod);
      }

      if (response == undefined) {
        UIkit.modal.alert('Ocorreu um erro ao tentar buscar os médicos.');
      } else if (response.error) {
        UIkit.modal.alert(response.error.response.data.Message);
      } else if (response.payload.status === 204) {
        UIkit.modal.alert('Nenhum médico encontrado');
      } else {
        const { data } = response.payload;
        const physicians = [{ value: '', text: 'Selecione' }];

        data.forEach(physician => {
          physicians.push({ value: physician.Id, text: physician.Name });
        }, this);

        this.setState({ physicians: physicians });
      }
    } catch (error) {
      console.log('get physicians went wrong..., error: ', error);
    }
  }

  setReportColumns = async () => {
    try {
      const user = auth.getUserInfo();
      const userProfile = this.state.enumUserProfile[Number(user.userType)] || 'allWithOutReports';

      this.setState({ reportColumns: this.state.templateColumns[userProfile] });
    } catch (e) {
      console.log('setReportColumns() went wrong..., error: ', e);
    }
  }

  handleChange = (target, value) => {
    switch (target) {
    case 'patientCode':
      this.setState({ dPatientCode: value });
      break;
    case 'patientName':
      this.setState({ dPatientName: value });
      break;        
    case 'InitialDate':
      this.setState({ dInitialDate: value });
      break;
    case 'FinalDate':
      this.setState({ dFinalDate: value });
      break;
    case 'examsType':
      this.setState({ dExamType: value });
      break;
    case 'examStatus':
      this.setState({ dExamStatus: value });
      break;
    case 'laboratory':
      this.setState({ dLaboratory: value });
      break;
    case 'physician':
      this.setState({ dPhysicianCode: value });
      break;
    case 'patientCPF':
      this.setState({ dPatientCPF: value.replace(/[^0-9]/g, '') });
      break;
    case 'ticket':
      this.setState({ dTicket: value.replace('-', '') });
      break;
    default:
    }
  }

  cleanForm = async () => {
  }

  handleSearch = async () => {
    try {
      const { getReportRequestExamIfNeeded, getReportRequestExamBacchiIfNeeded } = this.props;
      const user = Auth.getUserInfo();

      let cpfFilter = '';
      let exameFilter = '';

      exameFilter = this.state.dExam;
      if (this.state.filterTPXCOD != '') {
        exameFilter = this.state.filterTPXCOD;
      }

      cpfFilter = this.state.dPatientCPF;
      if (this.state.filterCPF != '') {
        cpfFilter = this.state.filterCPF;
      }

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
      if (this.state.dPatientCPF != '' && (this.state.dPatientCPF.length < 11 || !valida_cpf(this.state.dPatientCPF))) {
        UIkit.modal.alert('O CPF digitado é invalido.');
        return;
      }
      if (this.state.dTicket != '' && this.state.dTicket.length < 7) {
        UIkit.modal.alert('O Número do protocolo digitado é invalido.');
        return;
      }
      this.setState({ dataRequest: [] });
      const id = [12, 13, 40].indexOf(user.UserType) < 0 ? -1 : user.Id;

      if (!this.state.isBacchi) {getReportRequestExamIfNeeded
        const response = await getReportRequestExamIfNeeded(
          user.UserType,          
          this.state.dPatientName,
          this.state.dInitialDate,
          this.state.dFinalDate,
          this.state.dPatientCode,
          this.state.dPatientCPF,
          this.state.dTicket.replace('-', ''),
          this.state.dExamType,
          this.state.dExamStatus,
          this.state.dLaboratory,
          this.state.dPhysicianCode
          );

        console.log('DADOS ', response.payload.data);

        if (response.error !== undefined) {
          UIkit.modal.alert(response.error.response.data.Message);
        }
        

        if (response.payload.data && response.payload.data.length > 0) {
          this.setState({ dataRequest: response.payload.data });
        } else {
          this.setState({ dataRequest: [] });
          UIkit.modal.alert('Não foram encontradas solicitações de exame.');
        }
      }
    } catch (error) {
      console.error('get report went wrong..., error: ', error);
    }
  }

  editFormatter(ticket, ageCod) {
    console.log('ticket', ticket);
    return (
      <a href="#" onClick={() => this.showModalObsExam(ticket, ageCod)} >{ticket}</a>
    );
  }

  editFormatterDownload(patientId, ageCod, tlaCod, type) {
    if (type == 'IHQ' && tlaCod == 6) {
      return (< div >
         <button title="Download do Laudo NTRK(IHQ)" type="button" disabled={this.props.isFetching} onClick={() => this.handleDownload(patientId, ageCod, tlaCod, type)}><i className={this.props.isFetching ? 'fa fa-spinner fa-pulse fa-fw' : 'fa fa-download'} /></button>
        </div >);
    }else if (type == 'NGS' && tlaCod == 7) {
      return (<div>
          <button title="Download do Laudo NTRK(NGS)" type="button" disabled={this.props.isFetching} onClick={() => this.handleDownload(patientId, ageCod, tlaCod, type)}><i className={this.props.isFetching ? 'fa fa-spinner fa-pulse fa-fw' : 'fa fa-download'} /></button>
        </div>);
    }else if (type == 'FOUNDATION' && tlaCod == 2) {
      return (<div>
          <button title="Download do Laudo FoundationOne CDX" disabled={this.props.isFetching} type="button" onClick={() => this.handleDownload(patientId, ageCod, tlaCod, type)}><i className={this.props.isFetching ? 'fa fa-spinner fa-pulse fa-fw' : 'fa fa-download'} /></button>
        </div>);
    }else if (type == 'FOUNDATION_PDL1' && tlaCod == 3) {
      return (<div>
        <button title="Download do Laudo PDL-1" type="button" disabled={this.props.isFetching} onClick={() => this.handleDownload(patientId, ageCod, tlaCod, type)}><i className={this.props.isFetching ? 'fa fa-spinner fa-pulse fa-fw' : 'fa fa-download'} /></button>
      </div>);
    }else if (tlaCod == 9) {
      return (<div>
        <button title="Download do TERMO DE CONSENTIMENTO" type="button" disabled={this.props.isFetching} onClick={() => this.handleDownload(patientId, ageCod, tlaCod, type)}><i className={this.props.isFetching ? 'fa fa-spinner fa-pulse fa-fw' : 'fa fa-download'} /></button>
      </div>);
    }else if (tlaCod == 8) {
      return (<div>
        <button title="Download do LAUDO ANATOMOPATOLÓGICO" type="button" disabled={this.props.isFetching} onClick={() => this.handleDownload(patientId, ageCod, tlaCod, type)}><i className={this.props.isFetching ? 'fa fa-spinner fa-pulse fa-fw' : 'fa fa-download'} /></button>
      </div>);
    }else{
      return null;
    }
  }

  addButton(row, type) {
    let title, action, icon;

    if (row.Origin === 'PORTAL AMGEN') {
      if (!['CONCLUÍDO', 'CANCELADO'].includes(row.ExamStatus) && type === 'Cancel') {
        title = 'Cancelar Exame';
        icon = 'fa-ban';
        action = () => this.showModalCancelExam(row.AgeCod, row.ExamType, row.Ticket);
      } else if (row.ExamStatus === 'CANCELADO' && type === 'Rehabilitate') {
        title = 'Reabilitar Exame';
        icon = 'fa-refresh';
        action = () => this.rehabilitateExam(row.AgeCod);
      } else {
        return undefined;
      }
      return (<div>
          <button title={title} type="button" onClick={() => action()}><i className={'fa ' + icon} /></button>
        </div>);
    } else {
      return undefined;
    }
  }

  addObsButton(row) {
    let title, action;


    title = row.Ticket;
    action = () => this.showModalObsExam(row.Ticket, row.AgeCod);
    
    return <a nohref onClick={() => action()}>{title}</a>;
  }

  showModalCancelExam = (id, examType, ticket) => {
    this.setState({
      exam: {
        Id: id,
        ExamType: examType,
        Ticket: ticket
      }
    }, () => ModalUtils.showModal('#cancelExamModal'));
  }

  showModalObsExam = (ticket, ageCod) => {
    debugger;
    this.setState(() => {
      this.getExamObs(ageCod);
    });

    this.setState({
      exam: {
        Ticket: ticket,
        AgeCod: ageCod
      }
    }, () => ModalUtils.showModal('#obsExamModal'));
  }

  hideModalCancelExam = () => {
    this.setState({
      exam: {
        Id: undefined,
        ExamType: undefined,
        Ticket: undefined
      }
    }, () => {
      ModalUtils.hideModal('#cancelExamModal');
      this.props.changeFieldValue('cancelExamReason', '');
    });
  }

  hideModalObsExam = () => {
    this.setState({
      exam: {
        Ticket: undefined,
        AgeCod: undefined
      }
    }, () => {
      ModalUtils.hideModal('#obsExamModal');
      this.props.changeFieldValue('obsExam', '');
    });
  }

  cancelExam = async () => {
    try {
      const user = Auth.getUserInfo();
      const exam = this.state.exam;
      const values = this.props.formValues.values;

      if (isNullOrUndefined(exam)) {
        UIkit.modal.alert('⚠ É necessário informar o exame.');
        return;
      } else if (isNullOrUndefined(exam.Id) || exam.Id < 1) {
        UIkit.modal.alert('⚠ É necessário informar o código do agendamento.');
        return;
      } else if (isNullOrUndefined(user) || isNullOrUndefined(user.Id) || user.Id < 1) {
        UIkit.modal.alert('⚠ É necessário estar logado.');
        window.location.hash = '/login';
      } else if (isNullOrUndefined(values) || values.cancelExamReason.trim() == '') {
        UIkit.modal.alert('⚠ É necessário informar o motivo do cancelamento.');
        return;
      }

      const examSchedule = {
        Id: exam.Id,
        Status: 3,
        UserId: user.Id,
        ReasonCancellation: values.cancelExamReason,
        ExamType: { Name: exam.ExamType },
        Patient: { Voucher: exam.Ticket }
      };

      const response = await this.props.updateExamIfNeeded(examSchedule);

      if (response.error !== undefined) {
        UIkit.modal.alert('⚠ ' + response.error.response.data.Message);
      } else if (response.payload.status === 200) {
        this.hideModalCancelExam();
        UIkit.modal.alert('✔ Exame Cancelado.');
        this.setState({ dataRequest: [] });
      }
    } catch (error) {
      console.error('[cancelExam] =>', error);
      UIkit.modal.alert('⚠ Erro ao tentar cancelar o exame, tente novamente mais tarde.');
    }
  }

  
  obsExam = async () => {
    try {
      const user = Auth.getUserInfo();
      const exam = this.state.exam;
      const values = this.props.formValues.values;

      const { insertObsExamIfNeeded } = this.props;

      if (isNullOrUndefined(exam)) {
        UIkit.modal.alert('⚠ É necessário informar o exame.');
        return;
      } else if (isNullOrUndefined(exam.AgeCod) || exam.AgeCod < 1) {
        UIkit.modal.alert('⚠ É necessário informar o código do agendamento.');
        return;
      } else if (isNullOrUndefined(user) || isNullOrUndefined(user.Id) || user.Id < 1) {
        UIkit.modal.alert('⚠ É necessário estar logado.');
        window.location.hash = '/login';
      } else if (isNullOrUndefined(values) || values.obsExam == undefined) {
        UIkit.modal.alert('⚠ É necessário informar uma observação.');
        return;
      }

      const examSchedule = {
        AgeCod: exam.AgeCod,
        Obs: values.obsExam,
        usuCod: user.Id
      };

      const response = await insertObsExamIfNeeded(examSchedule);

      if (response.error !== undefined) {
        UIkit.modal.alert('⚠ ' + response.error.response.data.Message);
      } else if (response.payload.status === 200) {
        const ret = this.getExamObs(exam.AgeCod);
        const msg = '✔ Observação do Exame inserida com sucesso.';

       // ret.forEach(obs => {
         //       obs.Obs_4 =! null ? msg = "Já foram inclusas 4 observações." : msg = "✔ Observação do Exame inserida com sucesso.";    

        // }); 

        this.props.changeFieldValue('obsExam', '');
        UIkit.modal.alert(msg);
        this.setState({ dataRequest: [] });
      }
    } catch (error) {
      console.error('[cancelExam] =>', error);
      UIkit.modal.alert('⚠ Erro ao tentar inserir a observação, tente novamente mais tarde.');
    }
  }

  getExamObs = async (ageCod) => {
    try {
      const { getComplementExamIfNeeded } = this.props;
      const response = await getComplementExamIfNeeded(ageCod);

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);
        return;
      }

      if (response.payload.status === 204) {
        UIkit.modal.alert('Nenhum Exame encontrado');
      }

      const { data } = response.payload;

      const resultUltObs = '';

      this.setState({examObs: data, examUltObs: resultUltObs});

      return ret;
    } catch (error) {
      console.log('get exams went wrong..., error: ', error);
    }
  }

  rehabilitateExam = async (id) => {
    try {
      const user = auth.getUserInfo();

      if (isNullOrUndefined(id) || id < 1) {
        UIkit.modal.alert('⚠ É necessário informar o código do agendamento.');
      } else if (isNullOrUndefined(user) || isNullOrUndefined(user.Id) || user.Id < 1) {
        UIkit.modal.alert('⚠ É necessário estar logado.');
        window.location.hash = '/login';
      }

      UIkit.modal.confirm('⚠ Deseja reativar o exame?', async () => {
        const response = await this.props.rehabilitateExamIfNeeded(id, user.Id);

        if (response.error !== undefined) {
          UIkit.modal.alert('⚠ ' + response.error.response.data.Message);
        } else if (response.payload.status === 200) {
          UIkit.modal.alert('✔ Exame Reabilitado.');
          this.setState({ dataRequest: [] });
        }
      });
    } catch (error) {
      UIkit.modal.alert('⚠ Erro ao tentar reabilitar o exame, tente novamente mais tarde.');
    }
  }

  handleDownload = async (patientId, ageCod, tlaCod, type) => {
    try {
      if (tlaCod > 0) {
        this.downloadFile(patientId, ageCod, tlaCod, type);
      }      else {
        UIkit.modal.alert('Paciente não possui laudo para esse exame.');
      }
    } catch (error) {
      console.error('download went wrong..., error: ', error);
    }
  }

  downloadFile = async (patientId, ageCod, tlaCod, type) => {
    try {
      const { fileDownloadIfNeeded } = this.props;
      const mobileId = sessionStorage.getItem('mobileIdSession');

      const user = auth.getUserInfo();

      const response = await fileDownloadIfNeeded(patientId, ageCod, tlaCod, user.Id, type);
      if (response.payload.status === 200) {
        const { data } = response.payload;

        const Archive = {
          FullName: data.FullName,
          Raw: data.Raw
        };

        if (mobileId && mobileId.toString().length > 0) {
          if (window.webkit && window.webkit.messageHandlers.handler) {
            window.webkit.messageHandlers.handler.postMessage(JSON.stringify(data));
          }
        } else          {
          downloadArchive(Archive.Raw, Archive.FullName);
        }
      }
    } catch (error) {
      UIkit.modal.alert('Erro ao tentar fazer o download do arquivo.');    
    }
  }


  render() {
    return (
      <AnimatedView>
        <div  style={{ minHeight: '60vh' }} className="">
          <div id="titleAmgenLogin" className="uk-margin uk-container uk-container-center" >
            <div>
          <h2 className="uk-margin-top uk-text-center-medium" >RELATÓRIO &nbsp;SOLICITAÇÃO&nbsp;DE&nbsp; EXAME </h2>
          <hr/>
          </div>
          </div>

          <ReportRequestExamForm
            profile={this.state.profile}

            handles={{
              cancelExam: this.cancelExam,
              obsExam: this.obsExam,
              hideModalCancelExam: this.hideModalCancelExam,
              hideModalObsExam: this.hideModalObsExam,
              handleChange: this.handleChange,
              handleSearch: this.handleSearch              
            }}

            physician={this.state.physicians}
            examsType={this.state.exams}
            examStatus={this.state.examStatus}
            laboratories={this.state.laboratories}
            examObs={this.state.examObs}
            examUltObs={this.state.examUltObs}

            isFetching={this.props.isFetching}

            columns={this.state.reportColumns}
            dataRequest={this.state.dataRequest}
            disablePhysician={this.state.disablePhysician}

          />
        </div>
      </AnimatedView>
    );
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.ReportRequestExamForm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('ReportRequestExamForm', field, value));
    },
    untouchField: function (field) {
      dispatch(untouch('ReportRequestExamForm', field));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportRequestExamFormHandler);
