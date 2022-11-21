// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';

const RowContent = ({row}) => {
  return (
    <tr>
      {
        Object.keys(row).map(prop => {
          return <td key={prop}>{row[prop]}</td>
        })
      }
    </tr>
  );
};

RowContent.propTypes = {
  element: PropTypes.object
};

RowContent.defaultProps  = {
  element : {}
};

export default RowContent;
