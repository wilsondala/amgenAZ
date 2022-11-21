// @flow weak

import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import ReactTable from 'react-table';
import { valida_cpf } from '../../services/utils/ValidaCpfCnpj';
import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import { auth } from '../../services/auth';
import './report_request_exam.scss';
import { headerReactTableToHeaderExport, dangerButtonCss, successButtonCss, required } from '../../Utils/';
import { Grid, Input, Column, Select, Modal, TextArea } from '../../components/formDecorators';

const cpfInvalido = (value) => value ? valida_cpf(value) ? undefined : 'CPF inválido' : undefined;

class ReportRequestExamForm extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool
  }

  render() {
    const mobileId = sessionStorage.getItem('mobileIdSession');
    const userMobile = mobileId && mobileId.toString().length > 0;
    const user = auth.getUserInfo();
    const isMedic = user.userType === 9;
    const IsInstitution = user.userType === 12;
    const { handles, isFetching, physician, examsType, examStatus, columns, dataRequest, examObs, laboratories, disablePhysician } = this.props;

    return (
      <form className="uk-form">
        <div style={{ minHeight: '60vh' }} className="uk-container uk-container-center az-no-left">
          <div className="uk-form-row">
            <Grid styleNames="uk-grid">
              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                <Field
                  id="patientName"
                  name="patientName"
                  label="Nome do Paciente"
                  type="text"
                  placeholder="Digite o nome do Paciente"
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  normalize={value => value.toUpperCase()}
                  component={Input}
                  disabled={isFetching}
                />
              </Column>
              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                <Field
                  id="patientCPF"
                  name="patientCPF"
                  label="CPF do Paciente"
                  type="text"
                  placeholder="Digite o CPF do Paciente"
                  component={Input}
                  validate={[cpfInvalido]}
                  mask="999.999.999-99"
                  annotation="Não utilize pontos ou outros caracteres especiais."
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  disabled={isFetching}
                />
              </Column>
            </Grid>

            <Grid styleNames="uk-grid">
              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                <Field
                  id="InitialDate"
                  name="InitialDate"
                  label="Data Inicial"
                  type="date"
                  component={Input}
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  disabled={isFetching}
                />
              </Column>
              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                <Field
                  id="FinalDate"
                  name="FinalDate"
                  label="Data Final"
                  type="date"
                  component={Input}
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  disabled={isFetching}
                />
              </Column>
            </Grid>

            <Grid styleNames="uk-grid">
              {!(isMedic) &&
                <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                  <Field
                    id="patientCode"
                    name="patientCode"
                    label="Código do Paciente"
                    type="text"
                    placeholder="Digite o código do Paciente"
                    onChange={e => handles.handleChange(e.target.name, e.target.value)}
                    component={Input}
                    disabled={isFetching}
                  />
                </Column>
              }
              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                <Field
                  id="ticket"
                  name="ticket"
                  label="Número do Protocolo"
                  type="text"
                  placeholder="Digite o Número do Protocolo"
                  component={Input}
                  mask="999999-9"
                  annotation="Não utilize pontos ou outros caracteres especiais."
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  disabled={isFetching}
                />
              </Column>

              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                <Field
                  id="examStatus"
                  name="examStatus"
                  label="Status do Protocolo"
                  type="select"
                  component={Select}
                  options={examStatus}
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  disabled={isFetching}
                />
              </Column>
            </Grid>
            <Grid styleNames="uk-grid">
              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                <Field
                  id="examsType"
                  name="examsType"
                  label="Tipo de Exame"
                  type="select"
                  component={Select}
                  options={examsType}
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  disabled={isFetching}
                />
              </Column>
              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                <Field
                  id="laboratory"
                  name="laboratory"
                  label="Laboratório"
                  type="select"
                  component={Select}
                  options={laboratories}
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  disabled={isFetching}
                />
              </Column>
              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                <Field
                  id="physician"
                  name="physician"
                  label={!isMedic && 'Médico'}
                  hidden={isMedic}
                  type="select"
                  component={Select}
                  options={physician}
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  disabled={disablePhysician || isFetching}
                />
              </Column>
            </Grid>
          </div>

          <Grid styleNames="uk-grid">
              <Column cols={2} col={1} size="small" styleNames="uk-margin-bottom uk-text-center-medium">
                <button className="uk-button uk-button-large uk-button-success uk-width-1-1" type="button" disabled={isFetching} onClick={handles.handleSearch}>
                  {
                    isFetching ?
                      <span>CARREGANDO...&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                      : <span>CARREGAR</span>
                  }
                </button>
              
                
              {dataRequest.length > 0 &&

                !isFetching && !userMobile &&

                <CSVLink
                  className="uk-button uk-button-large uk-button-success uk-margin-small-bottom"
                  data={dataRequest}
                  headers={headerReactTableToHeaderExport(columns)}
                  separator={";"}
                  filename={"Requests.csv"}>
                  Gerar tabela abaixo em excel
                </CSVLink>

              }
          </Column>
            </Grid>
        

          {dataRequest.length > 0 &&
            <div>
              <ReactTable
                sortable={true}
                resizable={true}
                defaultPageSize={10}
                showPagination={true}
                data={dataRequest}
                className="-striped -highlight"
                columns={columns} />

            </div>
          }
          <Modal
            id='cancelExamModal'
            sizeClass='small'
            header={(<h3>Cancelar Exame</h3>)}
            body={<div>
              <Grid styleNames="uk-grid-small">
                <Column col={2} cols={2} size="medium">
                  <Field
                    label="Motivo de Cancelamento"
                    name="cancelExamReason"
                    type="text"
                    component={TextArea}
                    validate={[required]}
                    normalize={value => value.toUpperCase()}
                  />
                </Column>
              </Grid>
            </div>}
            buttons={[
              {
                id: 'btnCancel',
                onClick: () => {
                  handles.hideModalCancelExam();
                },
                class: dangerButtonCss,
                description: <span><i className="fa fa-close" />&nbsp; Cancelar</span>
              },
              {
                id: 'btnSubmit',
                type: 'button',
                class: successButtonCss,
                onClick: () => handles.cancelExam(),
                fetch: isFetching,
                descriptionFetch: 'Confirmando',
                description: <span><i className="fa fa-check" />&nbsp; Confirmar</span>
              }
            ]}
          />


          <Modal
            id='obsExamModal'
            sizeClass='small'
            header={(<h3> Exame - Observação</h3>)}
            body={<div>
              <Grid styleNames="uk-grid-small">
                <Column col={2} cols={2} size="medium">
                  <Field
                    name="obsExam"
                    type="text"
                    component={TextArea}
                    validate={[required]}
                    maxLength={1000}
                  />
                </Column>
                <Column col={2} cols={2} size="small" styleNames="uk-margin-top observations">
                  {examObs && examObs.map(o => <div>
                    <p>{o.Obs} <div className="informativeObs"> {o.Data} &nbsp;&nbsp;|&nbsp;&nbsp; {o.UsuName}  </div> <hr></hr></p>
                  </div>)}
                </Column>
              </Grid>
            </div>}
            buttons={[
              {
                id: 'btnObsCancel',
                onClick: () => {
                  handles.hideModalObsExam();
                },
                class: dangerButtonCss,
                description: <span><i className="fa fa-close" />&nbsp; Cancelar</span>
              },
              {
                id: 'btnObsSubmit',
                type: 'button',
                class: successButtonCss,
                onClick: () => handles.obsExam(),
                fetch: isFetching,
                descriptionFetch: 'Confirmando',
                description: <span><i className="fa fa-check" />&nbsp; Confirmar</span>
              }
            ]}
          />

        </div>
      </form>
    );
  }
}

ReportRequestExamForm = reduxForm({
  form: 'ReportRequestExamForm'
})(ReportRequestExamForm);

export default ReportRequestExamForm;
