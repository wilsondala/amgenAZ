import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';

class PageHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {text} = this.props;
    return (
      <div className="uk-width-1-1">
        <div className="uk-article">
          <h1 className="uk-article-title">{text}</h1>
        </div>
      </div>
    );
  }
}

PageHeader.propTypes = {
  text: PropTypes.string.isRequired
};

PageHeader.defaultProps  = {
  text: ""
};

export default PageHeader;
