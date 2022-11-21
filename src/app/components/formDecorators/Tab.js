import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';

class Tab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, title, styleNames, active} = this.props;
    if(active) {
      return (
        <li className={styleNames + " uk-active"}>{children}</li>
      );
    }

    return (<li className={styleNames}>{title}</li>);
  }
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  styleNames: PropTypes.string,
  active: PropTypes.bool,
  title: PropTypes.string
};

Tab.defaultProps  = {
  children: null,
  styleNames: null,
  active: false,
  title: null
};

export default Tab;
