import { API_BASE_URL, API_USERS_RESOURCE_PATH } from './config';
import type { User, ID } from '../services/users';


const fetchAllUsers = (): Promise<(User[])> => fetch(
  `${API_BASE_URL}${API_USERS_RESOURCE_PATH}`,
  { method: 'GET' },
)
  .then((response) => {
    if (response.ok) return response.json();

    throw new Error(`Error with status code ${response.status}`);
  });


const fetchUserById = (id: ID): Promise<(User)> => fetch(
  `${API_BASE_URL}${API_USERS_RESOURCE_PATH}${id}`,
  { method: 'GET' },
)
  .then((response) => {
    if (response.ok) return response.json();

    throw new Error(`Error with status code ${response.status}`);
  });


export default {
  fetchAllUsers,
  fetchUserById,
};
