
import React, { Component } from 'react';
import PropTypes            from 'prop-types';

class FileUpload extends Component {

  static propTypes = {
    value:            PropTypes.any,
    files:            PropTypes.array,
    meta:             PropTypes.object,
    input:            PropTypes.object,
    type:             PropTypes.string,
    label:            PropTypes.string,
    annotation:       PropTypes.string,
    groupClass:       PropTypes.string,
    controlClass:     PropTypes.string
  };

  static defaultProps = {
    meta: {},
    files: [],
    label: '',
    // value: '',
    input: null,
    type: 'file',
    annotation: '',
    groupClass: '',
    controlClass: ''
  };

  render() {
    const {
      type,
      input,
      label,
      files,
      annotation,
      groupClass,
      controlClass,
      input: { value: omitValue },
      meta: { error, warning, touched },
      ...props
    } = this.props;

    return (
      <div className="uk-form-row">
        <div className={ groupClass }>
          <div className="uk-grid uk-grid-small">
            <label className="uk-form-label">{ label }</label>
            <input 
              type="file"
              value={omitValue}
              { ...input }
              { ...props }
              className={`uk-width-1-1 uk-form-large ${(touched && (error || warning)) ? 'uk-form-danger' : '' } ${(controlClass)}`}
            />
            { ((touched && (error || warning))) ? <div className="uk-badge uk-badge-danger"><span>{ error || warning }</span></div> : null }
            { (annotation && !(touched && (error || warning))) ? <span>{ annotation }</span> : null }
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
