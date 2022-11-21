// @flow weak

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, untouch } from 'redux-form';
import PropTypes from 'prop-types';
import { valida_cpf } from '../../services/utils/ValidaCpfCnpj';
import './request_exam.scss';
import { Grid, Column, Input, Select, TextArea, AziFile } from '../../components/formDecorators';
import Auth from '../../services/auth';
import Config from '../../config/Configs.json';
import getLocationOrigin from '../../services/utils/getLocationOrigin';

const required = (value) => value ? undefined : 'Campo obrigatório';
const cpfInvalido = (value) => value ? valida_cpf(value) ? undefined : 'CPF inválido' : undefined;

class RequestExamForm extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
  }

  state = {
    qtdArquivos: 0,
    arquivos: []
  }

  render() {
    const user = Auth.getUserInfo();
    const isMedic = user.userType === 9;
    const {
      handleSubmit,
      Submit,
      isFetching,
      dataForm,
      dataOptions,
      flags,
      handles,
      file      
    } = this.props;
    
    const findFile = (type) => {
      return dataForm.files.find(f => f.ReportType == type);
    };

    return (
      <form onSubmit={handleSubmit(Submit)} className="uk-form uk-margin-large-top uk-margin-remove">
        <div className="uk-form-row">

          {// Inicio dados Paciente
            flags.showPatientData &&
            <div>
              <h3 className='uk-text-center-medium uk-margin-large-top uk-container-center'>DADOS DO PACIENTE</h3>
              <hr />
              <Grid styleNames="uk-grid-small">
                <Column cols={3} col={1} size="medium" styleNames="uk-margin-bottom uk-margin-small-left" >
                  <Field
                    groupClass=""
                    name="cpf"
                    label="CPF*"
                    type="text"
                    component={Input}
                    validate={[required, cpfInvalido]}
                    placeholder="CPF"
                    mask="999.999.999-99"
                    annotation="Não utilize pontos ou outros caracteres especiais."
                    onChange={handles.handleCpfChange}
                    disabled={isFetching}
                  />
                </Column>
                <Column cols={3} col={1} size="medium" styleNames="uk-margin ">
                  <button style={{ marginTop: '1%', minWidth: '100px', textTransform: 'uppercase', fontWeight: '500' }} type="button" className="uk-button uk-button-large uk-button-success " onClick={handles.handleSearch} disabled={dataForm.cpf.replace(/[^0-9]/g, '').length != 11 || isFetching}  >
                    <i className="fa fa-search" />&nbsp;
                    {
                      isFetching ?
                        <span>Buscando...&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                        : <span>Buscar</span>
                    }
                  </button>
                </Column>
              </Grid>

              {
                flags.canHandle &&
                <div className="uk-form-row">

                  <Grid styleNames="uk-grid">
                      <Column cols={6} col={3} size="medium" styleNames="uk-margin-bottom uk-margin-small-left">                  
                      <Field
                        id="patientName"
                        name="patientName"
                        label="Nome*"
                        component={Input}
                        type="text"
                        value={dataForm.patient.Name}
                        normalize={value => value.toUpperCase()}
                        onChange={handles.handlePatientData}
                        disabled={isFetching}
                      />
                    </Column>
                    </Grid>
                    <Grid styleNames="uk-grid">
                    <Column cols={10} col={5} size="medium" styleNames="uk-width-1-1">
                      <Field
                        id="BirthDate"
                        name="BirthDate"
                        label="Data de Nascimento"
                        type="Date"
                        component={Input}
                        value={dataForm.patient.BirthDate}
                        onChange={handles.handlePatientData}
                        disabled={isFetching}
                      />
                    </Column>                    
                    <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-width-1-1">
                      <Field
                        id="gender"
                        name="gender"
                        label="sexo*"
                        type="select"
                        options={Config.genders}
                        component={Select}
                        onChange={handles.handlePatientData}
                        disabled={isFetching}
                      />
                    </Column>
                  </Grid>
                </div>
              }


        {// Inicio Dados Exame
            flags.showExamData &&
            <div>
          
          {!isMedic && <h3>Informe os dados do médico responsável pelo tratamento do paciente:</h3>}

          {!isMedic && <hr />}

          <Grid styleNames="uk-grid-small" hidden>
            <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom">
              <Field
                id="physicianRequester"
                name="physicianRequester"
                label={!isMedic && 'Informe o médico(a)*'}
                hidden={isMedic}
                type="text"
                component={Select}
                options={dataOptions.physicians}
                onChange={handles.handlePhysicianChange || isFetching}
                disabled={flags.physicianLogin}
              />
            </Column>
          </Grid>
          </div>
        }

        {
          (flags.existsPatient && (dataForm.existsIHQReport != '' || dataForm.existsNGSReport != '')) &&
                <div>
                  <h3>O Paciente já possui laudo(s). Clique no botão para visualizar o arquivo</h3>
                  <Grid styleNames="uk-grid-small">
                    {
                      dataForm.existsIHQReport == 'Exist' &&
                      <Column cols={4} col={1} size="medium" styleNames="uk-margin-top">
                        <button type="button" className="uk-button uk-button-large uk-button-success" title="Download do Laudo de NTRK (IHQ)" onClick={() => handles.handleDownloadReport(6)} disabled={isFetching} >
                          <i className="fa fa-download" />&nbsp;
                        <span>Laudo de NTRK (IHQ)</span>
                        </button>
                      </Column>
                    }
                    {
                      dataForm.existsNGSReport == 'Exist' &&
                      <Column cols={4} col={1} size="medium" styleNames="uk-margin-top">
                        <button type="button" className="uk-button uk-button-large uk-button-success" title="Download do Laudo de NTRK (NGS)" onClick={() => handles.handleDownloadReport(7)} disabled={isFetching} >
                          <i className="fa fa-download" />&nbsp;
                        <span>Laudo de NTRK (NGS)</span>
                        </button>
                      </Column>
                    }
                  </Grid>
                  <hr />
                  <br />
                </div>
              }
            </div>
            // Fim dados Paciente
          }
          {// Inicio Dados Exame
           flags.showExamData &&
            <div>
              {
                flags.NotAllowRequest == false ?
                  <div className="uk-form-row">
                    <h3 className='uk-text-center-medium'>DADOS PARA COLETA</h3>
                    <hr />

                    <Grid styleNames="uk-grid">
                      <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom">
                        <Field
                          id="healthUnit"
                          name="healthUnit"
                          label="Nome da Instituição Para Retirada da Amostra*"
                          type="select"
                          options={dataOptions.healthUnits}
                          component={Select}
                          onChange={handles.handleHealthUnitChange}
                          disabled={isFetching}
                        />
                      </Column>
                      <Column cols={10} col={5} size="medium">
                        <Field
                          id="examtype"
                          name="examtype"
                          label="Tipo de exame*"
                          type="select"
                          options={dataOptions.exams}
                          component={Select}
                          onChange={handles.handleExamTypeChange}
                          disabled={isFetching}
                        />
                      </Column>
                      </Grid>
                      <Grid styleNames="uk-grid-small">
                      <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom">
                          <Field
                            id="laboratory"
                            name="laboratory"
                            label="Laboratório*"
                            type="select"
                            options={dataOptions.laboratories}
                            component={Select}
                            disabled={isFetching}
                            onChange={e => handles.handleLaboratoryChange(e.target.value)}
                          />
                        </Column>
                  
                      <Column cols={10} col={5} size="medium">
                        <Field
                          id="laboratoryAddress"
                          name="laboratoryAddress"
                          label="Endereço de coleta*"
                          type="select"
                          options={dataOptions.laboratoryAddresses}
                          component={Select}
                          disabled={flags.showLaboratoryAddresses}
                          onChange={handles.handleLaboratoryAddressChange}
                        />
                      </Column>
                      </Grid>
                      <Column cols={2} col={2} size="medium" styleNames="uk-margin-bottom">
                        {
                          !flags.showLaboratoryAddresses == true ?
                          <p> Para cadastro de um novo endereço, entre em contato com o programa rastrear pulmão</p>
                          : null
                        }
                      </Column>
                  
                    
                      <Grid styleNames="uk-grid-small">
                        <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom">
                          <Field
                            name="delivererName"
                            id="delivererName"
                            label="Nome do responsável pela entrega*"
                            validate={[required]}
                            component={Input}
                            type="text"
                            value={dataForm.patient.Name}
                            normalize={value => value.toUpperCase()}
                            onChange={handles.handlePatientData}
                            disabled={isFetching}
                          />
                        </Column>
                        <Column cols={10} col={5} size="medium" >
                          <Field
                            name="delivererNumber"
                            id="delivererNumber"
                            label="Telefone do responsável pela entrega*"
                            type="text"
                            component={Input}
                            validate={[required]}
                            placeholder="Telefone"
                            mask="(99) 99999-9999"
                          />
                        </Column>
                      </Grid>
                      <Grid styleNames="uk-grid-small">
                        <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom">
                          <Field
                            name="delivererEmail"
                            id="delivererEmail"
                            label="E-mail do responsável pela entrega"
                            type="email"
                            component={Input}
                            placeholder="E-mail"
                          />
                        </Column>

                        <Column cols={10} col={5} size="medium">
                        <Field
                          id="materialDelivered"
                          name="materialDelivered"
                          label="Material já está pronto para coleta ?"
                          type="select"
                          options={Config.yesOrNo}
                          component={Select}
                          disabled={isFetching}
                          onChange={handles.handleMaterialDeliveredChange}
                        />
                      </Column> 
                      </Grid>

                    <Grid styleNames="uk-grid-small">
                      <Column cols={3} col={3} size="medium" styleNames="uk-margin-bottom">
                      <label className="uk-form-label"> Observações</label>
                        <Field
                          id="comments"
                          name="comments"
                          component={TextArea}
                          type="textarea"
                          normalize={value => value.toUpperCase()}
                          disabled={isFetching}
                        />
                      </Column>
                    </Grid>
                   
                    <Grid styleNames="uk-grid-small">
                      <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center">
                          <Field
                              id="ExamRequest"
                              name="ExamRequest"
                              type="text"
                              component={AziFile}
                              inputStyles="input-upload"
                              onChange={e => handles.handleReportFile(e, Config.ExamPrescription)}
                          />

                           <label 
                            htmlFor="ExamRequest" 
                            className="secondary-button uk-button uk-button-large uk-width-medium-1-1 uk-container-center uk-text-center"> 
                            {findFile(Config.ExamPrescription) ? 'Alterar Pedido Médico' : 'Anexar Pedido Médico'}
                          </label> 

                          <label className="uk-margin-left uk-form uk-width-1-1"> {findFile(Config.ExamPrescription) && findFile(Config.ExamPrescription).FullName}</label>
                          
                      </Column>
                        <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center">
                          <Field
                            id="AnatomopathologicalReport"
                            name="AnatomopathologicalReport"
                            type="text"
                            component={AziFile}
                            inputStyles="input-upload"
                            onChange={e => handles.handleReportFile(e, Config.AnatomopathologicalReport)}
                          />

                          <label
                            htmlFor="AnatomopathologicalReport"
                            style={{ fontSize: 14, textAlign: 'center' }}
                            className="secondary-button uk-button uk-button-large uk-width-medium-1-1 uk-container-center uk-text-center">
                            {findFile(Config.AnatomopathologicalReport) ? 'Alterar Anatomopatológico' : 'Anexar Anatomopatológico'}
                          </label>

                          <label className="uk-margin-left uk-form-width-large uk-width-1-1">{findFile(Config.AnatomopathologicalReport) && findFile(Config.AnatomopathologicalReport).FullName}</label>
                        </Column>
                      </Grid>

                      <Grid styleNames="uk-grid-small">
                        <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom  uk-text-center uk-margin-top-remove">
                          <Field
                            id="ConsentForm"
                            name="ConsentForm"
                            type="text"
                            component={AziFile}
                            inputStyles="input-upload"
                            onChange={e => handles.handleReportFile(e, Config.ConsentForm)}
                          />

                          <label
                            htmlFor="ConsentForm"
                            style={{ fontSize: 14, textAlign: 'center' }}
                            className="secondary-button uk-button uk-button-large uk-width-medium-1-1 uk-container-center uk-text-center">
                            {findFile(Config.ConsentForm) ? 'Alterar Termo de Consentimento do Paciente' : 'Anexar Termo de Consentimento do Paciente'}
                          </label>

                          <label style={{ fontSize: 14, textAlign: 'center' }} className="uk-margin-left">{findFile(Config.ConsentForm) && findFile(Config.ConsentForm).FullName}</label>
                        </Column>
                     
                        <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center">
                          <Field
                            id="ShippingTerm"
                            name="ShippingTerm"
                            type="text"
                            component={AziFile}
                            inputStyles="input-upload"
                            onChange={e => handles.handleReportFile(e, Config.TransportDeclaration)}
                          />

                          <label
                            htmlFor="ShippingTerm"
                            style={{ fontSize: 14, textAlign: 'center' }}
                            className="secondary-button uk-button uk-button-large uk-width-1-1 uk-text-center">
                            {findFile(Config.TransportDeclaration) ? 'Alterar Termo de Transporte' : 'Anexar Termo de Transporte'}
                          </label>

                          <label style={{ fontSize: 14, textAlign: 'center' }} className="uk-margin-left">{findFile(Config.TransportDeclaration) && findFile(Config.TransportDeclaration).FullName}</label>
                        </Column>
                      </Grid>
                    {/* fim */}

                  <br />
                  
                  <Grid styleNames="uk-grid-small">
                      <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom  uk-text-center">
                        <button 
                          type="submit" 
                          className="uk-button uk-button-large uk-button-success  client-color uk-width-medium-1-2 uk-container-center " 
                          disabled={isFetching} >
                          {
                            isFetching ?
                              <span>Cadastrando...&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                              : <span>Cadastrar</span>
                          }
                        </button>
                      </Column> 
                      <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom  uk-text-center">
                      
                        <a className="uk-button uk-button-large uk-button-danger uk-width-medium-1-2 uk-container-center " 
                          href="#/" 
                          disabled={isFetching}>
                          Cancelar
                        </a>
                      
                      </Column> 
                    </Grid>
                    <hr />
                  </div>

                  :
                  <div>
                    <hr />

                    <div className="">
                      <a className="" href="#/" disabled={isFetching}>Voltar</a>
                    </div>
                  </div>
              }
            </div>
            // Fim Dados Exame
          }

        </div>

      </form>
    );
  }
}

export default RequestExamForm;

