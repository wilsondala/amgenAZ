import React, { Component } from 'react';
import PropTypes            from 'prop-types';

class Select extends Component {

  static propTypes = {
    meta:             PropTypes.object,
    input:            PropTypes.object,
    label:            PropTypes.string,
    options:          PropTypes.array,
    annotation:       PropTypes.string,
    groupClass:       PropTypes.string
  };

  static defaultProps = {
    meta: {},
    input: null,
    label: '',
    options: [],
    annotation: '',
    groupClass: ''
  };

  render() {
    const {
      input,
      label,
      options,
      annotation,
      groupClass,
      meta: { error, warning, touched },
      ...props
    } = this.props;

    return (
      <div className="uk-form-row">
        <div className={ groupClass }>
          <div className="uk-grid uk-grid-small">
            <label className="uk-form-label">{ label }</label>
            <select className={`uk-width-1-1 uk-form-large form-control  ${(touched && (error || warning)) ? 'uk-form-danger' : '' }`}
                    type="select"
                    { ...input }
                    { ...props } >
              { options.length > 0 ? options.map(option => <option key={option.value} value={option.value}>{option.text}</option>) : null }
            </select>
            { (touched && (error || warning)) ? <div className="uk-badge uk-badge-danger"><span>{ error || warning }</span></div> : null }
            {/* uk-badge uk-badge-danger */}
            { (annotation && !(touched && (error || warning))) ? <div className="uk-badge uk-badge-info"><span>{ annotation }</span></div> : null }
            {/* uk-badge uk-badge-infor */}
          </div> {/* uk-grid uk-grid-small */}
        </div> {/* groupClass */}
      </div>
    );
  }
}

export default Select;
