// @flow weak

import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReactTable from 'react-table';
import { Column, Grid, Input, Select } from '../../components/formDecorators';
import { valida_cpf } from '../../services/utils/ValidaCpfCnpj';
import { CSVLink } from 'react-csv';
import { auth } from '../../services/auth';
import { headerReactTableToHeaderExport, headersReactTableByProfile } from '../../Utils';

const cpfInvalido = (value) => value ? valida_cpf(value) ? undefined : 'CPF inválido' : undefined;

class ReportTATExamForm extends PureComponent {

    render() {
        const user = auth.getUserInfo();
        const {
            handles,
            properties
        } = this.props;

        const columns = headersReactTableByProfile(properties.columns, user.UserType);
        return (
            <form className="uk-form">
                <div style={{ minHeight: '60vh' }} className="uk-container uk-container-center az-no-left">
                    <div className="uk-form-row">
                        <Grid styleNames="uk-grid-small">
                            <Column cols={10} col={2} size="medium" styleNames="uk-margin-bottom uk-margin-right">
                                <Field
                                    id="InitialDate"
                                    name="InitialDate"
                                    label="Data Inicial"
                                    type="date"
                                    component={Input}
                                    onChange={e => handles.handleChange(e.target.name, e.target.value)}
                                />
                            </Column>
                            <Column cols={10} col={2} size="medium" styleNames="uk-margin-bottom uk-margin-right">
                                <Field
                                    id="FinalDate"
                                    name="FinalDate"
                                    label="Data Final"
                                    type="date"
                                    component={Input}
                                    onChange={e => handles.handleChange(e.target.name, e.target.value)}
                                />
                            </Column>
                            <Column cols={10} col={4} size="medium" styleNames="uk-margin-bottom">
                                <Field
                                    id="TumorType"
                                    name="TumorType"
                                    label="Tipo de Tumor"
                                    type="select"
                                    component={Select}
                                    options={properties.tumorType}
                                    onChange={e => handles.handleChange(e.target.name, e.target.value)}
                                />
                            </Column>
                        </Grid>
                        <Grid styleNames="uk-grid-small">
                            <Column cols={10} col={2} size="medium" styleNames="uk-margin-right">
                                <Field
                                    id="Exam"
                                    name="Exam"
                                    label="Tipo de Exame"
                                    type="select"
                                    component={Select}
                                    options={properties.examsType}
                                    onChange={e => handles.handleChange(e.target.name, e.target.value)}
                                />
                            </Column>
                            <Column cols={10} col={2} size="medium" styleNames="uk-margin-right">
                                <Field
                                    id="ExamStatus"
                                    name="ExamStatus"
                                    label="Status do Exame"
                                    type="select"
                                    component={Select}
                                    options={properties.examStatus}
                                    onChange={e => handles.handleChange(e.target.name, e.target.value)}
                                />
                            </Column>
                            <Column cols={10} col={4} size="medium" styleNames="uk-margin-bottom uk-margin-right">
                                <Field
                                    id="Physician"
                                    name="Physician"
                                    label="Médico"
                                    type="select"
                                    component={Select}
                                    options={properties.physician}
                                    onChange={e => handles.handleChange(e.target.name, e.target.value)}

                                />
                            </Column>
                        </Grid>
                        <Grid styleNames="uk-grid-small">
                            <Column cols={10} col={2} size="medium" styleNames="uk-margin-bottom uk-margin-right">
                                <Field
                                    id="Ticket"
                                    name="Ticket"
                                    label="Número do Protocolo"
                                    type="text"
                                    placeholder="Número do Protocolo"
                                    component={Input}
                                    mask="999999-9"
                                    annotation="Não utilize pontos ou outros caracteres especiais."
                                    onChange={e => handles.handleChange(e.target.name, e.target.value)}
                                />
                            </Column>
                            {
                                user.UserType !== 6 &&
                                <Column cols={10} col={2} size="medium" styleNames="uk-margin-bottom">
                                    <Field
                                        id="PatientCPF"
                                        name="PatientCPF"
                                        label="CPF do Paciente"
                                        type="text"
                                        placeholder="CPF do Paciente"
                                        component={Input}
                                        validate={[cpfInvalido]}
                                        mask="999.999.999-99"
                                        annotation="Não utilize pontos ou outros caracteres especiais."
                                        onChange={e => handles.handleChange(e.target.name, e.target.value)}
                                    />
                                </Column>
                            }
                        </Grid>

                    </div>

                    <Grid styleNames="uk-grid-small uk-margin-bottom uk-margin-top">
                        <div className="uk-form-row  ">
                            <button className="uk-button uk-button-large uk-button-success uk-form-width-medium uk-margin-small-bottom client-color" type="button" disabled={properties.isFetching} onClick={() => handles.handleSearch()}>
                                {
                                    properties.isFetching ?
                                        <span>CARREGANDO...&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                                        : <span>CARREGAR</span>
                                }
                            </button>
                        </div>
                    </Grid>

                    <div>
                        <ReactTable
                            sortable={true}
                            resizable={true}
                            defaultPageSize={10}
                            showPagination={true}
                            data={properties.dataRequest}
                            className="-striped -highlight"
                            columns={columns}

                            loading={properties.isFetching}
                            pages={Math.ceil(properties.totalRows / properties.rows)}
                            manual={true}
                            onPageChange={() => {
                                handles.handleSearch();
                            }}
                            onFetchData={(state) => {
                                handles.updateReactTable(state.page, state.pageSize);
                            }}
                        />

                        <div className="uk-form-row uk-margin-small-top ">
                            <button className="uk-button uk-button-large uk-button-success uk-form-width-medium uk-margin-small-bottom client-color" type="button" disabled={properties.isFetching} onClick={() => handles.handleSearch(true)}>
                                {
                                    properties.isFetching ?
                                        <span>Gerando Excel&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                                        : <span>Gerar Excel</span>
                                }
                            </button>
                        </div>
                        <CSVLink
                            className="uk-button uk-button-large uk-button-success uk-form-width-medium uk-margin-small-bottom button-generate-excel"
                            data={properties.dataRequestExport.length > 0 ? properties.dataRequestExport : []}
                            headers={headerReactTableToHeaderExport(columns)}
                            separator={";"}
                            id='fazdownload'
                            style={{ visibility: 'hidden' }}
                            filename={"Requests.csv"}>
                            Gerar Excel
                        </CSVLink>
                    </div>
                </div>
            </form>
        );
    }
}

ReportTATExamForm = reduxForm({
    form: 'ReportTATExamForm'
})(ReportTATExamForm);

export default ReportTATExamForm;