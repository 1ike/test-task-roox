import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import type { RootState } from '../app/store';
import { selectAllUsers, selectAllUsersSortedByCity, selectAllUsersSortedByCompany } from './users';

export enum SortBy {
  NONE = 'NONE',
  CITY = 'CITY',
  COMPANY = 'COMPANY',
}

export const sortByReducerName = 'sortBy';
export const slice = createSlice({
  name: sortByReducerName,
  initialState: SortBy.NONE,
  reducers: {
    changeSorting(state, action) {
      if (state === action.payload) return SortBy.NONE;

      return action.payload;
    },
  },
});

const { actions, reducer } = slice;
export const { changeSorting } = actions;
export default reducer;


export const selectSortBy = (state: RootState) => state[sortByReducerName];


export const selectUsersSelector = createSelector(
  selectSortBy,
  (sortBy) => {
    if (sortBy === SortBy.CITY) return selectAllUsersSortedByCity;
    if (sortBy === SortBy.COMPANY) return selectAllUsersSortedByCompany;

    return selectAllUsers;
  },
);
