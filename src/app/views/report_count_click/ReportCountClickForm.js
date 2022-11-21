// @flow weak

import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import ReactTable from 'react-table';
import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import { auth } from '../../services/auth';
import './report_count_click.scss';
import { headerReactTableToHeaderExport } from '../../Utils';
import { Grid, Input, Column } from '../../components/formDecorators';

class ReportCountClickForm extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool
  }
  
  render() {
    const mobileId = sessionStorage.getItem('mobileIdSession');
    const userMobile = mobileId && mobileId.toString().length > 0;
    const user = auth.getUserInfo();

    const { handles, isFetching, columns, dataRequest } = this.props;
    
    return (
      <form className="uk-form">
        <div style={{ minHeight: '60vh' }} className="uk-container uk-container-center az-no-left">
          <div className="uk-form-row">
            <Grid styleNames="uk-grid-small">
              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-margin-right">
                <Field
                  id="InitialDate"
                  name="InitialDate"
                  label="Data Inicial"
                  type="date"
                  component={Input}
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  disabled={isFetching}
                />
              </Column>
              <Column cols={10} col={5} size="medium" styleNames="uk-margin-bottom uk-margin-right">
                <Field
                  id="FinalDate"
                  name="FinalDate"
                  label="Data Final"
                  type="date"
                  component={Input}
                  onChange={e => handles.handleChange(e.target.name, e.target.value)}
                  disabled={isFetching}
                />
              </Column>
            </Grid>
           
          </div>

          
          <Grid styleNames="uk-grid-small uk-margin-bottom uk-margin-top">
            <div className="uk-form-row ">
              <button className="uk-button uk-button-large uk-button-success uk-form-width-medium uk-margin-small-bottom uk-margin-right client-color" type="button" disabled={isFetching} onClick={handles.handleSearch}>
                {
                  isFetching ?
                    <span>CARREGANDO...&nbsp;<i className="fa fa-spinner fa-pulse fa-fw" /></span>
                    : <span>CARREGAR</span>
                }
              </button>

              {dataRequest.length > 0 &&
                
                  !isFetching && !userMobile &&
                  
                  <CSVLink
                    className="uk-button uk-button-large uk-button-success uk-margin-small-bottom button-generate-excel"
                    data={dataRequest}
                    headers={headerReactTableToHeaderExport(columns)}
                    separator={";"}
                    filename={"Requests.csv"}>
                    <i className="fa fa-file" />
                  </CSVLink>
                
              }
            </div>
          </Grid>


          {dataRequest.length > 0 &&
            <div>
              <ReactTable
                sortable={true}
                resizable={true}
                defaultPageSize={10}
                showPagination={true}
                data={dataRequest}
                className="-striped -highlight"
                columns={columns} />
              
            </div>
          }
          
        </div>
      </form>
    );
  }
}

ReportCountClickForm = reduxForm({
  form: 'ReportCountClickForm'
})(ReportCountClickForm);

export default ReportCountClickForm;
