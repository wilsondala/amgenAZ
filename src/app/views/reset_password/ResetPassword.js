// @flow weak

import React, { PureComponent } from 'react';
import { Field, reduxForm, change, untouch } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '../../components/formDecorators/Grid';
import Input from '../../components/formDecorators/Input';
import Column from '../../components/formDecorators/Column';
import './resetPassword.css'
import { isNullOrUndefined } from 'util';

class ResetPassword extends PureComponent {
    
    static propTypes = {
        // react-router 4:
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        
        // views props:
        currentView: PropTypes.string.isRequired,
        
        // userAuth:
        isFetching: PropTypes.bool,
        resetPasswordIfNeeded: PropTypes.func.isRequired,
    };
    
    static defaultProps = {
        isFetching: false
    }
    
    submit = async () => {
        try {
            const { usucod } = this.props.formValues.ResetPassword.values;
            
            if(isNullOrUndefined(usucod) || usucod < 1){
                UIkit.modal.alert('⚠ Informe o código do usuário.');
                return;
            }
            const response = await this.props.resetPasswordIfNeeded(usucod);

            if(response.payload.status == 200 && response.payload.data){
                UIkit.modal.alert('✔ Senha redefinida.')
                this.props.changeFieldValue('usucod', '');
            }
            else{
                UIkit.modal.alert('❌ Não foi possível redefinir a senha.')
            }
        } catch (error) {
            console.error('reset password went wrong..., error: ', error);
        }
    }
    
    render() {
        const { isFetching } = this.props;
        
        return (
            <div style={{ minHeight: '60vh' }} className="uk-container uk-container-center">
            <h1 className="uk-h1 uk-margin-top uk-text-center-small">RESET DE SENHA</h1>
            <hr />
                <form className="uk-form">
                    <div className="uk-form-row">
                    <div className="alert alert-primary">
                    <span>Para fazer o reset de senha é necessário pegar o código do usuário pelo Holisticus Desk.</span>
                    </div>
                        <Grid styleNames="uk-grid-small">
                            <Column col={2} cols={10} size="small">
                                <Field
                                    id="usucod"
                                    name="usucod"
                                    label="Código do Usuário"
                                    type="number"
                                    component={Input}
                                    placeholder="Código do Usuário"
                                />
                            </Column>
                            <Column col={2} cols={10} size="small">
                                <br/>
                                <button type="button" disabled={isFetching} className="uk-width-1-1 uk-button uk-button-primary uk-button-large client-color" onClick={this.submit}>
                                {
                                    isFetching
                                    ? <span>Resetando...&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                                    :
                                    <span>Resetar</span>
                                }
                                </button>        
                            </Column>
                            <Column col={2} cols={10} size="small">
                                <br/>
                                <a className="uk-width-1-1 uk-button uk-button-danger uk-button-large" href="#" >Voltar</a>        
                            </Column>
                        </Grid>
                    </div>
                </form>
            </div>
            );
        }
    }
    
    ResetPassword = reduxForm({
        form: 'ResetPassword',
        enableReinitialize: true
    })(ResetPassword);
    
    function mapStateToProps(state) {
        return {
            formValues: state.form,
        }
    }

    function mapDispatchToProps(dispatch) {
        return {
            changeFieldValue: function (field, value) {
                dispatch(change('ResetPassword', field, value));
            },
            untouchField: function (field) {
                dispatch(untouch('ResetPassword', field));
            }
        }
    }    
    
    export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
    