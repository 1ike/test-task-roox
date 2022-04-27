import {
  createAsyncThunk, createEntityAdapter, createSlice, SerializedError,
} from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

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
export const fetchUserById = createAsyncThunk('users/fetchById', API.fetchUserById);

interface InitialState {
  loading: RequestStatus,
  error?: SerializedError
}
const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState<InitialState>({
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
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      usersAdapter.setOne(state, action.payload);
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
export const selectUsersFetchingError = (state: RootState) => state.users.error;


export const selectAllUsersSortedByCity = createSelector(
  selectAllUsers,
  (users) => [...users].sort((a, b) => {
    const aCity = a.address.city;
    const bCity = b.address.city;

    if (aCity < bCity) {
      return -1;
    }
    if (aCity > bCity) {
      return 1;
    }

    return 0;
  }),
);

export const selectAllUsersSortedByCompany = createSelector(
  selectAllUsers,
  (users) => [...users].sort((a, b) => {
    const aCompanyName = a.company.name;
    const bCompanyName = b.company.name;

    if (aCompanyName < bCompanyName) {
      return -1;
    }
    if (aCompanyName > bCompanyName) {
      return 1;
    }

    return 0;
  }),
);
