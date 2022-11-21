// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RedefinePasswordForm from './RedefinePasswordForm';
import AnimatedView from '../../components/animatedView/AnimatedView';

class RedefinePasswordFormHandler extends PureComponent {

    static propTypes = {
        // react-router 4
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        // views
        currentView: PropTypes.string.isRequired,
        enterRedefinePasswordForm: PropTypes.func.isRequired,
        leaveRedefinePasswordForm: PropTypes.func.isRequired,
        // password
        redefinePasswordIfNeeded: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { enterRedefinePasswordForm } = this.props;
        enterRedefinePasswordForm();
    }

    componentWillUnmount() {
        const { leaveRedefinePasswordForm } = this.props;
        leaveRedefinePasswordForm();
    }

    submit = async (values) => {
        try {
            if (values.filter.length >= 3 ) {
                const { redefinePasswordIfNeeded } = this.props;
                const response = await redefinePasswordIfNeeded(values.filter);


                if (response.error !== undefined) {
                    UIkit.modal.alert(response.error.response.data.Message);
                    return;
                }

                const { data } = response.payload;
                
                /*
                Return
                     [0 -> Não foi possível encontrar o usuário]
                     [1 -> Senha redefinida]
                     [2 -> Senha redefinida, porem não possui email cadastrado para o envio de senha]
                */
                if (data === 1) {
                    UIkit.modal.alert('Senha redefinida. Cheque seu e-mail para instruções de login.');
                }
                else if (data === 2) {
                    UIkit.modal.alert('Senha redefinida. Não foi encontrado email cadastrado, entre em contato com o programa para obter a senha.');
                }
                else {
                    UIkit.modal.alert('Não foi possível encontrar o usuário.');
                }
            }
            else {
                UIkit.modal.alert('Preencha com ao menos três caracteres.');
            }

        } catch (error) {
            console.log('redefine password went wrong..., error: ', error);
        }
    }

    render() {
        return (
            <AnimatedView>
                <div style={{ minHeight: '60vh' }} className="uk-container uk-container-center">
                    <h1 className="uk-h1 uk-margin-top uk-text-center-small">REDEFINIR SENHA</h1>
                    <hr />
                    
                    <RedefinePasswordForm
                        onSubmit={this.submit}
                    />
                </div>
            </AnimatedView>
        );
    }
}

export default RedefinePasswordFormHandler;
