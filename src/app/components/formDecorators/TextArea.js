
import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import InputMask            from 'react-input-mask';

class TextArea extends Component {

  static propTypes = {
    meta:             PropTypes.object,
    type:             PropTypes.string,
    input:            PropTypes.object,
    label:            PropTypes.string,
    value:            PropTypes.string,
    annotation:       PropTypes.string,
    groupClass:       PropTypes.string,
    controlClass:     PropTypes.string,
    placeholder:      PropTypes.string
  };

  static defaultProps = {
    meta: {},
    label: '',
    value: '',
    input: null,
    type: 'text',
    annotation: '',
    groupClass: '',
    controlClass: '',
    placeholder: ''
  };

  render() {
    const {
      type,
      input,
      label,
      value,
      annotation,
      groupClass,
      controlClass,
      placeholder,
      meta: { error, warning, touched },
      ...props
    } = this.props;

    const validationState = touched && (error && 'error') || (warning && 'warning') || null;
    
    return (
      <div className="uk-form-row">
        <div className={ groupClass }>
          <div className="uk-grid uk-grid-small">
            <label className="uk-form-label">{ label }</label>
            <textarea 
              { ...input }
              { ...props }
              placeholder={placeholder}
              className={`uk-width-1-1 uk-form-large ${(touched && (error || warning)) ? 'uk-form-danger' : '' } ${(controlClass)}`}
            />
            { (touched && (error || warning)) ? <div className="uk-badge uk-badge-danger"><span>{ error || warning }</span></div> : null }
            { (annotation && !(touched && (error || warning))) ? <span>{ annotation }</span> : null }
          </div> {/* uk-grid uk-grid-small */}
        </div> {/* groupClass */}
      </div>
    );
  }
}

export default TextArea;
