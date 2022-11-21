// @flow weak

import { PureComponent } from 'react';
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { change } from 'redux-form';
import { reduxForm } from 'redux-form';

import PropTypes from 'prop-types';

import Auth, { auth } from '../../services/auth';
import { valida_cpf } from '../../services/utils/ValidaCpfCnpj';

import AnimatedView from '../../components/animatedView/AnimatedView';
import RequestExamForm from './RequestExamForm';

import downloadArchive from '../../Utils/downloadArchive';
import Config from '../../config/Configs.json';
import { addItemWithoutDuplicates, createAndDownloadBlobFile } from '../../Utils/index';
import { isNullOrUndefined } from 'util';

class RequestExamFormHandler extends PureComponent {

  constructor(props) {
    super(props);

    this.handleReportFile = this.handleReportFile.bind(this);
  }

  state = {
    isFmi: false,
    dataForm: {
      patient: {},
      files: [],
      deliverer: {},

      origimId: 0,
      healthUnitId: 0,
      address: {},
      laboratoryId: 0,
      laboratoryAddressId: 0,
      cpf: '0',
      userType: '',
      physicianData: {},
      descriptionPathology: '',
      idPathology: 0,
      materialDeliveredId: 0,
      file: {
        FullName: '',
        Extension: '',
        Raw: ''
      }

    },

    flags: {
      canHandle: false,
      otherAddress: false,
      otherHealthUnit: false,
      showImunohistoquimica: false,
      showReportFileUpload: false,
      NGSExam: false,
      NotAllowRequest: false,
      IHQExam: false,
      isReteste: false,
      existsPatient: false,
      fundationExam: false,
      showFilesFundation: false,
      disableAddress: true,
      patientHasFoundationExam: false,

      showPatientData: true,
      showExamData: false,
      ReportImmunohistochemistry: false,
      previousReportIHQ: false,

      showUploadTermo: false,
      showUploadLaudo: false,
      isOncologista: false,
      showLaboratoryAddresses: true,
      physicianLogin: false 
    },

    dataOptions: {
      exams: [{ value: '', text: 'Selecione' }],
      laboratories: [{ value: '', text: 'Selecione' }],
      healthUnits: [{ value: '', text: 'Selecione' }],
      states: [{ value: '', text: 'Selecione' }],
      cities: [{ value: '', text: 'Selecione' }],
      physicians: [{ value: '', text: 'Selecione' }],
      addresses: [{ value: '', text: 'Selecione' }],
      genders: [{ value: '', text: 'Selecione' }],
      origins: [{ value: '', text: 'Selecione' }],
      yesOrNo: [{ value: '', text: 'Selecione' }],
      laboratoryAddresses: [{ value: '', text: 'Selecione' }],
    },
  }

  componentDidMount() {
    const { enterRequestExamForm } = this.props;
    enterRequestExamForm();

    
    this.getPhysicians();
    this.getHealthUnits();
    this.getExams();
    this.getLaboratories()
    this.getStates();
  }

  componentWillUnmount() {
    const { leaveRequestExamForm } = this.props;
    leaveRequestExamForm();
  }

  cleanForm = async () => {
    this.setState({});
    this.cleanPatientData();
  }

  cleanPatientData = async () => {
    this.props.changeFieldValue("patientName", '');
    this.props.changeFieldValue("BirthDate", '');
    this.props.changeFieldValue("gender", '');
  }

  toogleOtherAddress = async () => {
    var toogle = !this.state.flags.otherAddress;
    this.setState({ flags: { ...this.state.flags, otherAddress: toogle } });
  }

  clearAddressForm = (allForm) => {
    try {
      if (allForm)
        this.props.changeFieldValue("zip_code", '');

      this.props.changeFieldValue("address", '');
      this.props.changeFieldValue("addressNumber", '');
      this.props.changeFieldValue("complement", '');
      this.props.changeFieldValue("district", '');
      this.props.changeFieldValue("uf", '');
      this.props.changeFieldValue("city", '');

      this.setState({ dataOptions: { ...this.state.dataOptions, cities: [{ value: '', text: 'Selecione' }] } });

    } catch (e) {
      console.error('clearAddressForm went wrong..., error: ', e);
    }
  }

  cleanAllForm = async (handleSearch = false) => {
    if (!handleSearch)
      this.props.changeFieldValue("physicianRequester", '');

    this.cleanPatientData();
    this.props.changeFieldValue("healthUnit", '');
    this.props.changeFieldValue("examtype", '');
    this.props.changeFieldValue("withdrawalAddress", '');

    this.clearAddressForm(true);

    this.props.changeFieldValue("laboratory", '');
    this.props.changeFieldValue("comments", '');
    this.props.changeFieldValue("Imunohistoquimica", '');

    this.props.changeFieldValue("delivererName", '');
    this.props.changeFieldValue("delivererNumber", '');
    this.props.changeFieldValue("delivererEmail", '');
  }


  getAddressesHealthUnit = async (userType, code) => {
    try {
      let user = auth.getUserInfo();
      let addresses = [{ value: '', text: 'Selecione' }];
      let response;

      
      const { getAddressesByUsucodIfNeeded } = this.props;
      response = await getAddressesByUsucodIfNeeded(code, userType);
      
      if (response !== undefined) {
        if (response.error !== undefined) {
          UIkit.modal.alert(response.error.response.data.Message);
        } else if (response.payload.status === 204) {
          UIkit.modal.alert("Endereço não encontrado.");
        } else {
          let { data } = response.payload;

          data.forEach(data => {
            let address = data.street ? data.street.toUpperCase().trim() + ", " : 'N/I';
            address += data.number ? data.number.toUpperCase().trim() + ", " : 'N/I';
            address += data.district ? data.district.toUpperCase().trim() + ", " : 'N/I';
            address += data.city ? data.city.toUpperCase().trim() + ", " : 'N/I';
            address += data.state ? data.state.toUpperCase().trim() + ", " : 'N/I';
            address += data.zip_Code ? data.zip_Code.toUpperCase().trim() : 'N/I';
            let a = { value: data.id, text: address }

            addresses.push({ value: data.id, text: address });
            this.setState({ flags: { ...this.state.flags, showLaboratoryAddresses: false } });

          });
        }
      }

      this.setState({
        dataOptions: { ...this.state.dataOptions, laboratoryAddresses: addresses }
      });
    } catch (error) {
      console.error('get addresses went wrong..., error: ', error);
    }
  }

  getStates = async () => {
		try {
			const { getStatesIfNeeded } = this.props;
			const response = await getStatesIfNeeded();

			if (response.error !== undefined) {
				UIkit.modal.alert(response.error.response.data.Message);
				return;
			}

			if (response.payload.status === 204) {
				UIkit.modal.alert("Nenhum estado encontrado");
				return;
			}

			const { data } = response.payload;
			const states = [{ value: '', text: 'Selecione' }];

			data.forEach(state => {
				states.push({ value: state.state, text: state.state });
			}, this);

      this.setState({
        dataOptions: { ...this.state.dataOptions, states: states }
      });
			this.setState({ listStates: data });

		} catch (error) {
			console.log('get states went wrong..., error: ', error);
		}
	}

  getPhysicians = async () => {
    try {
      const user = auth.getUserInfo();
      let usucod = 0;

      if (user.profile == "HealthUnit")
      {
        usucod = user.code;
      }

      const { getPhysicianListIfNeeded } = this.props;
      let response = await getPhysicianListIfNeeded(usucod);
      
      if (response.error) {
        UIkit.modal.alert(response.error.response.data.Message);
      } else {
        let { data } = response.payload;
        let physicians = [{ value: '0', text: 'Selecione' }];

        data.forEach(physician => {
          let p = { value: physician.Id, text: physician.Name }
          physicians = addItemWithoutDuplicates(physicians, p, 'value');
        }, this);

        this.setState({
          dataOptions: { ...this.state.dataOptions, physicians: physicians }
        });
      }
    } catch (error) {
      console.error('get physicians went wrong..., error: ', error);
    }
  }

  getPhysicianData = async (physicianCode) => {
    try {
      const { getPhysicianDataIfNeeded } = this.props;
      let user = auth.getUserInfo();
      let response = await getPhysicianDataIfNeeded(user.UserType === 9 ? user.Id : physicianCode, '', '');

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);
      } else if (response.payload.status === 204) {
        UIkit.modal.alert('Não foi possivel carregar os dados do médico');
      } else if (response.payload.status === 200) {
        let { data } = response.payload;

        if (data != null) {
          this.props.changeFieldValue("name", data.Name);
          this.props.changeFieldValue("crm", data.CRM);
          this.props.changeFieldValue("crm_uf", data.CRM_UF);

          this.setState({
            dataForm: { ...this.state.dataForm, physicianData: data },
            flags: { ...this.state.flags, showPatientData: true, isOncologista: data.EspCod == 13 ? true : false }
          });
        }
      }
    } catch (error) {
      console.error('get physician data went wrong..., error: ', error);
    }
  }

  getExams = async () => {
    try {
      const { getExamTypeListIfNeeded } = this.props;
      let response = await getExamTypeListIfNeeded();
      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);
      } else if (response.payload.status === 204) {
        UIkit.modal.alert("Nenhum Exame encontrado");
      } else {
        let { data } = response.payload;
        let exams = [{ value: '', text: 'Selecione' }];

        console.log('data exams', data);

        data.forEach(state => {
          exams.push({ value: state.id, text: state.name });
        }, this);

        
        setTimeout(() => this.props.changeFieldValue('examtype', ''), 100);
        this.setState({
          dataOptions: { ...this.state.dataOptions, exams: exams }
        });
      }
    } catch (error) {
      console.error('get exams went wrong..., error: ', error);
    }
  }

  getHealthUnits = async () => {
    try {
      let user = Auth.getUserInfo();
      let healthUnits = [{ value: '', text: 'Selecione' }];
      const { getHealthUnitListIfNeeded } = this.props;
      let response = await getHealthUnitListIfNeeded(12);
      let { data } = response.payload;

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);

      } else if (response.payload.status === 204) {
        UIkit.modal.alert("Nenhuma instituição encontrada");

      }
      else {
        data.forEach(healthUnit => {
          let hUnit = { value: healthUnit.Id, text: healthUnit.Name.toUpperCase() }
          healthUnits = addItemWithoutDuplicates(healthUnits, hUnit, 'text');
        }, this);

        if (user.userType == 12) {
          const { getHealthUnitByUsucodIfNeeded } = this.props;
          let req = await getHealthUnitByUsucodIfNeeded(user.code);
          response = req;
          let { data } = response.payload;

          if (response.error !== undefined) {
            UIkit.modal.alert(response.error.response.data.Message);
            return;

          } else if (response.payload.status === 204) {
            UIkit.modal.alert("Nenhuma instituição encontrada");
            return;

          } else {
            let unit = healthUnits.find(u => Number(u.value) == Number(data.Id));
            healthUnits = [{ value: '', text: 'Selecione' }];
            healthUnits.push({ value: unit.value, text: unit.text });
            this.props.changeFieldValue("healthUnit", data.Id);
          }
        }

        this.setState({
          dataOptions: { ...this.state.dataOptions, healthUnits: healthUnits }
        });
      }
    } catch (error) {
      console.error('get health units went wrong..., error: ', error);
    }
  }

  getLaboratories = async () => {
    try {
      const { getHealthUnitListIfNeeded } = this.props;

      let user = Auth.getUserInfo();
      let response = await getHealthUnitListIfNeeded(13);

      if (response.error !== undefined) {
        UIkit.modal.alert(response.error.response.data.Message);
      } else if (response.payload.status === 204) {
        UIkit.modal.alert("Nenhum Laboratório encontrado");
      } else {
        let { data } = response.payload;
        let laboratories = [{ value: '', text: 'Selecione' }];
        data.forEach(state => {
          laboratories.push({ value: state.Id, text: state.Name });
        }, this);

        this.setState({
          dataOptions: { ...this.state.dataOptions, laboratories: laboratories }
        });
      }
    } catch (error) {
      console.error('get laboratories went wrong..., error: ', error);
    }
  }


  handleCpfChange = async (values) => {
    try {
      this.cleanPatientData();
      let cpf = values.target.value;
      this.setState({
        dataForm: { ...this.state.dataForm, cpf: cpf, patient: [] },
        flags: { ...this.state.flags, canHandle: false, existsPatient: false, previousReportIHQ: false, showReportFileUpload: false, showExamData: false }
      });
    } catch (error) {
      console.error('handle CPF Change went wrong..., error: ', error);
    }
  }

  handlePhysicianChange = async () => {
    try {
      let physician = document.querySelector('select[name=physicianRequester]').value;
      if (physician != '') {
        this.getPhysicianData(physician);
      }
    } catch (error) {
      console.error('handle physician => ', error);
    }
  }

  handleOrigimChange = async (values) => {
    try {
      this.setState({dataForm: { ...this.state.dataForm, origimId: values.target.value },
      });
    } catch (error) {
      console.error('handle exam type change went wrong..., error: ', error);
    }
  }

  handleExamTypeChange = async (values) => {
    try {
      this.setState({dataForm: { ...this.state.dataForm, examTypeId: values.target.value },
      });
    } catch (error) {
      console.error('handle exam type change went wrong..., error: ', error);
    }
  }

  handleSearch = async () => {
    try {
      this.cleanForm();
      this.cleanAllForm(true);
      this.setState({
        dataForm: {
          ...this.state.dataForm,
        },
        flags: { ...this.state.flags, isReteste: false, previousReportIHQ: false, showReportFileUpload: false, showExamData: false }
      });

      let user = auth.getUserInfo();
      let cpf = document.querySelector('input[name=cpf]');

      if (valida_cpf(cpf.value.replace(/[^0-9]/g, '')) == true) {
        const { getPatientIfNeeded } = this.props;
        let response = await getPatientIfNeeded(cpf.value.replace(/[^0-9]/g, ''));
        
        if (response.error !== undefined) {
          UIkit.modal.alert('<p style=\"text-align: justify\">⚠ ' + response.error.response.data.Message + '<p/>');
          return;
        }
        
        if (user.userType === 9)
        {
          this.getPhysicianData(user.code)
          this.props.changeFieldValue("physicianRequester", user.code);
          this.setState({ flags: { ...this.state.flags, physicianLogin: true } });
        }


        //Novo paciente
        if (response.payload.status === 204) {
            this.cleanPatientData();
            this.setState({
            dataForm: { ...this.state.dataForm },
            flags: { ...this.state.flags, canHandle: true, existsPatient: false, NotAllowRequest: false }
          });
          return;
        }
        
        const { getExamFoundationByPatientIfNeeded } = this.props;
        let responsePat = await getExamFoundationByPatientIfNeeded(response.payload.data.id);

        if (responsePat.error !== undefined) {
          UIkit.modal.alert('<p style=\"text-align: justify\">⚠ ' + response.error.response.data.Message + '<p/>');
          return;
        }
        if (responsePat.payload.data > 0) {
          UIkit.modal.alert("⚠ Não é possível solicitar exame para o paciente");
          return;
        }
        
        
        //Regra para novo cadastro de paciente 
        if (response.payload.data == null) {
          this.cleanPatientData();
          this.setState({
            dataForm: { ...this.state.dataForm, existsIHQReport: '', existsNGSReport: '' },
            flags: { ...this.state.flags, canHandle: true, existsPatient: false, NotAllowRequest: false }
          });
        }
        else 
        {

          this.setState({
            dataForm: { ...this.state.dataForm, patient: response.payload.data },
            flags: { ...this.state.flags, NotAllowRequest: false }
          });
          let patient = response.payload.data;
          let schedules = [];
            
          //Regra master, cliente para liberação de reteste
          //if ([1, 3, 4, 6, 9].find(t => t === user.UserType)) {
            this.props.changeFieldValue("patientName", patient.name);
            this.props.changeFieldValue("BirthDate", (patient.birthDate).substring(0, 10));
            this.props.changeFieldValue("gender", patient.gender);

          this.setState({ flags: { ...this.state.flags, canHandle: true , showExamData: true} });
          
        }
      }
    } catch (error) {
      console.error('get patient went wrong..., error: ', error);
    }
  }

  getHealthUniAddress = async (laboratoryCode) => {
		try {
      await this.getAddressesHealthUnit(13, laboratoryCode)
      this.setState({dataForm: { ...this.state.dataForm, laboratoryId: laboratoryCode}});
    
		} catch (error) {
			console.log('get states went wrong..., error: ', error);
		}

  }

  handleLaboratoryChange = async (laboratoryCode) => {
		try {
      this.setState({dataForm: { ...this.state.dataForm, laboratoryId: laboratoryCode}});
    
		} catch (error) {
			console.log('get states went wrong..., error: ', error);
		}

  }


  handleMaterialDeliveredChange = async (values) =>
  {
    if(values.target[values.target.selectedIndex].text === 'Não')
    {
      UIkit.modal.alert("<h4 style='color: red;'>Atenção</h4><hr/>⚠ <strong> É importante que o material já esteja separado e pronto, para agilizar a retirada. Kits de coletas serão disponibilizados pelo operador logístico.</strong>");
    }
    
    this.setState({dataForm: { ...this.state.dataForm, materialDeliveredId: values.target[values.target.selectedIndex].value}});
  }


  handleLaboratoryAddressChange = async (values) =>
  {
    this.setState({dataForm: { ...this.state.dataForm, laboratoryAddressId: values.target[values.target.selectedIndex].value}});
  }

  handlePatientData = async () => {
    try {
      if (this.state.flags.showPatientData && this.state.flags.canHandle) {
        let name = document.querySelector('input[name=patientName]').value;
        let gender = document.querySelector('select[name=gender]').value;
        let birthDate = document.querySelector('input[name=BirthDate]').value;

        this.setState({
          flags: {
            ...this.state.flags,
            showExamData: !isNullOrUndefined(name) && name != ''
              && !isNullOrUndefined(gender) && gender != ''
              && !isNullOrUndefined(birthDate) && birthDate != ''
          }
        })

      }
    } catch (error) {
      console.log('handlePatientData error ->', error);
    }
  }

  handleStateChange = async (values) => {
    try {
      let state = values.target[values.target.selectedIndex].value;
      if (!state)
        return;

      this.getCityByState(state);

    } catch (error) {
      console.error('get cities went wrong..., error: ', error);
    }
  }

  getCityByState = async (state) => {
    try {
      const { getCitiesIfNeeded } = this.props;
      let request = await getCitiesIfNeeded(state);
      let { data } = request.payload;

      if (!data || data.length == 0) {
        return;
      }
      let cities = [{ value: '', text: 'Selecione' }];
      data.forEach(city => {
        cities.push({ value: city.name.toUpperCase(), text: city.name.toUpperCase() });
      }, this);

      this.setState({
        dataOptions: { ...this.state.dataOptions, cities: cities }
      });
    } catch (e) {
      console.error('getCityByState went wrong..., error: ', e);
    }
  }

  handleHealthUnitChange = async (values) => {
    try {
      const user = auth.getUserInfo();
      const isInstitutionOrMedic = user.userType == 12 || user.userType == 9;

      this.getHealthUniAddress(values.target[values.target.selectedIndex].value)
        .then(() => {
          isInstitutionOrMedic && this.selectFirstHealthUnitAdress();
        });

      this.setState({ dataForm: { ...this.state.dataForm, healthUnitId: values.target[values.target.selectedIndex].value } });
      setTimeout(() => this.setState({ flags: { ...this.state.flags } }), 10);
    }
    catch (error) {
      console.error('handle health unit change went wrong..., error: ', error);
    }
  }
  
  selectFirstHealthUnitAdress = () => {
    const adresses = this.state.dataOptions.laboratoryAddresses;
    const firstAdress = adresses[1];

    firstAdress && this.props.changeFieldValue("laboratoryAddress", firstAdress.value);
  }

  handleCepOnChange = async (newZipCode) => {
    try {
      let { previousZipCode } = this.state.dataForm;
      let zipCode = newZipCode.replace(/([^\d])+/gim, '');

      if (zipCode && zipCode.length == 8 && previousZipCode != zipCode) {
        this.clearAddressForm(false);
        this.setState({ dataForm: { ...this.state.dataForm, previousZipCode: zipCode } });

        let response = await this.props.getAddressByZipcode(newZipCode);
        let { data } = response.payload;
        if (response.error !== undefined) {
          UIkit.modal.alert(response.error.response.data.Message);
          return
        }

        if (data) {
          if (data.Status.toUpperCase() == 'SUCCESS') {
            this.props.changeFieldValue("address", data.Return.LOGRNome.toUpperCase());
            this.props.changeFieldValue("district", data.Return.BAINome.toUpperCase());
            this.props.changeFieldValue("uf", data.Return.LOCUF);

            this.getCityByState(data.Return.LOCUF)
              .then(() => {
                this.props.changeFieldValue("city", data.Return.LOCNome.toUpperCase());
              });

            this.setState({
              flags: {
                ...this.state.flags, disableAddress: true
              },
              dataForm: {
                ...this.state.dataForm,
                address: {
                  zip_code: newZipCode,
                  address: data.Return.LOGRNome.toUpperCase(),
                  district: data.Return.BAINome.toUpperCase(),
                  uf: data.Return.LOCUF,
                  city: data.Return.LOCNome.toUpperCase()
                }
              }
            });

          } else {
            this.setState({
              flags: {
                ...this.state.flags, disableAddress: false
              },
              dataForm: {
                ...this.state.dataForm,
                address: {
                  zip_code: newZipCode,
                  address: '',
                  addressNumber: '',
                  complement: '',
                  district: '',
                  uf: '',
                  city: ''
                }
              }
            }, () => this.clearAddressForm(false));
          }
        } else {
          this.setState({
            flags: {
              ...this.state.flags, disableAddress: false
            },
            dataForm: {
              ...this.state.dataForm,
              address: {
                zip_code: newZipCode,
                address: '',
                addressNumber: '',
                complement: '',
                district: '',
                uf: '',
                city: ''
              }
            }
          }, () => this.clearAddressForm(false));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  submit = async (values) => {
    try {
      
      console.log('Arquivo ',this.state.file);

        //return;
      
      let user = auth.getUserInfo();
      let listErrors = this.validateSubmit(values);
      
      if (listErrors.length == 0) {

        let status =  1; // Agendado
        let scheduledDate = new Date();
        let patientId = 0;
        if (this.state.dataForm.patient != null) {
          patientId = this.state.dataForm.patient.id
        }

        let physicianUserId = 0;

        physicianUserId = this.state.dataForm.physicianData.id;
        

        const Address = {
          Id: 0,
          Street: '',
          Number: '',
          District: '',
          Complement: '',
          Zip_Code: '',
          City: '',
          State: ''
        };

        if (this.state.flags.otherAddress == true) {
          Address.Street = values.address;
          Address.Number = values.addressNumber;
          Address.District = values.district;
          Address.Complement = values.complement;
          Address.Zip_Code = values.zip_code.replace("-", "");
          Address.City = values.city;
          Address.State = values.uf;
        } else {
          if (this.state.dataForm.laboratoryId)
            Address.Id = this.state.dataForm.laboratoryId;
          else {
            UIkit.modal.alert('É necessário informar o endereço');
            return;
          }
        }

        const examRequest = {
          HealthUnitInstitutionId: this.state.dataForm.healthUnitId,
          UserId: user.code,
          Status: status,
          ScheduledDate: scheduledDate,
          Comments: values.comments,
          Laboratory: {
            Id: this.state.dataForm.laboratoryId,
            Address: {
              Id: this.state.dataForm.laboratoryAddressId
            }
          },
          Deliverer: {
            Name: values.delivererName,
            Number: values.delivererNumber,
            Email: values.delivererEmail,
            MaterialDelivered: this.state.dataForm.materialDeliveredId
          },
          ExamType: {
            Id: this.state.dataForm.examTypeId
          },
          Exam: {
            ExamReports: this.state.dataForm.files
          },
          MaterialDelivered: this.state.dataForm.materialDeliveredId,
          Address: Address,
          Patient: {
            Id: patientId,
            Name: values.patientName,
            Gender: values.gender,
            BirthDate: values.BirthDate,
            CPF: values.cpf.replace(/[^0-9]/g, ''),
            CidCod: this.state.dataForm.idPathology,
            // Origim: this.state.dataForm.origimId,
            User: {
              Code: user.code
            }
            // Files: [this.state.file]

          },
          Physician: {
            Id: physicianUserId
          }
        };

        await this.handleSearch();
        if (this.state.flags.NotAllowRequest) {
          return;
        }


        const { insertExamRequestIfNeeded } = this.props;
        let response = await insertExamRequestIfNeeded(examRequest);

        let { data } = response.payload;

        if (response.error !== undefined) {
          UIkit.modal.alert("Ocorreu um erro ao tentar cadastrar o paciente, por favor tente novamente mais tarde.");
          return;
        }

        if (response.payload.status === 204) {
          UIkit.modal.alert("Não foi possível cadastrar o paciente, por favor tente novamente mais tarde.");
          return;
        }
        
        UIkit.modal.alert("Sua solicitação de exame foi gerada com sucesso. O código do protocolo é " + data);

        const {
          history
        } = this.props;
        history.push({ pathname: '/' });

      }

    } catch (error) {
      console.error('request exam went wrong..., error: ', error);
    }
  }

  validateSubmit(values) {
    try {

      let user = auth.getUserInfo();
      let listErrors = [];
      let fieldFocus = '';
      if (isNullOrUndefined(values)) {
        listErrors.push("Preencha todas as informações do formulário;");
      }

      if (user.UserType == 9 &&
        (isNullOrUndefined(values.crm) || isNullOrUndefined(values.crm_uf) || isNullOrUndefined(values.name)
          || values.crm == '' || values.crm_uf == '' || values.name == '')) {
        listErrors.push("Dados do <strong>Médico</strong> não foram encontrados;");
        fieldFocus = fieldFocus == '' ? 'name' : fieldFocus;

      }
      if (user.UserType != 9 && isNullOrUndefined(values.physicianRequester) || values.physicianRequester == 0) {
        listErrors.push("Selecione o <strong>Médico solicitante</strong>;");
        fieldFocus = fieldFocus == '' ? 'physicianRequester' : fieldFocus;
      }

      //Paciente
      if (isNullOrUndefined(values.cpf) || values.cpf.replace(/[^0-9]/g, '').length != 11) {
        listErrors.push("Informe o <strong>CPF do paciente</strong>;");
        fieldFocus = fieldFocus == '' ? 'cpf' : fieldFocus;
      }
      if (isNullOrUndefined(values.patientName) || values.patientName.length <= 0) {
        listErrors.push("Informe o <strong>Nome do paciente</strong>;");
        fieldFocus = fieldFocus == '' ? 'patientName' : fieldFocus;
      }
      if (isNullOrUndefined(values.gender) || values.gender == '') {
        listErrors.push("Selecione o <strong>Sexo do paciente</strong>;");
        fieldFocus = fieldFocus == '' ? 'gender' : fieldFocus;
      }
      if (isNullOrUndefined(values.BirthDate) || values.BirthDate == null) {
        listErrors.push("Informe a <strong>Data de Nascimento do paciente</strong>;");
        fieldFocus = fieldFocus == '' ? 'BirthDate' : fieldFocus;
      }

      //Dados do exame
      if (isNullOrUndefined(values.healthUnit) || values.healthUnit == null) {
        listErrors.push("Selecione a <strong>Nome da Instituição Para Retirada da Amostra</strong>;");
        fieldFocus = fieldFocus == '' ? 'healthUnit' : fieldFocus;

      }

      if (isNullOrUndefined(values.examtype) || values.examtype == '') {
        listErrors.push("Selecione o <strong>Tipo de exame</strong>;");
        fieldFocus = fieldFocus == '' ? 'examtype' : fieldFocus;
      }

      if (isNullOrUndefined(values.laboratory) || values.laboratory == '') {
        listErrors.push("Selecione um <strong>Laboratório</strong>;");
        fieldFocus = fieldFocus == '' ? 'laboratory' : fieldFocus;
      }
      if (!this.state.flags.otherAddress && isNullOrUndefined(values.laboratoryAddress) || values.laboratoryAddress == '') {
        listErrors.push("Selecione um <strong>Endereço de retirada</strong>;");
        fieldFocus = fieldFocus == '' ? 'laboratoryAddress' : fieldFocus;
      }      
      if (isNullOrUndefined(values.materialDelivered) || values.materialDelivered == '') {
        listErrors.push("Selecione se <strong>Recebeu o material</strong>;");
        fieldFocus = fieldFocus == '' ? 'materialDelivered' : fieldFocus;
      }

      // files
      const findFile = (type) => {
        return this.state.dataForm.files.find(f => f.ReportType == type);
      };

      if (!findFile(Config.ExamPrescription)) {
        listErrors.push('Faça o Upload do arquivo <strong>Pedido Médico</strong>;');
        fieldFocus = fieldFocus == '' ? 'ExamRequest' : fieldFocus;
      }
      if (!findFile(Config.AnatomopathologicalReport)) {
        listErrors.push('Faça o Upload do arquivo <strong>Anatomopatológico</strong>;');
        fieldFocus = fieldFocus == '' ? 'AnatomopathologicalReport' : fieldFocus;
      }
      if (!findFile(Config.ConsentForm)) {
        listErrors.push('Faça o Upload do arquivo <strong>Termo de Consentimento do Paciente</strong>;');
        fieldFocus = fieldFocus == '' ? 'ConsentForm' : fieldFocus;
      }
      if (!findFile(Config.TransportDeclaration)) {
        listErrors.push('Faça o Upload do arquivo <strong>Termo de Transporte</strong>;');
        fieldFocus = fieldFocus == '' ? 'ShippingTerm' : fieldFocus;
      }

      if (listErrors.length > 0) {
        let message = '⚠ <strong>Informe os campos abaixo:</strong>  <br/> <ul>';

        listErrors.forEach(error => {
          message += ' <li>' + error + '</li>  <br/>';
        }, this);
        message += '</ul>'
        Promise.all([
          UIkit.modal.alert(message)
        ]).then(() => setTimeout(() => document.getElementById(fieldFocus).focus(), 500));
      }
      return listErrors;
    } catch (error) {
      console.log('ValidateSubmit error ->', error);
    }
  }

  getExamFoundationModel = (modelAmgen) => {
    let modelFoundation =
    {
      "patient": {
        "code": modelAmgen.Patient.Id > 0 ? modelAmgen.Patient.Id : 0,
        "cpf": modelAmgen.Patient.CPF,
        "name": modelAmgen.Patient.Name,
        "birthdate": modelAmgen.Patient.BirthDate,
        "gender": modelAmgen.Patient.Gender,
        "orgCod": 65
      },
      "examType": {
        "code": modelAmgen.ExamType.ExamTypeId,
      },
      "physician": {
        "code": this.state.dataForm.physicianData.Id,
      },
      "healthUnit": {
        "code": modelAmgen.HealthUnitInstitutionId,
      },
      "exam": {
        "userId": modelAmgen.UserId,
        "examDate": new Date(),
        "examReports": modelAmgen.Exam.ExamReports,
        "registerDate": new Date(),
        "userCode": modelAmgen.UserId
      },
      "status": 1,
      "generateVoucher": true,
      "scheduleUser": modelAmgen.UserId,
      "address": modelAmgen.Address
    }
    return modelFoundation;
  }

  handleReportFile(file, type) {
    try {
      if (!file[0]) {
        return;
      }

      console.log("Arquivo: ", file);


      const reader = new FileReader();
      reader.onload = () => {
        if (!file[0]) {
          return;
        }

        let files = this.state.dataForm.files;

        const reportFile = {
          ReportType: type,
          ReportFile: reader.result.split(',')[1].substring(0, reader.result.length),
          FullName: file[0].name
        };
        files = files.filter(f => f.ReportType != type);
        files.push(reportFile);

        this.setState({
          dataForm: { ...this.state.dataForm, files }
        });
      };

      reader.readAsDataURL(file[0]);
    } catch (error) {
      console.error("Error handle report file:", error);
    }
  }

  render() {
    return (
      <AnimatedView>
         <script lang="javascript" src="dist/xlsx.full.min.js"></script>
        <div id='titleAmgenLogin' className="uk-container uk-container-center ">
          <h2 className=" uk-margin-top uk-text-center-medium ">&nbsp;&nbsp;SOLICITAÇÃO &nbsp;DE&nbsp; EXAME</h2>
          <hr/>
          <RequestExamForm
            Submit={this.submit}
            isFetching={this.props.isFetching}
            handleSubmit={this.props.handleSubmit}
            isFmi= {this.state.isFmi}
            dataForm={this.state.dataForm}
            dataOptions={this.state.dataOptions}
            flags={this.state.flags}
            handles={{
              handleSearch: this.handleSearch,
              handleCpfChange: this.handleCpfChange,
              handleHealthUnitChange: this.handleHealthUnitChange,
              handlePhysicianChange: this.handlePhysicianChange,
              handleExamTypeChange: this.handleExamTypeChange,
              handleStateChange: this.handleStateChange,
              handleCepOnChange: this.handleCepOnChange,
              handlePatientData: this.handlePatientData,
              handleLaboratoryChange : this.handleLaboratoryChange,
              handleLaboratoryAddressChange :  this.handleLaboratoryAddressChange,
              handleOrigimChange : this.handleOrigimChange,
              handleStageChange : this.handleStageChange,
              handleMaterialDeliveredChange : this.handleMaterialDeliveredChange,
              toogleOtherAddress: this.toogleOtherAddress,
              handleReportFile: this.handleReportFile
            }}
            file = {this.state.file}
          />
        </div>
      </AnimatedView>
    );
  }
}

RequestExamFormHandler = reduxForm({
  form: 'RequestExamForm', // a unique name for this form
  enableReinitialize: true
})(RequestExamFormHandler);

function mapStateToProps(state) {
  return {
    formValues: state.form,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('RequestExamForm', field, value));
    },
    untouchField: function (field) {
      dispatch(untouch('RequestExamForm', field));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestExamFormHandler);


