const URL_BASE = 'http://localhost:8017';
const URL_BASE_V1 = `${URL_BASE}/api/v1`;

// Auth
const URL_AUTH = `${URL_BASE_V1}/auth`;
const URL_AUTH_REGISTER = `${URL_AUTH}/register`;
const URL_ACTIVATED = `${URL_AUTH}/activate`;
const URL_AUTH_LOGIN = `${URL_AUTH}/login`;
const URL_AUTH_RF_TOKEN = `${URL_AUTH}/refreshToken`;
const URL_AUTH_LOGOUT = `${URL_AUTH}/logout`;
const URL_FORGOT_PASSWORD = `${URL_AUTH}/forgotPassword`;
const URL_RESET_PASSWORD = `${URL_AUTH}/resetPassword`;

// Users
const URL_USERS = `${URL_BASE_V1}/users`;
const URL_GET_INFO = `${URL_USERS}/information`;
const URL_UPDATE_INFO = `${URL_USERS}/information/update`;
const URL_TEST = `${URL_USERS}/test`;

export {
    URL_AUTH_REGISTER,
    URL_ACTIVATED,
    URL_AUTH_LOGIN,
    URL_AUTH_RF_TOKEN,
    URL_AUTH_LOGOUT,
    URL_FORGOT_PASSWORD,
    URL_RESET_PASSWORD,
    URL_GET_INFO,
    URL_TEST,
    URL_UPDATE_INFO
};
