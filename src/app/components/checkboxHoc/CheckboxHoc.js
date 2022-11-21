// @flow weak
/* eslint-disable no-console */
/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */

import React            from 'react';
import PropTypes        from 'prop-types';

export default (Component) => {

  const wrapper = class RTCheckboxTable extends React.Component {
  // we only need a Component so we can get the 'ref' - pure components can't get a 'ref'

    rowSelector = (row) => {
      
      if (!row || !row.hasOwnProperty(this.props.keyField)) {
        return null;
      }
    
      const checked = this.props.isSelected(row[this.props.keyField]);

      return (
        <input
          value=""
          type="checkbox"
          checked={checked}
          onChange={() => { }}
          onClick={(e) => {
            const { shiftKey } = e;
            e.stopPropagation();
            this.props.toggleSelection(row[this.props.keyField], shiftKey, row);
          }}
        />
      );
    }

    headSelector = (row) => {
      const checked = this.props.selectAll;
      return (
        <input
          value=""
          type="checkbox"
          checked={checked}
          onChange={() => { }}
          onClick={(e) => {
            e.stopPropagation();
            this.props.toggleAll();
          }}
        />
      );
    }

    // this is so we can expose the underlying ReactTable to get at the sortedData for selectAll
    getWrappedInstance = () => this.wrappedInstance
        
    render() {
      const { columns: originalCols, isSelected, toggleSelection, toggleAll, keyField, selectAll, ...rest } = this.props;
      const { rowSelector, headSelector } = this;
      const select = {
        id: '_selector',
        accessor: () => 'x', // this value is not important
        Header: headSelector,
        Cell: (ci) => {
          return rowSelector(ci.original);
        },
        width: 30,
        sortable: false,
        resizable: false,
        filterable: false,
        style: { textAlign: 'center' }
      };

      const columns = [ select, ...originalCols ];
      const extra = { columns };

      return (
        <Component { ...rest } { ...extra } ref={ (r) => this.wrappedInstance = r } />
      );
    }
  };

  wrapper.displayName = 'RTCheckboxTable';

  wrapper.propTypes = {
    columns:                PropTypes.array,
    keyField:               PropTypes.string,
    isSelected:             PropTypes.func,
    selectAll:              PropTypes.bool,
    toggleSelection:        PropTypes.func,
    toggleAll:              PropTypes.func
  };

  wrapper.defaultProps = {
    columns: [],
    keyField: '_id',
    isSelected: (key) => {
      console.log('No isSelected handler provided:', { key });
    },
    selectAll: false,
    toggleSelection: (key, shift, row) => {
      console.log('No toggleSelection handler provided:', { key, shift, row });
    },
    toggleAll: () => {
      console.log('No toggleAll handler provided.');
    }
  };

  return wrapper;
};
