const { REACT_APP_API_BASE_URL, REACT_APP_API_USERS_RESOURCE_PATH } = process.env;


export const API_BASE_URL = REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com/';
export const API_USERS_RESOURCE_PATH = REACT_APP_API_USERS_RESOURCE_PATH || 'users/';
