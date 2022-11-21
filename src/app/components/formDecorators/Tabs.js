import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';

class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, styleNames, ...props} = this.props;
    return (
      <ul className={styleNames + " uk-switcher"} {...props}>{children}</ul>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  styleNames: PropTypes.string
};

Tabs.defaultProps  = {
  children: null,
  styleNames: null
};

export default Tabs;
