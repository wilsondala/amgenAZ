// @flow weak

import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import RowContent           from './RowContent';
import HeaderContent        from './HeaderContent';

class TableContent extends Component {

  static propTypes = {
    data: PropTypes.object
  };
  
  static defaultProps  = {
    data: null
  };

  render () {

    const { data, ...props } = this.props;
    
    if (!data || data.rows.length === 0) {
      return null;
    }

    let header = Object.keys(data.header[0]).map((prop) => {
      return <HeaderContent key={prop} headerText={data.header[0][prop]} />
    });

    let rows = data.rows.map((row, index) => {
      return <RowContent key={index} row={row}/>
    });

    return (
      <div className="uk-container uk-container-center uk-padding-remove">
        <div className="uk-overflow-container">
          <table className="uk-table uk-table-hover uk-text-center cs-table" { ...props }>
            <thead><tr>{ header }</tr></thead>
            <tbody>{ rows }</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableContent;
