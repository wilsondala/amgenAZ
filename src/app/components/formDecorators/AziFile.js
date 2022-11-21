import React, { Component } from 'react'
import PropTypes            from 'prop-types';
class AziFile extends Component {
    
    static propTypes = {
        meta:             PropTypes.object,
        type:             PropTypes.string,
        input:            PropTypes.object,
        annotation:       PropTypes.string,
        placeholder:      PropTypes.string,
        inputStyles:      PropTypes.string,
        accept:           PropTypes.string
      };
    
      static defaultProps = {
        meta:             {},
        id:               '',
        name:             '',
        type:             'file',
        input:            null,
        annotation:       '',
        placeholder:      '',
        inputStyles:      'primary-button',
        accept:           'image/jpg, image/png, image/jpeg, .pdf',
        labelStyles:      'uk-form-label'
      };

    render() {
        const { input , inputStyles, id, name  } = this.props
        const onInputChange = (e) => {
            e.preventDefault();
            const files = [...e.target.files];
            input.onChange(files);
        };
        return (
            <div>
                <input 
                    id={id}
                    name={name}
                    type="file"
                    onChange={onInputChange}
                    className={inputStyles}
                    accept="image/jpg, image/png, image/bmp, .pdf" 
                />
                    
            </div>
        )
    }
}

export default AziFile;