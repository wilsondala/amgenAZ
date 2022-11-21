import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';

class ErrorLabel extends Component {
  static propTypes = {
    label: PropTypes.string,
    meta: PropTypes.object
  };

  static defaultProps = {
    label: PropTypes.string,
    meta: {}
  };

  render () {
    const {
      label,
      meta: { error, warning, touched },
      ...props
    } = this.props;

    const validationState = ( error && "error" ) || ( warning && "warning" ) || null;

    return (
      <div className="uk-form-row">
        <div className="uk-grid uk-grid-small">
          <label className="uk-form-label">{ label }</label>
          { ( touched && ( error || warning ) ) ? <div className="uk-badge uk-badge-danger"><span>{ error || warning }</span></div> : null }
          {/* uk-badge uk-badge-danger */}
        </div>{/* uk-grid uk-grid-small */}
      </div>
    );
  }
}

export default ErrorLabel;
