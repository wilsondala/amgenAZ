import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';

class Column extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, styleNames, size, cols, col} = this.props;
    if(size) {
      return (
        <div className={styleNames + " uk-width-" + size + "-" + col + "-" + cols}>{children}</div>
      );
    }

    return (
      <div className={styleNames + " uk-width-" + col + "-" + cols}>{children}</div>
    );
  }
}

Column.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  size: PropTypes.string,
  cols: PropTypes.number,
  col: PropTypes.number,
  styleNames: PropTypes.string
};

Column.defaultProps  = {
  children: null,
  size: null,
  cols: 1,
  col: 1,
  styleNames: null
};

export default Column;
