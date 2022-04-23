import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface Address {
  street: string,
  city: string,
  zipcode: string,
}

export interface Company {
  name: string,
}

export interface User {
  id: number
  name: string,
  username: string,
  email: string,
  address: Address,
  phone: string,
  website: string,
  company: Company,
}


export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
