// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AnimatedView from '../../components/animatedView/AnimatedView';
import Grid from '../../components/formDecorators/Grid';
import Column from '../../components/formDecorators/Column';
import getLocationOrigin from '../../services/utils/getLocationOrigin';
const maxCol = 3;

class Documents extends PureComponent {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // views:
    currentView: PropTypes.string.isRequired
  };

  drawColumns = () => {
    const archives = [
      { href: 'Regulamento.pdf', name: 'Regulamento' },
      { href: 'Termo de Uso do Portal para Médicos.pdf', name: 'Termo de Uso do Médico' },
      { href: 'Termodeusodainstituicao.pdf', name: 'Termo de Uso da Instituição' },
      { href: 'Termodeconsentimentodopaciente.pdf', name: 'Termo de consentimento do paciente' }
    ];

    const columns = [];
    let grids = -1;
    const returnGrid = [];

    archives.forEach((a, i) => {
      columns.push({
        grid: i % maxCol === 0 ? ++grids : grids,
        column: this.drawPDF(a.href, a.name)
      });
    });

    for (let index = 0; index <= grids; index++) {
      returnGrid.push(
        <div>
          <Grid key={index} styleNames="uk-grid-small uk-align-center ">
            {columns.filter((c) => c.grid === index).map((c) => c.column)}
          </Grid>
        </div>
      );
    }
    return returnGrid.map((g) => g);
  };

  drawPDF = (href, name) => {
    return (
      <Column
        cols={maxCol}
        col={1}
        size="medium"
        styleNames="uk-text-center uk-margin-bottom "
      >
        <a
          className="uk-button uk-button-default uk-width-1-1 uk-text-center boxed uk-button-success"
          target="_blank"
          href={getLocationOrigin() + '/docs/' + href}
        >
          &nbsp;&nbsp;
          <i className="fa fa-download uk-text-warning" /> &nbsp;&nbsp;<span>{name}</span>
        </a>
        <br />
      </Column>
    );
  };

  render() {
    return (
      <AnimatedView>
        <div
          id='titleAmgenLogin'
          style={{ minHeight: '60vh' }}
          className="uk-container uk-container-center"
        >
          <h2 className=" uk-margin-top uk-text-center-small">
            REGULAMENTO & TERMOS DE USO
          </h2>
          <hr />
          <br />
          <div className="uk-form-row">{this.drawColumns()}</div>
        </div>
      </AnimatedView>
    );
  }
}

export default Documents;
