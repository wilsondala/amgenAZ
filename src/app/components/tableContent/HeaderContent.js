// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';

const HeaderContent = ({headerText}) => {
  return (
    <th>{headerText}</th>
  );
};

HeaderContent.propTypes = {
  headerText: PropTypes.string.isRequired
};

HeaderContent.defaultProps  = {
  headerText : ""
};

export default HeaderContent;
