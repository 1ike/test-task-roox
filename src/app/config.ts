const { REACT_APP_API_BASE_URL, REACT_APP_API_USERS_RESOURCE_PATH, REACT_APP_NAME } = process.env;


export const API_BASE_URL = REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com/';
export const API_USERS_RESOURCE_PATH = REACT_APP_API_USERS_RESOURCE_PATH || 'users/';
export const APP_NAME = REACT_APP_NAME || 'RooX test task';
