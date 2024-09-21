
export const HOST = import.meta.env.VITE_SERVER_URL;

export const INFOAPI = 'api/info'
export const ADDMISSIONAPI = 'api/admission'
export const FORADDMISSIONAPI = 'api/for-admission'
export const STAFFAPI = 'api/staff'
export const AUTHAPI = 'api/auth'


export const CREATE_INFO = `${INFOAPI}/create-info`
export const GET_INFO_DATA = `${INFOAPI}/get-info-data`

export const CREATE_INPUT_FIELDS = `${ADDMISSIONAPI}/createInputFields`
export const DELETE_INPUT_FIELDS = `${ADDMISSIONAPI}/deleteInputFields`
export const GET_INPUT_FIELDS = `${ADDMISSIONAPI}/fetchInputFields`
export const UPDATE_INPUT_FIELDS = `${ADDMISSIONAPI}/updateInputFields`

export const GET_STAFF= `${STAFFAPI}/fetchStaffMembers`
export const CREATE_STAFF= `${STAFFAPI}/createStaff`
export const LOAD_STAFF= `${STAFFAPI}/loadStaffMember`
export const EDIT_STAFF= `${STAFFAPI}/editStaffMember`
export const DELETE_STAFF= `${STAFFAPI}/deleteStaffMember`

export const SUBMITING_FOR_ADMISSION = `${FORADDMISSIONAPI}/submitAddmission`;
export const FETCH_ADMISSIONS = `${FORADDMISSIONAPI}/fetchAdmissions`;
export const ACTION_ADMISSIONS = `${FORADDMISSIONAPI}/sendEmail`;
export const CONTACTUS = `${FORADDMISSIONAPI}/contactUs`;

export const ADMIN_LOGIN = `${AUTHAPI}/adminLogin`
export const VERIFY_ADMIN = `${AUTHAPI}/verify`
export const ADMIN_LOGOUT = `${AUTHAPI}/logout`