import Dropzone                         from 'react-dropzone';
import React, { Component }             from 'react';
import { findDOMNode }                  from 'react-dom';
import PropTypes                        from 'prop-types';
import { List }                         from 'immutable';
import Select                           from '../../components/formDecorators/Select';
import { Field, reduxForm }             from 'redux-form';
import _                                from 'lodash';
import Input                            from '../../components/formDecorators/Input';
import InputClean                       from '../../components/formDecorators/Input';

import { max } from 'moment';

const required = (value) => value ? undefined : 'Campo obrigatório';

class FileDropZone extends Component {
    constructor() {
      super()
      this.state = {
        accepted: [],
        acceptedDescription: [],
        rejected: [],
        qtd: 0
      }
    }

    removeFile = (target, value) => {
      const {
        onRemoveFunction
      }=this.props;

      const splt = target.id.split("_");
      const tempState = this.state.accepted;
      tempState.splice(splt[1], 1)

      this.setState({accepted: tempState});
      this.setState({qtd: this.state.qtd - 1}, () => {onRemoveFunction(splt[1], this.state.qtd);});

    }

    acceptFile = (accepted, rejected) => {

      let tempObject = [];
      
      tempObject = accepted.accepted.map((item, i) => {return ({file: item, descricao: ""});});
      this.setState({accepted: this.state.accepted.concat(tempObject)});
      this.setState({qtd: this.state.qtd + 1});
    }

    selectedDescription = (target, value) => {
      const {
        fileDescriptions,
        onDropFunction
      }=this.props;

      const splt = target.id.split("_");
      let tempStateAccepted = this.state.accepted;
      const obj = _.find(fileDescriptions, function(o) { return o.value == value; });
      
      tempStateAccepted[splt[1]].descricao = obj.text;
      
      this.setState({accepted: tempStateAccepted}, () => {onDropFunction(this.state.accepted, splt[1], this.state.qtd);});
    }

    render() {
      const {
        onDropFunction,
        onRemoveFunction,
        fileDescriptions,
        maxArquivos,
        disabled
      } = this.props

      return (
        <section>
          <div className="">
            <Dropzone
                className="dropzone"
                accept="application/pdf, image/jpg, image/png, image/jpeg"
                activeClassName="drop-zone-accept"
                rejectClassName="drop-zone-reject"
                multiple={false}
                disabled={this.state.qtd === maxArquivos}
                onDrop={(accepted, rejected) => {this.acceptFile({ accepted, rejected }); }}
                //onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
            >
                <span >Arraste seus arquivos e solte-os aqui</span>
                <br />
                <br />
                <span >ou clique para procurar</span>
            </Dropzone>
            <Field 
              id={"inptQtdArquivos"}
              name={"inputQtdArquivos"}
              component={InputClean}
              hidden={true}
              validate={[ required]}
            />
          </div>
          <aside>
            <h2>Termo de consentimento</h2>
            <ul>
              { 
                this.state.accepted.map((item, f) => { 
                return(
                <li key={"li" + f} className="listStyle">
                  <div key={"div1" + f} className="uk-grid-large uk-child-width-expand uk-grid">
                    <div key={"div1.1" + f} className="uk-width-2-5">
                      <label key={"fakeLabel1" + f} className="uk-form-label"> &nbsp; </label>
                      <h4 key={"h4" + f} className="uk-h4 uk-margin-small uk-text-center-small"> {item.file.name} </h4>
                    </div>
                    <div key={"div1.2" + f} className="uk-width-1-5">
                      <label key={"fakeLabel2" + f} className="uk-form-label"> &nbsp; </label>
                      <button key={"btnRemove_" + f} id={"btnRemove_" + f} className ="btnCustomStyleClean" onClick={(e) => this.removeFile(e.target)}> Remover </button>
                    </div>
                    <div key={"div1.3" + f} className="uk-width-2-5">
                      <Field 
                        key={"Field1." + f}
                        id={"sltTypeSelect_" + f}
                        name={"sltTypeSelect_" + f}
                        label="O QUE É ESTE ARQUIVO? *"
                        component={Select}
                        options={fileDescriptions.map((item1, i) => { return (
                          {value: item1.value,
                          text: item1.text}
                        ); })}
                        onChange={(e) => this.selectedDescription(e.target, e.target.value)}
                      />
                      <Field 
                        key={"Field2." + f}
                        id={"inptArquivoStr_" + f}
                        name={"inputArquivoStr_" + f}
                        component={InputClean}
                        hidden={true}
                        validate={[ required ]}
                      />
                      <Field 
                        key={"Field3." + f}
                        id={"inptArquivoNome" + f}
                        name={"inputArquivoNome_" + f}
                        component={InputClean}
                        hidden={true}
                        validate={[ required ]}
                      />
                      <Field 
                        key={"Field4." + f}
                        id={"inptArquivoDescr" + f}
                        name={"inputArquivoDescr_" + f}
                        component={InputClean}
                        hidden={true}
                        validate={[ required ]}
                      />
                      <Field 
                        key={"Field5." + f}
                        id={"inptArquivoExt_" + f}
                        name={"inputArquivoExt_" + f}
                        component={InputClean}
                        hidden={true}
                        validate={[ required ]}
                      />
                    </div>
                  </div>
                  <hr />
                </li>);})
              }
            </ul>
          </aside>
        </section>
      );
    }
  }

  export default FileDropZone;
  