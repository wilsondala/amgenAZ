import moment from 'moment';
const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////
const ENTER_LOGIN_VIEW = 'ENTER_LOGIN_VIEW';
const LEAVE_LOGIN_VIEW = 'LEAVE_LOGIN_VIEW';
const ENTER_REDEFINE_PASSWORD_VIEW = 'ENTER_REDEFINE_PASSWORD_VIEW';
const LEAVE_REDEFINE_PASSWORD_VIEW = 'LEAVE_REDEFINE_PASSWORD_VIEW';
const ENTER_HOME_VIEW = 'ENTER_HOME_VIEW';
const LEAVE_HOME_VIEW = 'LEAVE_HOME_VIEW';
const ENTER_COMPONENTS_VIEW = 'ENTER_COMPONENTS_VIEW';
const LEAVE_COMPONENTS_VIEW = 'LEAVE_COMPONENTS_VIEW';
const ENTER_VOUCHER_VIEW = 'ENTER_VOUCHER_VIEW';
const LEAVE_VOUCHER_VIEW = 'LEAVE_VOUCHER_VIEW';
const ENTER_REQUEST_EXAM_VIEW = 'ENTER_REQUEST_EXAM_VIEW';
const LEAVE_REQUEST_EXAM_VIEW = 'LEAVE_REQUEST_EXAM_VIEW';
const LEAVE_LIST_COUNT_CLICKS_VIEW = 'LEAVE_LIST_COUNT_CLICKS_VIEW';
const ENTER_REQUEST_EXAM_SPECIFIC_LAB_VIEW = 'ENTER_REQUEST_EXAM_SPECIFIC_LAB_VIEW';
const LEAVE_REQUEST_EXAM_SPECIFIC_LAB_VIEW = 'LEAVE_REQUEST_EXAM_SPECIFIC_LAB_VIEW';
const ENTER_REGISTER_POS_VIEW = 'ENTER_REGISTER_POS_VIEW';
const LEAVE_REGISTER_POS_VIEW = 'LEAVE_REGISTER_POS_VIEW';
const ENTER_LIST_POS_VIEW = 'ENTER_LIST_POS_VIEW';
const LEAVE_LIST_POS_VIEW = 'LEAVE_LIST_POS_VIEW';
const ENTER_ADMIN_HOME_VIEW = 'ENTER_ADMIN_HOME_VIEW';
const LEAVE_ADMIN_HOME_VIEW = 'LEAVE_ADMIN_HOME_VIEW';
const ENTER_MANAGE_POS_VIEW = 'ENTER_MANAGE_POS_VIEW';
const LEAVE_MANAGE_POS_VIEW = 'LEAVE_MANAGE_POS_VIEW';
const ENTER_MANAGE_VOUCHERS_VIEW = 'ENTER_MANAGE_VOUCHERS_VIEW';
const LEAVE_MANAGE_VOUCHERS_VIEW = 'LEAVE_MANAGE_VOUCHERS_VIEW';
const ENTER_MANAGE_VOUCHERS_FORM_VIEW = 'ENTER_MANAGE_VOUCHERS_FORM_VIEW';
const LEAVE_MANAGE_VOUCHERS_FORM_VIEW = 'LEAVE_MANAGE_VOUCHERS_FORM_VIEW';
const ENTER_VALIDATE_VOUCHER_FORM_VIEW = 'ENTER_VALIDATE_VOUCHER_FORM_VIEW';
const LEAVE_VALIDATE_VOUCHER_FORM_VIEW = 'LEAVE_VALIDATE_VOUCHER_FORM_VIEW';
const ENTER_LIST_VOUCHERS_VIEW = 'ENTER_LIST_VOUCHERS_VIEW';
const LEAVE_LIST_VOUCHERS_VIEW = 'LEAVE_LIST_VOUCHERS_VIEW';
const ENTER_REGISTER_POS_SUCCESS_VIEW = 'ENTER_REGISTER_POS_SUCCESS_VIEW';
const LEAVE_REGISTER_POS_SUCCESS_VIEW = 'LEAVE_REGISTER_POS_SUCCESS_VIEW';
const ENTER_MANAGE_PHYSICIANS_VIEW = 'ENTER_MANAGE_PHYSICIANS_VIEW';
const LEAVE_MANAGE_PHYSICIANS_VIEW = 'LEAVE_MANAGE_PHYSICIANS_VIEW';
const ENTER_PHYSICIAN_HOME_VIEW = 'ENTER_PHYSICIAN_HOME_VIEW';
const LEAVE_PHYSICIAN_HOME_VIEW = 'LEAVE_PHYSICIAN_HOME_VIEW';
const ENTER_EDIT_REGISTRATION_DATA_FORM_VIEW = 'ENTER_EDIT_REGISTRATION_DATA_FORM_VIEW';
const LEAVE_EDIT_REGISTRATION_DATA_FORM_VIEW = 'LEAVE_EDIT_REGISTRATION_DATA_FORM_VIEW';
const ENTER_PHYSICIAN_EDIT_REGISTRATION_DATA_FORM_VIEW = 'ENTER_PHYSICIAN_EDIT_REGISTRATION_DATA_FORM_VIEW';
const LEAVE_PHYSICIAN_EDIT_REGISTRATION_DATA_FORM_VIEW = 'LEAVE_PHYSICIAN_EDIT_REGISTRATION_DATA_FORM_VIEW';
const ENTER_INSTITUTION_HOME_VIEW = 'ENTER_INSTITUTION_HOME_VIEW';
const LEAVE_INSTITUTION_HOME_VIEW = 'LEAVE_INSTITUTION_HOME_VIEW';
const ENTER_MASTER_HOME_VIEW = 'ENTER_MASTER_HOME_VIEW';
const LEAVE_MASTER_HOME_VIEW = 'LEAVE_MASTER_HOME_VIEW';
const ENTER_KIT_SOLICITATION_FORM_VIEW = 'ENTER_KIT_SOLICITATION_FORM_VIEW';
const LEAVE_KIT_SOLICITATION_FORM_VIEW = 'LEAVE_KIT_SOLICITATION_FORM_VIEW';
const ENTER_REPRESENTATIVE_HOME_VIEW = 'ENTER_REPRESENTATIVE_HOME_VIEW';
const LEAVE_REPRESENTATIVE_HOME_VIEW = 'LEAVE_REPRESENTATIVE_HOME_VIEW';
const ENTER_MANAGER_HOME_VIEW = 'ENTER_MANAGER_HOME_VIEW';
const LEAVE_MANAGER_HOME_VIEW = 'LEAVE_MANAGER_HOME_VIEW';
const ENTER_REPORT_REQUEST_EXAM_VIEW = 'ENTER_REPORT_REQUEST_EXAM_VIEW';
const LEAVE_REPORT_REQUEST_EXAM_VIEW = 'LEAVE_REPORT_REQUEST_EXAM_VIEW';
const ENTER_REPORT_COUNT_CLICK_VIEW = 'ENTER_REPORT_COUNT_CLICK_VIEW';
const LEAVE_REPORT_COUNT_CLICK_VIEW = 'LEAVE_REPORT_COUNT_CLICK_VIEW';
const ENTER_REPORT_KIT_SOLICITATION_VIEW = 'ENTER_REPORT_KIT_SOLICITATION_VIEW';
const LEAVE_REPORT_KIT_SOLICITATION_VIEW = 'LEAVE_REPORT_KIT_SOLICITATION_VIEW';
const ENTER_MANAGE_EXAM_VIEW = 'ENTER_MANAGE_EXAM_VIEW';
const LEAVE_MANAGE_EXAM_VIEW = 'LEAVE_MANAGE_EXAM_VIEW';
const ENTER_LABORATORY_HOME_VIEW = 'ENTER_LABORATORY_HOME_VIEW';
const LEAVE_LABORATORY_HOME_VIEW = 'LEAVE_LABORATORY_HOME_VIEW';
const ENTER_CLIENT_HOME_VIEW = 'ENTER_CLIENT_HOME_VIEW';
const LEAVE_CLIENT_HOME_VIEW = 'LEAVE_CLIENT_HOME_VIEW';
const ENTER_EVALUATE_EXCEPTIONS_VIEW = 'ENTER_EVALUATE_EXCEPTIONS_VIEW';
const LEAVE_EVALUATE_EXCEPTIONS_VIEW = 'LEAVE_EVALUATE_EXCEPTIONS_VIEW';
const ENTER_HISTORIC_EXCEPTIONS_VIEW = 'ENTER_HISTORIC_EXCEPTIONS_VIEW';
const LEAVE_HISTORIC_EXCEPTIONS_VIEW = 'LEAVE_HISTORIC_EXCEPTIONS_VIEW';
const ENTER_REGISTER_INSTITUTION_VIEW = 'ENTER_REGISTER_INSTITUTION_VIEW';
const LEAVE_REGISTER_INSTITUTION_VIEW = 'LEAVE_REGISTER_INSTITUTION_VIEW';
const ENTER_PAGE_IN_CONSTRUCTION_VIEW = 'ENTER_PAGE_IN_CONSTRUCTION_VIEW';
const LEAVE_PAGE_IN_CONSTRUCTION_VIEW = 'LEAVE_PAGE_IN_CONSTRUCTION_VIEW';
const ENTER_REGISTER_MENU_VIEW = 'ENTER_REGISTER_MENU_VIEW';
const LEAVE_REGISTER_MENU_VIEW = 'LEAVE_REGISTER_MENU_VIEW';
const ENTER_REPORT_TAT_VIEW = 'ENTER_REPORT_TAT_VIEW';
const LEAVE_REPORT_TAT_VIEW = 'LEAVE_REPORT_TAT_VIEW';

const ENTER_PHYSICIAN_PROFILE_VIEW = 'ENTER_PHYSICIAN_PROFILE_VIEW';
const LEAVE_PHYSICIAN_PROFILE_VIEW = 'LEAVE_PHYSICIAN_PROFILE_VIEW';

const ENTER_INSTITUTION_PROFILE_VIEW = 'ENTER_INSTITUTION_PROFILE_VIEW';
const LEAVE_INSTITUTION_PROFILE_VIEW = 'LEAVE_INSTITUTION_PROFILE_VIEW';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  currentView: 'not set',
  enterTime: null,
  leaveTime: null
};

export default function (state = initialState, action) {
  switch (action.type) {

    case ENTER_PHYSICIAN_HOME_VIEW:
    case ENTER_HOME_VIEW:
    case ENTER_COMPONENTS_VIEW:
    case ENTER_VOUCHER_VIEW:
    case ENTER_LOGIN_VIEW:
    case ENTER_REDEFINE_PASSWORD_VIEW:
    case ENTER_ADMIN_HOME_VIEW:
    case ENTER_REQUEST_EXAM_VIEW:
    case ENTER_REGISTER_POS_VIEW:
    case ENTER_MANAGE_POS_VIEW:
    case ENTER_LIST_POS_VIEW:
    case ENTER_MANAGE_VOUCHERS_VIEW:
    case ENTER_MANAGE_VOUCHERS_FORM_VIEW:
    case ENTER_VALIDATE_VOUCHER_FORM_VIEW:
    case ENTER_LIST_VOUCHERS_VIEW:
    case ENTER_REGISTER_POS_SUCCESS_VIEW:
    case ENTER_MANAGE_PHYSICIANS_VIEW:
    case ENTER_EDIT_REGISTRATION_DATA_FORM_VIEW:
    case ENTER_PHYSICIAN_EDIT_REGISTRATION_DATA_FORM_VIEW:
    case ENTER_KIT_SOLICITATION_FORM_VIEW:
    case ENTER_INSTITUTION_HOME_VIEW:
    case ENTER_MASTER_HOME_VIEW:
    case ENTER_REPRESENTATIVE_HOME_VIEW:
    case ENTER_REPORT_REQUEST_EXAM_VIEW:
    case ENTER_REPORT_COUNT_CLICK_VIEW:
    case ENTER_REPORT_KIT_SOLICITATION_VIEW:
    case ENTER_MANAGE_EXAM_VIEW:
    case ENTER_LABORATORY_HOME_VIEW:
    case ENTER_CLIENT_HOME_VIEW:
    case ENTER_MANAGER_HOME_VIEW:
    case ENTER_EVALUATE_EXCEPTIONS_VIEW:
    case ENTER_HISTORIC_EXCEPTIONS_VIEW:
    case ENTER_REGISTER_INSTITUTION_VIEW:
    case ENTER_PAGE_IN_CONSTRUCTION_VIEW:
    case ENTER_REGISTER_MENU_VIEW:
    case ENTER_REQUEST_EXAM_SPECIFIC_LAB_VIEW:
    case ENTER_REPORT_TAT_VIEW:
    case ENTER_PHYSICIAN_PROFILE_VIEW:
    case ENTER_INSTITUTION_PROFILE_VIEW:
      // can't enter if you are already inside
      if (state.currentView !== action.currentView) {
        return {
          ...state,
          currentView: action.currentView,
          enterTime: action.enterTime,
          leaveTime: action.leaveTime
        };
      }
      return state;

    case LEAVE_PHYSICIAN_HOME_VIEW:
    case LEAVE_HOME_VIEW:
    case LEAVE_COMPONENTS_VIEW:
    case LEAVE_VOUCHER_VIEW:
    case LEAVE_LOGIN_VIEW:
    case LEAVE_REDEFINE_PASSWORD_VIEW:
    case LEAVE_ADMIN_HOME_VIEW:
    case LEAVE_REGISTER_POS_VIEW:
    case LEAVE_LIST_POS_VIEW:
    case LEAVE_MANAGE_POS_VIEW:
    case LEAVE_MANAGE_VOUCHERS_VIEW:
    case LEAVE_MANAGE_VOUCHERS_FORM_VIEW:
    case LEAVE_VALIDATE_VOUCHER_FORM_VIEW:
    case LEAVE_LIST_VOUCHERS_VIEW:
    case LEAVE_REGISTER_POS_SUCCESS_VIEW:
    case LEAVE_MANAGE_PHYSICIANS_VIEW:
    case LEAVE_EDIT_REGISTRATION_DATA_FORM_VIEW:
    case LEAVE_KIT_SOLICITATION_FORM_VIEW:
    case LEAVE_REPRESENTATIVE_HOME_VIEW:
    case LEAVE_INSTITUTION_HOME_VIEW:
    case LEAVE_MASTER_HOME_VIEW:
    case LEAVE_PHYSICIAN_EDIT_REGISTRATION_DATA_FORM_VIEW:
    case LEAVE_REPORT_REQUEST_EXAM_VIEW:
    case LEAVE_REPORT_COUNT_CLICK_VIEW:
    case LEAVE_REPORT_KIT_SOLICITATION_VIEW:
    case LEAVE_MANAGE_EXAM_VIEW:
    case LEAVE_LABORATORY_HOME_VIEW:
    case LEAVE_CLIENT_HOME_VIEW:
    case LEAVE_MANAGER_HOME_VIEW:
    case LEAVE_EVALUATE_EXCEPTIONS_VIEW:
    case LEAVE_REGISTER_INSTITUTION_VIEW:
    case LEAVE_PAGE_IN_CONSTRUCTION_VIEW:
    case LEAVE_REGISTER_MENU_VIEW:
    case LEAVE_REQUEST_EXAM_SPECIFIC_LAB_VIEW:
    case LEAVE_REPORT_TAT_VIEW:
    case LEAVE_PHYSICIAN_PROFILE_VIEW:
    case LEAVE_INSTITUTION_PROFILE_VIEW:
      // can't leave if you aren't already inside
      if (state.currentView === action.currentView) {
        return {
          ...state,
          currentView: action.currentView,
          enterTime: action.enterTime,
          leaveTime: action.leaveTime
        };
      }
      return state;

    default:
      return state;
  }
}

// /////////////////////
// action creators
// /////////////////////
export function enterHome(time = moment().format(dateFormat)) {
  return {
    type: ENTER_HOME_VIEW,
    currentView: 'Home',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveHome(time = moment().format(dateFormat)) {
  return {
    type: LEAVE_HOME_VIEW,
    currentView: 'Home',
    enterTime: null,
    leaveTime: time
  };
}

export function enterComponents(time = moment().format(dateFormat)) {
  return {
    type: ENTER_COMPONENTS_VIEW,
    currentView: 'Components',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveComponents(time = moment().format(dateFormat)) {
  return {
    type: LEAVE_COMPONENTS_VIEW,
    currentView: 'Components',
    enterTime: null,
    leaveTime: time
  };
}

export function enterVoucher(time = moment().format(dateFormat)) {
  return {
    type: ENTER_VOUCHER_VIEW,
    currentView: 'Voucher',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveVoucher(time = moment().format(dateFormat)) {
  return {
    type: LEAVE_VOUCHER_VIEW,
    currentView: 'Voucher',
    enterTime: null,
    leaveTime: time
  };
}

export function enterCountClicksForm(time = moment().format(dateFormat)) {
  return {
    type: ENTER_REQUEST_EXAM_VIEW,
    currentView: 'CountClicksForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveCountClicksForm(time = moment().format(dateFormat)) {
  return {
    type: LEAVE_LIST_COUNT_CLICKS_VIEW,
    currentView: 'CountClicksForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterRequestExamSpecificLabForm(time = moment().format(dateFormat)) {
  return {
    type: ENTER_REQUEST_EXAM_VIEW,
    currentView: 'CountClicksForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveRequestExamSpecificLabForm(time = moment().format(dateFormat)) {
  return {
    type: LEAVE_LIST_COUNT_CLICKS_VIEW,
    currentView: 'CountClicksForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterRequestExamForm(time = moment().format(dateFormat)) {
  return {
    type: ENTER_REQUEST_EXAM_VIEW,
    currentView: 'RequestExamForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveRequestExamForm(time = moment().format(dateFormat)) {
  return {
    type: LEAVE_REQUEST_EXAM_VIEW,
    currentView: 'RequestExamForm',
    enterTime: null,
    leaveTime: time
  };
}				

export function enterCountClicksSpecificLabForm(time = moment().format(dateFormat)) {
  return {
    type: ENTER_REQUEST_EXAM_SPECIFIC_LAB_VIEW,
    currentView: 'CountClicksSpecificLabForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveCountClicksSpecificLabForm(time = moment().format(dateFormat)) {
  return {
    type: LEAVE_REQUEST_EXAM_SPECIFIC_LAB_VIEW,
    currentView: 'CountClicksSpecificLabForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterRegisterPos(time = moment().format(dateFormat)) {
  return {
    type: ENTER_REGISTER_POS_VIEW,
    currentView: 'RegisterPOS',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveRegisterPos(time = moment().format(dateFormat)) {
  return {
    type: LEAVE_REGISTER_POS_VIEW,
    currentView: 'RegisterPOS',
    enterTime: null,
    leaveTime: time
  };
}

export function enterListPos(time = moment().format(dateFormat)) {
  return {
    type: ENTER_LIST_POS_VIEW,
    currentView: 'ListPOS',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveListPos(time = moment().format(dateFormat)) {
  return {
    type: LEAVE_LIST_POS_VIEW,
    currentView: 'ListPOS',
    enterTime: null,
    leaveTime: time
  };
}

export function enterLogin(time = moment().format()) {
  return {
    type: ENTER_LOGIN_VIEW,
    currentView: 'Login',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveLogin(time = moment().format()) {
  return {
    type: LEAVE_LOGIN_VIEW,
    currentView: 'Login',
    enterTime: null,
    leaveTime: time
  };
}

export function enterRedefinePasswordForm(time = moment().format(dateFormat)) {
  return {
    type: ENTER_REDEFINE_PASSWORD_VIEW,
    currentView: 'RedefinePasswordForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveRedefinePasswordForm(time = moment().format(dateFormat)) {
  return {
    type: LEAVE_REDEFINE_PASSWORD_VIEW,
    currentView: 'RedefinePasswordForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterAdminHome(time = moment().format()) {
  return {
    type: ENTER_ADMIN_HOME_VIEW,
    currentView: 'AdminHome',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveAdminHome(time = moment().format()) {
  return {
    type: LEAVE_ADMIN_HOME_VIEW,
    currentView: 'AdminHome',
    enterTime: null,
    leaveTime: time
  };
}

export function enterManagePos(time = moment().format()) {
  return {
    type: ENTER_MANAGE_POS_VIEW,
    currentView: 'ManagePos',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveManagePos(time = moment().format()) {
  return {
    type: LEAVE_MANAGE_POS_VIEW,
    currentView: 'ManagePos',
    enterTime: null,
    leaveTime: time
  };
}

export function enterClientHome(time = moment().format()) {
  return {
    type: ENTER_CLIENT_HOME_VIEW,
    currentView: 'ClientHome',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveClientHome(time = moment().format()) {
  return {
    type: LEAVE_CLIENT_HOME_VIEW,
    currentView: 'ClientHome',
    enterTime: null,
    leaveTime: time
  };
}

export function enterManagePhysicians(time = moment().format()) {
  return {
    type: ENTER_MANAGE_PHYSICIANS_VIEW,
    currentView: 'ManagePhysicians',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveManagePhysicians(time = moment().format()) {
  return {
    type: LEAVE_MANAGE_PHYSICIANS_VIEW,
    currentView: 'ManagePhysicians',
    enterTime: null,
    leaveTime: time
  };
}

export function enterManageVouchers(time = moment().format()) {
  return {
    type: ENTER_MANAGE_VOUCHERS_VIEW,
    currentView: 'ManageVouchers',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveManageVouchers(time = moment().format()) {
  return {
    type: LEAVE_MANAGE_VOUCHERS_VIEW,
    currentView: 'ManageVouchers',
    enterTime: null,
    leaveTime: time
  };
}

export function enterManageVouchersForm(time = moment().format()) {
  return {
    type: ENTER_MANAGE_VOUCHERS_FORM_VIEW,
    currentView: 'ManageVouchersForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveManageVouchersForm(time = moment().format()) {
  return {
    type: LEAVE_MANAGE_VOUCHERS_FORM_VIEW,
    currentView: 'ManageVouchersForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterValidateVoucherForm(time = moment().format()) {
  return {
    type: ENTER_VALIDATE_VOUCHER_FORM_VIEW,
    currentView: 'ValidateVoucherForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveValidateVoucherForm(time = moment().format()) {
  return {
    type: LEAVE_VALIDATE_VOUCHER_FORM_VIEW,
    currentView: 'ValidateVoucherForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterListVouchers(time = moment().format()) {
  return {
    type: ENTER_LIST_VOUCHERS_VIEW,
    currentView: 'ListVouchers',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveListVouchers(time = moment().format()) {
  return {
    type: LEAVE_LIST_VOUCHERS_VIEW,
    currentView: 'ListVouchers',
    enterTime: null,
    leaveTime: time
  };
}

export function enterRegisterPosSuccess(time = moment().format()) {
  return {
    type: ENTER_REGISTER_POS_SUCCESS_VIEW,
    currentView: 'RegisterPosSuccess',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveRegisterPosSuccess(time = moment().format()) {
  return {
    type: LEAVE_REGISTER_POS_SUCCESS_VIEW,
    currentView: 'RegisterPosSuccess',
    enterTime: null,
    leaveTime: time
  };
}

export function enterPhysicianHome(time = moment().format()) {
  return {
    type: ENTER_PHYSICIAN_HOME_VIEW,
    currentView: 'PhysicianHome',
    enterTime: time,
    leaveTime: null
  };
}

export function leavePhysicianHome(time = moment().format()) {
  return {
    type: LEAVE_PHYSICIAN_HOME_VIEW,
    currentView: 'PhysicianHome',
    enterTime: null,
    leaveTime: time
  };
}

export function enterRegisterPhysician(time = moment().format()) {
  return {
    type: ENTER_PHYSICIAN_HOME_VIEW,
    currentView: 'RegisterPhysician',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveRegisterPhysician(time = moment().format()) {
  return {
    type: LEAVE_PHYSICIAN_HOME_VIEW,
    currentView: 'RegisterPhysician',
    enterTime: null,
    leaveTime: time
  };
}

export function enterEditRegistrationDataForm(time = moment().format()) {
  return {
    type: ENTER_EDIT_REGISTRATION_DATA_FORM_VIEW,
    currentView: 'EditRegistrationDataForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveEditRegistrationDataForm(time = moment().format()) {
  return {
    type: LEAVE_EDIT_REGISTRATION_DATA_FORM_VIEW,
    currentView: 'EditRegistrationDataForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterPhysicianEditRegistrationDataForm(time = moment().format()) {
  return {
    type: ENTER_PHYSICIAN_EDIT_REGISTRATION_DATA_FORM_VIEW,
    currentView: 'PhysicianEditRegistrationDataForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leavePhysicianEditRegistrationDataForm(time = moment().format()) {
  return {
    type: LEAVE_PHYSICIAN_EDIT_REGISTRATION_DATA_FORM_VIEW,
    currentView: 'PhysicianEditRegistrationDataForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterInstitutionHome(time = moment().format()) {
  return {
    type: ENTER_INSTITUTION_HOME_VIEW,
    currentView: 'InstitutionHome',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveInstitutionHome(time = moment().format()) {
  return {
    type: LEAVE_INSTITUTION_HOME_VIEW,
    currentView: 'InstitutionHome',
    enterTime: null,
    leaveTime: time
  };
}

export function enterMasterHome(time = moment().format()) {
  return {
    type: ENTER_MASTER_HOME_VIEW,
    currentView: 'MasterHome',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveMasterHome(time = moment().format()) {
  return {
    type: LEAVE_MASTER_HOME_VIEW,
    currentView: 'MasterHome',
    enterTime: null,
    leaveTime: time
  };
}

export function enterKitSolicitationForm(time = moment().format()) {
  return {
    type: ENTER_KIT_SOLICITATION_FORM_VIEW,
    currentView: 'KitSolicitationForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveKitSolicitationForm(time = moment().format()) {
  return {
    type: LEAVE_KIT_SOLICITATION_FORM_VIEW,
    currentView: 'KitSolicitationForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterRepresentativeHome(time = moment().format()) {
  return {
    type: ENTER_REPRESENTATIVE_HOME_VIEW,
    currentView: 'RepresentativeHome',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveRepresentativeHome(time = moment().format()) {
  return {
    type: LEAVE_REPRESENTATIVE_HOME_VIEW,
    currentView: 'RepresentativeHome',
    enterTime: null,
    leaveTime: time
  };
}

export function enterManagerHome(time = moment().format()) {
  return {
    type: ENTER_MANAGER_HOME_VIEW,
    currentView: 'ManagerHome',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveManagerHome(time = moment().format()) {
  return {
    type: LEAVE_MANAGER_HOME_VIEW,
    currentView: 'ManagerHome',
    enterTime: null,
    leaveTime: time
  };
}

export function enterReportRequestExamForm(time = moment().format()) {
  return {
    type: ENTER_REPORT_REQUEST_EXAM_VIEW,
    currentView: 'ReportRequestExamForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveReportRequestExamForm(time = moment().format()) {
  return {
    type: LEAVE_REPORT_REQUEST_EXAM_VIEW,
    currentView: 'ReportRequestExamForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterReportCountClickForm(time = moment().format()) {
  return {
    type: ENTER_REPORT_COUNT_CLICK_VIEW,
    currentView: 'ReportCountClickForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveReportCountClickForm(time = moment().format()) {
  return {
    type: LEAVE_REPORT_COUNT_CLICK_VIEW,
    currentView: 'ReportCountClickForm',
    enterTime: null,
    leaveTime: time
  };
}


export function enterReportKitSolicitationForm(time = moment().format()) {
  return {
    type: ENTER_REPORT_KIT_SOLICITATION_VIEW,
    currentView: 'ReportKitSolicitationForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveReportKitSolicitationForm(time = moment().format()) {
  return {
    type: LEAVE_REPORT_KIT_SOLICITATION_VIEW,
    currentView: 'ReportKitSolicitationForm',
    enterTime: null,
    leaveTime: time
  };
}


export function enterManageExamForm(time = moment().format()) {
  return {
    type: ENTER_MANAGE_EXAM_VIEW,
    currentView: 'ManageExamForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveManageExamForm(time = moment().format()) {
  return {
    type: LEAVE_MANAGE_EXAM_VIEW,
    currentView: 'ManageExamForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterLaboratoryHome(time = moment().format()) {
  return {
    type: ENTER_LABORATORY_HOME_VIEW,
    currentView: 'LaboratoryHome',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveLaboratoryHome(time = moment().format()) {
  return {
    type: LEAVE_LABORATORY_HOME_VIEW,
    currentView: 'LaboratoryHome',
    enterTime: null,
    leaveTime: time
  };
}

export function enterEvaluateExceptionsForm(time = moment().format()) {
  return {
    type: ENTER_EVALUATE_EXCEPTIONS_VIEW,
    currentView: 'EvaluateExceptionsForm',
    enterTime: time,
    leaveTime: null
  };
}



export function leaveEvaluateExceptionsForm(time = moment().format()) {
  return {
    type: LEAVE_EVALUATE_EXCEPTIONS_VIEW,
    currentView: 'EvaluateExceptionsForm',
    enterTime: null,
    leaveTime: time
  };
}


export function enterHistoricExceptionsForm(time = moment().format()) {
  return {
    type: ENTER_HISTORIC_EXCEPTIONS_VIEW,
    currentView: 'HistoricExceptionsForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveHistoricExceptionsForm(time = moment().format()) {
  return {
    type: LEAVE_HISTORIC_EXCEPTIONS_VIEW,
    currentView: 'HistoricExceptionsForm',
    enterTime: null,
    leaveTime: time
  };
}


export function enterRegisterInstitution(time = moment().format()) {
  return {
    type: ENTER_REGISTER_INSTITUTION_VIEW,
    currentView: 'RegisterInstitution',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveRegisterInstitution(time = moment().format()) {
  return {
    type: LEAVE_REGISTER_INSTITUTION_VIEW,
    currentView: 'RegisterInstitution',
    enterTime: null,
    leaveTime: time
  };
}
export function enterPageInConstruction(time = moment().format()) {
  return {
    type: ENTER_PAGE_IN_CONSTRUCTION_VIEW,
    currentView: 'PageInConstructionForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leavePageInConstruction(time = moment().format()) {
  return {
    type: LEAVE_PAGE_IN_CONSTRUCTION_VIEW,
    currentView: 'PageInConstructionForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterRegisterMenu(time = moment().format()) {
  return {
    type: ENTER_REGISTER_MENU_VIEW,
    currentView: 'RegisterMenuForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveRegisterMenu(time = moment().format()) {
  return {
    type: LEAVE_REGISTER_MENU_VIEW,
    currentView: 'RegisterMenuForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterReportTATExamForm(time = moment().format()) {
  return {
    type: ENTER_REPORT_TAT_VIEW,
    currentView: 'ReportTATExamForm',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveReportTATExamForm(time = moment().format()) {
  return {
    type: LEAVE_REPORT_TAT_VIEW,
    currentView: 'ReportTATExamForm',
    enterTime: null,
    leaveTime: time
  };
}

export function enterPhysicianProfile(time = moment().format()) {
  return {
    type: ENTER_PHYSICIAN_PROFILE_VIEW,
    currentView: 'PhysicianProfile',
    enterTime: time,
    leaveTime: null
  };
}

export function leavePhysicianProfile(time = moment().format()) {
  return {
    type: LEAVE_PHYSICIAN_PROFILE_VIEW,
    currentView: 'PhysicianProfile',
    enterTime: null,
    leaveTime: time
  };
}

export function enterInstitutionProfile(time = moment().format()) {
  return {
    type: ENTER_INSTITUTION_PROFILE_VIEW,
    currentView: 'InstitutionProfile',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveInstitutionProfile(time = moment().format()) {
  return {
    type: LEAVE_INSTITUTION_PROFILE_VIEW,
    currentView: 'InstitutionProfile',
    enterTime: null,
    leaveTime: time
  };
}