// @flow weak
import { connect } from 'react-redux';

import { change } from 'redux-form';
import { reduxForm } from 'redux-form';
import { untouch } from 'redux-form';
import { Field } from 'redux-form';

import { PureComponent } from 'react';
import React from 'react';

import PropTypes from 'prop-types';

import Column from '../../components/formDecorators/Column';
import Grid from '../../components/formDecorators/Grid';
import Input from '../../components/formDecorators/Input';
import Select from '../../components/formDecorators/Select';
import Checkbox from '../../components/formDecorators/Checkbox'

import onlyLetters from '../../validators/onlyLetters.js';

import getLocationOrigin from '../../services/utils/getLocationOrigin';
import _ from 'lodash';
import AnimatedView from '../../components/animatedView/AnimatedView';
import { auth } from '../../services/auth';

const required = (value) => value ? undefined : 'Obrigatório';
const formValidation = (values, props) => {

    const errors = {};

    if (!values.celphone && !values.phone) {
        errors.phone = 'É necessário informar ao menos um telefone';
        errors.celphone = 'É necessário informar ao menos um telefone';
    }

    return errors;

};


class PhysicianProfile extends PureComponent {

    static propTypes = {
        states: PropTypes.array
    };


    state = {
        listStates: [],
        states: [{ value: '', text: 'Selecione' }],
        canHandle: false,
        physician: [],
        healthUnits: [{ value: '', text: 'Selecione' }],
        labelHealthUnit1: false,
        fantasyNameHealthUnit1: '',
        cnpjHealthUnit1: '',
        addressHealthUnit1: '',
        labelHealthUnit2: false,
        fantasyNameHealthUnit2: '',
        cnpjHealthUnit2: '',
        addressHealthUnit2: '',
        registerAddress1: false,
        registerAddress2: false,
        isOtherSpecialty: false,
        otherSpecialty: [{ id: '', description: '' }],
        aceiteTermo: true,
    }

    static defaultProps = {
        isFetching: false
    }

    componentDidMount() {
        const { enterPhysicianProfile } = this.props;
        //this.getStates();
        this.getHealthUnits();
        this.handleSearch();
        enterPhysicianProfile();
    }

    componentWillUnmount() {
        const { leavePhysicianProfile } = this.props;
        leavePhysicianProfile();
    }

    validatePassword() {
        var password = (document.querySelector('input[name=password]')).value;
        var securityLevel = 0;

        if (password.length < 8) {
            return -1;
        }
        if (password.match(/[a-z]/)) {//letras minusculas
            securityLevel = securityLevel + 1;
        }
        if (password.match(/[A-Z]/)) {//letras maiusculas
            securityLevel = securityLevel + 1;
        }
        if (password.match(/\d/)) {//numeros
            securityLevel = securityLevel + 1;
        }
        if (password.match(/[!@#$%&*()-+.?_]/)) {//caracteres especiais
            securityLevel = securityLevel + 1;
        }
        return securityLevel;
    }

    handleSearch = async () => {
        const user = auth.getUserInfo();

        try {

            if (user !== undefined) {

                const { getPhysicianDataIfNeeded } = this.props;
                const response = await getPhysicianDataIfNeeded(user.code, '', '');

                if (response.error !== undefined) {
                    UIkit.modal.alert(response.error);
                    return;
                }

                if (response.payload.data == null || response.payload.data.Id == 0) {
                    UIkit.modal.alert("CRM-UF informado não foi encontrado na base do CFM");
                    return;
                }

                if (response.payload.data.Id == -1) {
                    UIkit.modal.alert("CRM-UF informado não se encontra ativo no CFM. Status atual: " + response.payload.data.StatusCfm);
                    return;
                }

                if (response.payload.status === 204) {
                    UIkit.modal.alert("Médico não encontrado");
                    return;
                }

                var physician = response.payload.data;

                //console.log("MÉDICO RETORNADO: ", this.props);

                this.props.changeFieldValue("name", physician.name);
                this.props.changeFieldValue("email", physician.email);

                this.props.changeFieldValue("crm", physician.crm);
                this.props.changeFieldValue("crm_uf", physician.crM_UF);

                this.props.changeFieldValue("password", '');

                if (physician.phones.length > 0) {
                    this.props.changeFieldValue("ddd", physician.phones[0].ddd);
                    this.props.changeFieldValue("number", physician.phones[0].number);
                    this.props.changeFieldValue("branch", '');
                }


                if (physician.healthUnits.length > 0) {
                    this.props.changeFieldValue("healthUnit1", physician.healthUnits[0].id);

                    if (physician.healthUnits[1] !== undefined) {
                        this.props.changeFieldValue("healthUnit2", physician.healthUnits[1].id);
                    }
                }


                // this.props.changeFieldValue("regulationAccept", true);

            }

        } catch (error) {
            console.log('get physician went wrong..., error: ', error);
        }
    }


    getHealthUnits = async () => {
        try {
            const { getHealthUnitListIfNeeded } = this.props;
            const response = await getHealthUnitListIfNeeded(12);

            if (response.error !== undefined) {
                this.setState({ flash: { visible: true, message: <span>{response.error.response.data.Message}</span>, kind: 'danger' } });
                return;
            }

            if (response.payload.status === 204) {
                this.setState({ flash: { visible: true, message: <span>Nenhuma instituição encontrada</span>, kind: 'danger' } });
                return;
            }

            const { data } = response.payload;
            const healthUnits = [{ value: '', text: 'Selecione' }];

            data.forEach(healthUnit => {
                healthUnits.push({ value: healthUnit.Id, text: healthUnit.Name });
            }, this);
            this.setState({ healthUnits: healthUnits });

            //console.log("RETORNO UNIDADE SAÚDE: ", this.props);

        } catch (error) {
            console.log('get health units went wrong..., error: ', error);
        }
    }

    goHome = (event: any) => {
        if (event) {
            event.preventDefault();
        }
        const {
            history
        } = this.props;
        history.push({ pathname: '/' });
    }

    handleCheckers(e) {

        try {
            //console.log("ACEITE 1: ", this.state.aceiteTermo);

            this.setState({ aceiteTermo: !this.state.aceiteTermo });

            //console.log("ACEITE 2: ", this.state.aceiteTermo);

            setTimeout(() => {
                if (this.state.aceiteTermo == false) {
                    UIkit.modal.alert("<h4 style='color: red;'>Atenção</h4><hr/>⚠ <strong> Caso retire o aceite do termo do programa, seu perfil será inativado.<br/> Seus pacientes continuarão fazendo parte do programa. </strong>");
                }
            }, 1);

        } catch (erro) {
            UIkit.modal.alert("<h4 style='color: red;'>Atenção</h4><hr/>⚠ <strong>Ocorreu um erro inesperado ao tentar alterar o aceite de termo.</strong")
            console.log("handleCheckers erro: ", erro);
        }
    }

    onSubmit = async (values) => {
        try {

            const user = auth.getUserInfo();

            var HealthUnits = [];
            HealthUnits.push({ Id: values.healthUnit1 });
            if (values.healthUnit2) {
                HealthUnits.push({ Id: values.healthUnit2 });
            }

            const Phones = {
                DDD: values.ddd,
                Number: values.number,
                Branch: values.branch
            }

            const User = {
                Code: user.code,
                Email: values.email,
                Password: values.password,
                Name: values.name,
                UserType: 9,
                Login: values.crm.concat(values.crm_uf),

            }

            //Chamar serviço
            const physicianModel = {
                Name: values.name,
                CRM: values.crm,
                CRM_UF: values.crm_uf,
                Email: values.email,
                Phones: [Phones],
                User: User,
                HealthUnits: HealthUnits,
                Accept: this.state.aceiteTermo
            }

            if (values.password !== undefined && values.password !== '') {
                if (physicianModel.User.Password !== values.passwordConfirmation) {
                    UIkit.modal.alert("A senha e a confirmação de senha diferem.");
                    return;
                }

                if (this.validatePassword() == -1) {
                    UIkit.modal.alert("A senha deve conter no mínimo 8 caracteres.");
                    return;
                }

                if (this.validatePassword() < 4) {
                    UIkit.modal.alert("A senha deve conter letras maiúsculas, letras minúsculas, números e caracteres especiais.");
                    return;
                }
            }

            physicianModel.CRM_UF = values.crm_uf;
            physicianModel.User.Login = physicianModel.CRM.concat(physicianModel.CRM_UF);

            const { insertPhysicianIfNeeded } = this.props;
            const response = await insertPhysicianIfNeeded(physicianModel);

            if (response.error !== undefined) {
                UIkit.modal.alert('Ocorreu um erro inesperado ao tentar atualizar os seus dados');
                return;
            }

            if (response.payload.status === 200) {

                const {
                    history
                } = this.props;

                if (!this.state.aceiteTermo) {
                    UIkit.modal.alert("Seu <b>descadastro</b> foi realizado com sucesso.");
                    history.push("/login");
                }
                else {

                    UIkit.modal.alert("<h4 style='color: green;'>Sucesso</h4><hr/>⚠ <strong>Dados cadastrais atualizados com sucesso</strong>");


                    history.push({ pathname: '/admin/physician' });
                }


            }
        }
        catch (error) {
            console.log('post physician went wrong..., error: ', error);
        }
    }

    validatePassword() {
        var password = (document.querySelector('input[name=password]')).value;
        var securityLevel = 0;

        if (password.length < 8) {
            return -1;
        }
        if (password.match(/[a-z]/)) {//letras minusculas
            securityLevel = securityLevel + 1;
        }
        if (password.match(/[A-Z]/)) {//letras maiusculas
            securityLevel = securityLevel + 1;
        }
        if (password.match(/\d/)) {//numeros
            securityLevel = securityLevel + 1;
        }
        if (password.match(/[!@#$%&*()-+.?_]/)) {//caracteres especiais
            securityLevel = securityLevel + 1;
        }
        return securityLevel;
    }

    render() {
        const { handleSubmit, isSubmitFetching, handleHealthUnitChange } = this.props;
        const { healthUnits, aceiteTermo } = this.state;
        return (
            <AnimatedView>
                <div id='titleAmgenLogin' style={{ minHeight: '60vh' }} className="uk-container uk-container-center">
                    <h2 className="uk-margin-top uk-text-center-small">Meu Perfil</h2>
                    <hr />
                    <form className="uk-form">

                        <div className="uk-form-row">

                            <h3>Dados do Médico</h3>
                            <hr />

                            <Grid styleNames="uk-grid">
                                <Column cols={6} col={1} size="medium" styleNames="uk-margin-bottom uk-margin-right">
                                    <Field
                                        name="crm"
                                        label="CRM*"
                                        type="text"
                                        component={Input}
                                        validate={[required]}
                                        placeholder="CRM"
                                        disabled={true}
                                    />
                                </Column>

                                <Column cols={6} col={1} size="medium" styleNames="uk-margin-bottom">
                                    <Field
                                        name="crm_uf"
                                        label="UF*"
                                        type="text"
                                        component={Input}
                                        placeholder="CRM-UF"
                                        disabled={true}
                                    />
                                </Column>
                            </Grid>

                            <hr />
                            {
                                (true) ?
                                    <div className="uk-form-row">

                                        <Grid styleNames="uk-grid uk-margin-top">

                                            <Column cols={10} col={5} size="small" styleNames="uk-margin-bottom uk-margin-small-top">
                                                <Field
                                                    name="name"
                                                    label="Nome do Médico*"
                                                    type="text"
                                                    component={Input}
                                                    validate={[required, onlyLetters]}
                                                    placeholder="Nome"
                                                    normalize={value => value.toUpperCase()}
                                                    disabled={true}
                                                />
                                            </Column>

                                            <Column cols={10} col={5} size="small" styleNames="uk-margin-bottom uk-margin-small-top">
                                                <Field
                                                    name="email"
                                                    label="E-mail do Médico*"
                                                    type="text"
                                                    component={Input}
                                                    validate={[required]}
                                                    placeholder="E-mail"
                                                />
                                            </Column>
                                        </Grid>


                                        <Grid styleNames="uk-grid ">
                                            <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-margin-small-top uk-text-center-medium">
                                                <Field
                                                    name="password"
                                                    label="Senha de Acesso*"
                                                    type="password"
                                                    component={Input}
                                                    placeholder="Senha"
                                                    annotation={"Senha deve ser de 8 digitos, letra  Maiúscula, carateres"}
                                                />
                                            </Column>
                                            <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-margin-small-top uk-text-danger uk-text-center-medium">
                                                <Field

                                                    name="passwordConfirmation"
                                                    label="Confirmação da Senha de Acesso*"
                                                    type="password"
                                                    component={Input}
                                                    placeholder="Confirmação da Senha"
                                                    annotation= {"Senha só será atualizada caso entre com uma nova."}
                                                    
                                                />
                                                
                                            </Column>
                                        </Grid>

                                        <h3>Contato</h3>
                                        <hr />

                                        <Grid styleNames="uk-grid">
                                            <Column cols={10} col={2} size="medium">
                                                <Field
                                                    name="ddd"
                                                    label="DDD*"
                                                    type="text"
                                                    component={Input}
                                                    validate={[required]}
                                                    placeholder="DDD"
                                                    mask="99"
                                                />
                                            </Column>

                                            <Column cols={10} col={5} size="medium" >
                                                <Field
                                                    name="number"
                                                    label="Telefone*"
                                                    type="text"
                                                    component={Input}
                                                    validate={[required]}
                                                    placeholder="Telefone"
                                                    mask="999999999"
                                                />
                                            </Column>

                                            <Column cols={10} col={3} size="medium" styleNames="uk-margin-bottom">
                                                <Field
                                                    name="branch"
                                                    label="Ramal"
                                                    type="text"
                                                    component={Input}
                                                    placeholder="Ramal"
                                                />
                                            </Column>
                                        </Grid>

                                        <h3>Instituições</h3>
                                        <hr />

                                        <Grid >
                                            <Column cols={10} col={5} >
                                                <Field
                                                    id="healthUnit1"
                                                    name={"healthUnit1"}
                                                    label={"Instituição 1*"}
                                                    type="text"
                                                    component={Select}
                                                    options={healthUnits}
                                                    onChange={e => handleHealthUnitChange(e.target.value, 1)}
                                                />
                                            </Column>
                                            <Column cols={10} col={5} >
                                                <Field
                                                    id="healthUnit2"
                                                    name={"healthUnit2"}
                                                    label={"Instituição 2"}
                                                    type="text"
                                                    component={Select}
                                                    options={healthUnits}
                                                    onChange={e => handleHealthUnitChange(e.target.value, 2)}
                                                /><br />
                                            </Column>
                                        </Grid>


                                        <Grid styleNames="uk-grid">
                                            <div className="uk-width-1-1 uk-container uk-container-center uk-margin-top ">
                                                <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-text-center-medium">
                                                    <a target="_blank" href={`${getLocationOrigin()}/materiais/Termo de Uso do Portal para Médicos.pdf`} className="uk-text-left-medium uk-button uk-button-link uk-button-large uk-button-primary uk-width-1-1"> <i className="uk-icon-download" /> Regulamento do Programa</a>
                                                </Column>
                                            </div>
                                        </Grid>

                                        <Grid styleNames="uk-grid ">
                                            <div className="uk-width-1-1 uk-margin-top">
                                                <Column cols={3} col={2} size="small" styleNames="uk-margin-bottom uk-text-small uk-text-bold ">
                                                    <Field
                                                        name="regulationAccept"
                                                        label="Li e aceito o regulamento do Programa Rastrear Pulmão.*"
                                                        type="checkbox"
                                                        component={Checkbox}
                                                        checked={aceiteTermo}
                                                        onClick={e => this.handleCheckers(e)}
                                                    //validate={[required]}

                                                    />
                                                </Column>
                                            </div>
                                        </Grid>
                                        <br />
                                        <br />
                                        <Grid styleNames='uk-grid' >
                                            <Column cols={2} col={1} size="medium" styleNames="uk-margin-bottom uk-margin-small-top">
                                                <button
                                                    className="uk-button uk-button-large uk-button-success client-color uk-width-1-1 uk-margin-top client-color"
                                                    type="button"
                                                    disabled={isSubmitFetching}
                                                    onClick={handleSubmit(this.onSubmit)}
                                                >
                                                    {
                                                        isSubmitFetching
                                                            ? <span>Atualizando...&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                                                            : <span>Atualizar</span>
                                                    }
                                                </button>
                                            </Column>
                                            <Column cols={2} col={1} size="medium" styleNames="uk-margin-bottom">
                                                &nbsp;&nbsp;

                                                <a className="uk-button uk-button-large uk-button-danger uk-width-1-1" href="#" disabled={isSubmitFetching}>Cancelar</a>
                                            </Column>
                                        </Grid>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </form>
                </div>
            </AnimatedView>
        );
    }
}

PhysicianProfile = reduxForm({
    form: 'PhysicianProfile',
    validate: formValidation
})(PhysicianProfile);

function mapStateToProps(state) {
    return {
        formValues: state.form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeFieldValue: function (field, value) {
            dispatch(change('PhysicianProfile', field, value));
        },
        untouchField: function (field) {
            dispatch(untouch('PhysicianProfile', field));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhysicianProfile);
