import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../images/programa-amgen-logo.png';
import Auth from '../../services/auth';


const Header = (props) => {
  const user = Auth.getUserInfo();
  const { model, view } = props;
  return (
    <header>
      {/* <div className="uk-width-1-1 uk-text-left main-color height" /> */}

      <div className="uk-container uk-container-center">

        <nav className="uk-navbar uk-margin-large-bottom">

          <Link className="uk-navbar-brand uk-hidden-small uk-padding-remove margin-top-az" to={'/'}>
            <img src={logo} width="128" height="128" />
          </Link>

          <div id="sc-header-title" className="uk-width-1-1 uk-hidden-small uk-text-right">
          </div>

          <div className="uk-navbar-flip new-menu  uk-hidden-small">
            <Link to={logo} className="menu-hover">
              <span>HOME</span>
            </Link>
            <a className="menu-hover">
              <span style={{ marginLeft: '15px', marginRight: '15px' }}>MENU</span>
              <ul className="uk-navbar-nav">
                {
                  model.links.map((item, index) => {
                    return (
                      <li key={index} className={view === item.view ? 'uk-active' : null}>
                        <Link to={item.link}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
            </a>
            <Link to={'/login'} className="menu-hover">
              {user ? <span>SAIR</span> : <span>LOGIN</span>}
            </Link>
          </div>


          <a href="#offcanvas" className="uk-navbar-toggle uk-visible-small uk-margin-large-top" data-uk-offcanvas>
            <span className="uk-navbar-toggle-icon" />
          </a>


          <div id="offcanvas" className="uk-offcanvas Bayer">

            <div id="menuAmegm" className="uk-offcanvas-bar">
              <ul className="uk-nav uk-nav-offcanvas">
                <li key='0'>
                  <Link className="uk-navbar-center uk-margin-small-top uk-margin-small-bottom margin-top-az" to={'/'}>

                  </Link>
                </li>
                {
                  model.links.map((item, index) => {
                    return (
                      <li key={index} className={view === item.view ? 'uk-active' : null}>
                        <Link to={item.link}>
                          <span>
                            {(item.label === 'Login' || item.label === 'Sair') ? <div className="uk-display-inline"><i className="uk-icon-user" />&nbsp;&nbsp;&nbsp;</div> : null}
                            {(item.label === 'Home') ? <div className="uk-display-inline"><i className="uk-icon-home" />&nbsp;&nbsp;&nbsp;</div> : null}
                            {(item.label === 'Cadastre-se') ? <div className="uk-display-inline"><i className="fa fa-address-card" />&nbsp;&nbsp;&nbsp;</div> : null}
                            {item.label.toUpperCase()}
                          </span>
                        </Link>
                      </li>
                    );
                  })
                }
                <div style={{ marginTop: '220', marginBottom: '-10' }}>
                  <li key='99' >
                    <Link className="uk-navbar-center" to={'/'}>

                    </Link>
                  </li>
                </div>
              </ul>
            </div>
          </div>

        </nav>

      </div>
    </header>
  );
};

Header.propTypes = {
  model: PropTypes.object,
  view: PropTypes.string
};

export default Header;
