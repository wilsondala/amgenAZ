// @flow weak
import React, { PureComponent } from 'react';
import { Field, reduxForm, change, untouch } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isNullOrUndefined } from 'util';
import Crypto from '../../services/utils/Crypto';
import Auth from '../../services/auth';
import Grid from '../../components/formDecorators/Grid';
import Input from '../../components/formDecorators/Input';
import Column from '../../components/formDecorators/Column';

import ReCaptcha from 'react-recaptcha';
import { removeEvents, addEvents } from '../../services/utils/DetectUserDowntime';

import queryString from 'query-string';

class Login extends PureComponent {

  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // views props:
    currentView: PropTypes.string.isRequired,
    enterLogin: PropTypes.func.isRequired,
    leaveLogin: PropTypes.func.isRequired,

    // userAuth:
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    isLogging: PropTypes.bool,
    disconnectUser: PropTypes.func.isRequired,
    logUserIfNeeded: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isFetching: false,
    isLogging: false
  }

  constructor(props, context) {
    super(props, context);
    this.reCaptchaLoaded = this.reCaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.expiredCallback = this.expiredCallback.bind(this);
    this.state = {
      login: '',
      password: '',
      showReCaptcha: false,
      reCaptchaKey: "",
      reCaptchaVerified: false,
      PushId: undefined,//Mobile user ID || used by FOSTER in WebView
    };
  }

  componentDidMount() {
    const { enterLogin, disconnectUser } = this.props;
    disconnectUser(); // diconnect user: remove token and user info
    enterLogin();
    removeEvents();
    this.getUserCookie();
  }

  componentWillUnmount() {
    const { leaveLogin } = this.props;
    leaveLogin();
  }

  reCaptchaLoaded() {
    this.captcha.reset();
  }

  verifyCallback() {
    this.setState({ reCaptchaVerified: true });
  }

  expiredCallback() {
    this.setState({ reCaptchaVerified: false });
  }

  handlesOnKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handlesOnLogin(null);
    }
  }

  getUserCookie = () => {

    let username = 'username=';
    let password = 'password=';
    let cookie = document.cookie;

    if (!isNullOrUndefined(cookie) && cookie != '') {
      let arrayCookies = cookie.split(';');
      for (let i = 0; i < arrayCookies.length; i++) {
        let cookie = arrayCookies[i];
        let array = cookie.split('£¢¬');
        for (let i = 0; i < array.length; i++) {
          let c = array[i].replace(' ', '');
          while (c.charAt(0) == '=') {
            c = c.substring(1);
          }
          if (c.indexOf(username) == 0) {
            this.props.changeFieldValue('login', (c.substring(username.length, c.length)));
          }
          if (c.indexOf(password) == 0) {
            this.props.changeFieldValue('senha', new Crypto().AESDecrypt(c.substring(password.length, c.length)));
          }
        }
      }
      let remember = document.getElementById('remember');
      remember.checked = true;
    }
  };

  Remember = async (remember) => {
    const login = document.querySelector('#login');
    const senha = document.querySelector('#senha');
    const cript = "username=" + login.value + "£¢¬password=" + new Crypto().AESEncrypt(senha.value).toString();
    let dtExpire = new Date(new Date().setFullYear(new Date().getFullYear() + 1));   //Cookie expira em 1 ano

    if (remember) {
      document.cookie = document.cookie + "; expires=" + new Date() + "; path=/";
      document.cookie = cript + "; expires=" + dtExpire.toUTCString() + "; path=/";

    }
    else {
      if (!isNullOrUndefined(document.cookie) && document.cookie != '') {
        let arrayCookies = document.cookie.split(';');
        for (let i = 0; i < arrayCookies.length; i++) {
          if (cript == arrayCookies[i].replace(' ', '')) {
            document.cookie = document.cookie + "; expires=" + new Date() + "; path=/";

          }
        }
      }
    }
  };

  AcceptCookies = (e) => {
    try {
      var remember = document.querySelector('#remember');
      if (remember.checked) {
        UIkit.modal.confirm('<strong>Você aceita que este site armaneze seus dados em Cookies pelo período de 1 ano?</strong>', () => true, () => remember.checked = false, {
          keyboard: false, bgclose: false, center: true, modal: false, labels: { 'Ok': 'OK', 'Cancel': 'Cancelar' }
        });
      }
    } catch (error) {
      console.error('[AcceptCookies] => ', error);
    }
  }

  handlesOnLogin = async (event) => {

    let remember = document.querySelector('#remember');
    if (remember.checked) {
      this.Remember(true);
    }
    else {
      this.Remember(false);
    }

    if (!this.state.showReCaptcha || (this.state.showReCaptcha && this.state.reCaptchaVerified)) {
      if (event) {
        event.preventDefault();
      }

      const login = document.querySelector('#login');

      if (login.value === '') {
        UIkit.modal.alert("Informe o Login");
        return;
      }

      const senha = document.querySelector('#senha');

      if (senha.value === '') {
        UIkit.modal.alert("Informe a Senha");
        return;
      } else if (senha.value.length < 8) {
        UIkit.modal.alert("A senha deve ter no mínimo 8 caracteres");
        return;
      }

      const linkEmail = queryString.parse(this.props.location.search);

      const {
        loginIfNeeded
      } = this.props;

      const userLogin = {
        login: login.value,
        password: senha.value,
        recaptcha: (this.state.showReCaptcha ? 1 : 0)
      };
      try {
        let refreshToken = undefined;
        const responseOAuth = await loginIfNeeded(userLogin.login, userLogin.password);

        if (responseOAuth.payload && responseOAuth.payload.status === 200) {
          const { token, user } = responseOAuth.payload.data;
          Auth.setToken(token);
          Auth.setUserInfo(user);
          switch (user.profile.toUpperCase()) {
            case Auth.PROFILE_HEALTHUNIT:
              this.props.history.push({ pathname: '/admin/institution' }); // back to pos home
              break;
            case Auth.PROFILE_PHYSICIAN:
              this.props.history.push({ pathname: '/admin/physician' });
              break;
            case Auth.PROFILE_MASTER:
            case Auth.PROFILE_HEALTHOPERATOR:
            case Auth.PROFILE_SUPERVISOR:
              this.props.history.push({ pathname: '/admin/master' }); // back to admin home
              break;
            case Auth.PROFILE_CLIENT:
              this.props.history.push({ pathname: '/admin/client' }); // back to client home
              break;
            default:
              this.props.history.push({ pathname: '/' }); // back to the default home
              break;
          }
        } else {
          UIkit.modal.alert("Usuário ou senha incorretos");
          return;
        }
        addEvents();

      } catch (error) {
        console.log('login went wrong..., error: ', error);
      }
    } else if (this.state.showReCaptcha && !this.state.reCaptchaVerified) {
      UIkit.modal.alert("Favor resolver o reCaptcha!");
      return;
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

  goRegister = (event: any) => {
    if (event) {
      event.preventDefault();
    }
    const {
      history
    } = this.props;
    history.push({ pathname: '/register_menu' });
  }

  render() {
    const { handlesOnLogin } = this;
    const { isLogging } = this.props;

    return (

      <div id="loginHome" className="uk-text-center" style={{ minHeight: '100vh' }}>

        <div className="uk-vertical-align-middle az-login-form" style={{ minWidth: '300px' }}>

          <h2 className=" uk-container uk-container-center uk-margin-large-top " style={{ color: 'black' }}>LOGIN</h2>
          <hr className="uk-article-divider" />

          <form onSubmit={handlesOnLogin} className="uk-form  uk-text-left">

            <div className="uk-grid-small uk-align-center">
              <div className=''>
                <Column cols={10} col={5} size="medium" styleNames="uk-width-medium-1-1 uk-container-center">
                  <Field
                    id="login"
                    name="login"
                    label="Login"
                    type="text"
                    component={Input}
                    placeholder="CRM/UF ou CNPJ"
                  />
                </Column>
              </div>
            </div>

            <div className="uk-grid-small uk-align-center">
              <div className=''>
                <Column cols={10} col={5} size="medium" styleNames="uk-width-medium-1-1 uk-container-center">
                  <Field
                    id="senha"
                    name="senha"
                    label="Senha"
                    type="password"
                    component={Input}
                    placeholder="Senha"
                  />
                </Column>
              </div>

            </div>

            {/* {this.state.showReCaptcha ?
              <div className="uk-form-row">
                <Grid styleNames="uk-grid-small">
                  <Column cols={1} col={1} size="medium" styleNames="">
                    <ReCaptcha
                      ref={(e) => { this.captcha = e; }}
                      sitekey={this.state.reCaptchaKey}
                      render="explicit"
                      loadCallback={this.reCaptchaLoaded}
                      verifyCallback={this.verifyCallback}
                      expiredCallback={this.expiredCallback}
                      theme="dark"
                      hl="pt-br"
                    />
                  </Column>
                </Grid>
              </div>
              :
              null
            // } */}
            <div className="uk-grid-small ">
              <Column cols={10} col={5} size="medium" styleNames=" uk-width-medium-1-1 uk-container-center">
                <div className=''>
                  <button
                    type="submit"
                    disabled={isLogging}
                    className="uk-width-1-1 uk-button uk-button-primary uk-button-large ">
                    {
                      isLogging
                        ? <span>Entrando...&nbsp;<i className=" fa fa-spinner fa-pulse fa-fw " /></span>
                        :
                        <span>Entrar</span>
                    }
                  </button>
                </div>
              </Column>
            </div>
            <div className="uk-grid-small">
              <Column cols={10} col={5} size="medium" styleNames=" uk-width-medium-1-1 uk-container-center">

                <a className="uk-width-1-1 uk-button uk-button-danger uk-button-large " href="#" onClick={this.goHome}>Voltar</a>

              </Column>
            </div>

            <Grid className="uk-grid-small">
             
                <Column cols={3} col={1} size="medium" styleNames="uk-width-medium-1-1 uk-container-center">
                  <a style={{ fontSize: 13 }} className="uk-link uk-link-muted  uk-desejo" href="#/register_menu">Desejo me cadastrar</a>
                </Column>
                <Column cols={3} col={1} size="medium" styleNames="uk-width-medium-1-1 uk-container-center">
                  <a style={{ fontSize: 13 }} className=" uk-link uk-link-muted uk-desejo" href="#/redefine_password">Esqueceu sua senha?</a>
                </Column>
           
            </Grid>

            <div className="uk-form-row uk-text-small uk-text-center-medium uk-container uk-container-center">
              <label className="uk-float-left uk-align-medium-left uk-margin-large-left uk-lembra-me"><input id="remember" name="remember" type="checkbox" onChange={this.AcceptCookies} /> Lembrar-me</label>
              {/* <a style={{ fontSize: 13 }} className="uk-float-right uk-link uk-link-muted" href="#/redefine_password">Esqueceu sua senha?</a> */}
            </div>

            <div className="uk-margin-small-left uk-form-row uk-text-small uk-text-center-medium uk-container uk-container-center uk-align-medium-right">
              <span className='uk-color'>Fale Conosco - Atendimento de Segunda à sexta das 8h às 20h atraves do 0800 264 0003</span>
            </div>

          </form>

        </div>

      </div>



    );
  }
}




Login = reduxForm({
  form: 'Login',
  enableReinitialize: true
})(Login);

function mapStateToProps(state) {
  return {
    formValues: state.form
  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('Login', field, value));
    },
    untouchField: function (field) {
      dispatch(untouch('Login', field));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
