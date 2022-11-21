import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';

class Grid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, styleNames} = this.props;
    return (
      <div className={'uk-grid ' + styleNames}>{children}</div>
    );
  }
}

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  styleNames: PropTypes.string
};

Grid.defaultProps  = {
  children: null,
  styleNames: null
};

export default Grid;
