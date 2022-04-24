import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';

import API from '../app/API';
import type { RootState } from '../app/store';


export enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}


export type ID = number;

export interface Address {
  street: string,
  city: string,
  zipcode: string,
}

export interface Company {
  name: string,
}

export interface User {
  id: ID,
  name: string,
  username: string,
  email: string,
  address: Address,
  phone: string,
  website: string,
  company: Company,
}


export const fetchUsers = createAsyncThunk('users/fetchAll', API.fetchAllUsers);

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState({
  loading: RequestStatus.Idle,
});

export const usersReducerName = 'users';
export const slice = createSlice({
  name: usersReducerName,
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      if (state.loading === RequestStatus.Idle) {
        state.loading = RequestStatus.Pending;
      }
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (state.loading === RequestStatus.Pending) {
        usersAdapter.upsertMany(state, action.payload);
        state.loading = RequestStatus.Idle;
      }
    });
  },
  /* eslint-enable no-param-reassign */
});

const { reducer } = slice;
export default reducer;

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state: RootState) => state.users);


export const selectIsUsersLoading = (state: RootState) => (
  state.users.loading === RequestStatus.Pending
);

