import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    value: PropTypes.string,
    meta: PropTypes.object
  };

  static defaultProps = {
    input: null,
    label: "",
    value: "",
    meta: {}
  };

  render() {
    const {
      input,
      label,
      value,
      meta: { error, warning, touched },
      ...props
    } = this.props;

    const validationState = touched && (error && "error") || (warning && "warning") || null;

    return (
      <div className="uk-form-row">
        <div className="uk-grid uk-grid-small">
          <input className="uk-width-1-6 uk-form-small form-control"
            type="checkbox"
            {...input}
            {...props}
          />
          {(touched && (error || warning)) ? <div className="uk-badge uk-badge-danger"><span>{error || warning}</span></div> : null}
          <label className="uk-width-4-6 uk-form-label">{label}</label>
          {/* uk-badge uk-badge-danger */}
        </div> {/* uk-grid-small */}
      </div>
    );
  }
}

export default Checkbox;
