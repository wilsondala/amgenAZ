// @flow weak

import React                from 'react';
import {render}             from 'react-dom';
import injectTpEventPlugin  from 'react-tap-event-plugin';
import { AppContainer }     from 'react-hot-loader';

import 'animate.css';
import 'jquery';
import 'font-awesome/css/font-awesome.min.css';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/css/components/placeholder.min.css';
import 'uikit/dist/css/components/form-file.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'react-table/react-table.css';
import './style/index.scss';

import Root from './Root';

const ROOT_ELEMENT  = 'root';
const RootElement   = document.getElementById(ROOT_ELEMENT);

injectTpEventPlugin();

const renderApp = RootComponent => {
  render(
    <AppContainer>
      <RootComponent />
    </AppContainer>,
    RootElement
  );
};

renderApp(Root);

if (module.hot) {
  module.hot.accept(
    './Root',
    () => {
      const RootComponent = require('./Root').default;
      renderApp(RootComponent);
    }
  );
}
