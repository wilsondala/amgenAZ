// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Auth, { auth } from '../../services/auth';
import AnimatedView from '../../components/animatedView/AnimatedView';
import ReportTATExamForm from './ReportTATExamForm';
import downloadArchive from '../../Utils/downloadArchive';
import { valida_cpf } from '../../services/utils/ValidaCpfCnpj';

class ReportTATExam extends PureComponent {

    static PropTypes = {
        // react-router 4:
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        //views
        currentView: PropTypes.string.isRequired,
        enterReportTATExamForm: PropTypes.func.isRequired,
        leaveReportTATExamForm: PropTypes.func.isRequired,
        //Exams        
        getExamTypeListIfNeeded: PropTypes.func.isRequired,
        //Physician
        getPhysicianListIfNeeded: PropTypes.func.isRequired,

        isFetching: PropTypes.bool
    };

    state = {
        user: [],
        tumorType: [],
        exams: [],
        examStatus: [],
        physicians: [],

        filters: {
            InitialDate: '',
            FinalDate: '',
            TumorType: '',
            Exam: '',
            ExamStatus: '',
            Physician: '',
            PatientCPF: '',
            Ticket: '',
        },

        rows: 10,
        nextPage: 0,
        totalRows: 0,

        dataRequest: [],
        dataRequestExport: [],
        columns: [
            { Header: 'Código do paciente', accessor: 'PatientId' },
            { Header: 'Nº Protocolo', accessor: 'Ticket' },
            { profile: [1, 3, 4], Header: 'Nome do paciente', accessor: 'PatientName' },
            { profile: [1, 3, 4], Header: 'CPF paciente', accessor: 'PatientCPF' },
            { profile: [1, 3, 4], Header: 'Origem Solicitação', accessor: 'Origin' },
            { Header: 'Nome do médico', accessor: 'PhysicianName' },
            { Header: 'CRM', accessor: 'CRM' },
            { Header: 'Laboratório', accessor: 'LaboratoryName' },
            { Header: 'UF', accessor: 'UF' },
            { Header: 'Cidade', accessor: 'City' },
            { Header: 'Instituição', accessor: 'InstitutionName' },
            { Header: 'Dt. Solicitação', accessor: 'SolicitationDate' },
            { Header: 'Dt. da Coleta', accessor: 'SampleCollectedDate' },
            { Header: 'Dt. Inicial de Pendência', accessor: 'InitialPendentDate' },
            { Header: 'Dt. Final de Pendência', accessor: 'FinalPendentDate' },
            { Header: 'Dt. da Analise', accessor: 'AnalyzeDate' },
            { Header: 'Dt. de Conclusão', accessor: 'ConclusionDate' },
            { Header: 'Dt. de Cancelamento', accessor: 'CancelationDate' },
            { Header: 'Tipo de Tumor', accessor: 'TumorType' },
            { Header: 'Tipo de Exame', accessor: 'ExamType' },
            { Header: 'Status do Exame', accessor: 'ExamStatus' },
            { Header: 'Resultado', accessor: 'Result' },
            { Header: 'Resultado Gene NTRK', accessor: 'ResultMutation' },
            { Header: 'Motivo Status', accessor: 'Reason' },
            { Header: 'TAT-Amostra Coletada', accessor: 'SLA_SampleCollected' },
            { Header: 'TAT-Início Pendência', accessor: 'SLA_PendingStart' },
            { Header: 'TAT-Final Pendência', accessor: 'SLA_PendingFinal' },
            { Header: 'TAT-Em Análise', accessor: 'SLA_InAnalysis' },
            { Header: 'TAT-Concluído', accessor: 'SLA_Concluded' },
            { Header: 'TAT-Cancelado', accessor: 'SLA_Cancel' },
            { Header: 'TAT-Total', accessor: 'SLA_Total' },
            
        ],
    }

    componentDidMount() {
        const { enterReportTATExamForm } = this.props;
        enterReportTATExamForm();

        const user = auth.getUserInfo();
        if (user.UserType == 9) {
            this.setState({ Physician: user.Id });
        }

        this.getTumors();
        this.getExams();
        this.getExamStatus();
        this.getPhysicians();
    }

    componentWillUnmount() {
        const { leaveReportTATExamForm } = this.props;
        leaveReportTATExamForm();
    }

    getTumors = async () => {
        try {

            const { getTumorTypeListIfNeeded } = this.props;
            const response = await getTumorTypeListIfNeeded();

            if (response.error !== undefined) {
                UIkit.modal.alert(response.error.response.data.Message);
                return;
            }

            if (response.payload.status === 204) {
                UIkit.modal.alert("Nenhum Tumor encontrado");
                return;
            }

            const { data } = response.payload;
            const tumorType = [{ value: '', text: 'Selecione' }];

            data.forEach(tumor => {
                tumorType.push({ value: tumor.TumorTypeId, text: tumor.TumorTypeName });
            }, this);

            this.setState({ tumorType: tumorType });

        } catch (error) {
            console.log('get Tumor Type went wrong..., error: ', error);
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
                UIkit.modal.alert("Nenhum Exame encontrado");
                return;
            }

            const { data } = response.payload;
            const exams = [{ value: '', text: 'Selecione' }];

            data.forEach(state => {
                exams.push({ value: state.ExamTypeId, text: state.ExamTypeName });
            }, this);

            this.setState({ exams: exams });

        } catch (error) {
            console.log('get exams went wrong..., error: ', error);
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
                UIkit.modal.alert("Nenhum Exame encontrado");
                return;
            }

            const { data } = response.payload;
            const exams = [{ value: '', text: 'Selecione' }];

            if (this.state.IHQExam) {
                data.forEach(state => {
                    if (_.includes(state.ExamTypeName, "IHQ")) {
                        exams.push({ value: state.ExamTypeId, text: state.ExamTypeName });
                    }
                }, this);
            } else if (this.state.NGSExam) {
                data.forEach(state => {
                    if (_.includes(state.ExamTypeName, "NGS")) {
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
            let agecod = 0; // Parameter to get all list of status
            const user = Auth.getUserInfo();

            const { getExamStatusIfNeeded } = this.props;
            const response = await getExamStatusIfNeeded(agecod);

            if (response.error !== undefined) {
                UIkit.modal.alert(response.error);
                return;
            }
            if (response.payload.status === 204) {
                UIkit.modal.alert("Erro ao buscar status do exame");
                return;
            }
            if (response.payload.data != null) {
                const data = response.payload.data;
                const exam = [{ value: '', text: 'Selecione' }]

                data.forEach(state => {
                    if (user.UserType == 13 && (state.Status != 'PENDENTE APROVAÇÃO BAYER' && state.Status != 'NEGADO')) {
                        exam.push({ value: state.Id, text: state.Status });
                    }
                    else if (user.UserType != 13) {
                        exam.push({ value: state.Id, text: state.Status });
                    }
                })

                this.setState({ examStatus: exam });
            }
        } catch (error) {
            console.log('get exam status went wrong..., error: ', error);
        }
    }

    getPhysicians = async () => {
        try {
            const { getPhysicianListIfNeeded } = this.props;
            const response = await getPhysicianListIfNeeded(0);

            if (response.error) {
                this.setState({ flash: { visible: true, message: <span>{response.error}</span>, kind: 'danger' } });
                return;
            }

            if (response.payload.status === 204) {
                this.setState({ flash: { visible: true, message: <span>Nenhum médico encontrado</span>, kind: 'warning' } });
                return;
            }

            const { data } = response.payload;
            const physicians = [{ value: '', text: 'Selecione' }];

            data.forEach(physician => {
                physicians.push({ value: physician.Id, text: physician.Name });
            }, this);

            this.setState({ physicians: physicians });

        } catch (error) {
            console.log('get physicians went wrong..., error: ', error);
        }
    }

    handleChange = (target, value) => {
        switch (target) {
            case 'PatientCPF':
                this.setState({ filters: { ...this.state.filters, [target]: value.replace(/[^0-9]/g, '') } });
                break;
            case 'Ticket':
                this.setState({ filters: { ...this.state.filters, [target]: value.replace('-', '') } });
                break;
            default:
                this.setState({ filters: { ...this.state.filters, [target]: value } });
        }
    }

    handleSearch = async (dataExport = false) => {
        try {
            const { getReportRequestExamTATIfNeeded } = this.props;
            const user = Auth.getUserInfo();

            if (this.state.filters.InitialDate != '' && this.state.filters.FinalDate == '') {
                UIkit.modal.alert('A Data final deve ser preenchida.');
                return;
            }
            if (this.state.filters.InitialDate == '' && this.state.filters.FinalDate != '') {
                UIkit.modal.alert('A Data inicial deve ser preenchida.');
                return;
            }
            if (this.state.filters.InitialDate > this.state.filters.FinalDate) {
                UIkit.modal.alert('A Data inicial não pode ser maior do que a Data final.');
                return;
            }
            if (this.state.filters.PatientCPF != '' && (this.state.filters.PatientCPF.length < 11 || !valida_cpf(this.state.filters.PatientCPF))) {
                UIkit.modal.alert('O CPF digitado é invalido.');
                return;
            }
            if (this.state.filters.Ticket != '' && this.state.filters.Ticket.length < 7) {
                UIkit.modal.alert('O Número do protocolo digitado é invalido.');
                return;
            }
            this.setState(dataExport ? { dataRequestExport: [] } : { dataRequest: [] }, async () => {
                let id = -1;
                let response = await getReportRequestExamTATIfNeeded(
                    user.UserType,
                    user.Id,
                    this.state.filters.InitialDate,
                    this.state.filters.FinalDate,
                    this.state.filters.TumorType,
                    this.state.filters.Exam,
                    this.state.filters.ExamStatus,
                    this.state.filters.Physician,
                    this.state.filters.PatientCPF.replace(/[^0-9]/g, ''),
                    this.state.filters.Ticket.replace('-', ''),
                    id,
                    dataExport ? 0 : this.state.nextPage,
                    dataExport ? this.state.totalRows : this.state.rows
                );

                if (response.error !== undefined) {
                    UIkit.modal.alert(response.error.response.data.Message);
                }

                if (response.payload.data && response.payload.data.Report.length > 0) {
                    if (dataExport)
                        this.setState({ dataRequestExport: response.payload.data.Report }, () => {
                            document.querySelector('[id=fazdownload]').click();
                        });
                    else
                        this.setState({ dataRequest: response.payload.data.Report, totalRows: response.payload.data.TotalRows });
                } else {
                    this.setState({ dataRequest: [] });
                    UIkit.modal.alert('Não foram encontradas solicitações de exame.');
                }
            });
        } catch (error) {
            console.error('get report went wrong..., error: ', error);
        }
    }

    updateReactTable = (page, rows) => {
        if (page != this.state.nextPage || rows != this.state.rows) {
            this.setState({ nextPage: page, rows: rows }, () => this.handleSearch());
        }
    }

    render() {
        return (
            <AnimatedView>
                <div id='titleAmgenLogin' style={{ minHeight: '60vh' }} className="uk-container uk-container-center">
                    <h2 className="uk-h1 uk-margin-top uk-text-center-small">RELATÓRIO SOLICITAÇÃO DE EXAME TAT</h2>
                    <hr />

                    <ReportTATExamForm
                        handles={{
                            handleChange: this.handleChange,
                            handleSearch: this.handleSearch,
                            updateReactTable: this.updateReactTable
                        }}

                        properties={{
                            isFetching: this.props.isFetching,
                            physician: this.state.physicians,
                            tumorType: this.state.tumorType,
                            examsType: this.state.exams,
                            examStatus: this.state.examStatus,
                            columns: this.state.columns,
                            dataRequest: this.state.dataRequest,
                            dataRequestExport: this.state.dataRequestExport,
                            rows: this.state.rows,
                            totalRows: this.state.totalRows
                        }}
                    />
                </div>
            </AnimatedView>
        );
    }
}

export default ReportTATExam;