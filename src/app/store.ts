import { configureStore } from '@reduxjs/toolkit';

import usersReducer, { usersReducerName } from '../services/users';
import sortByReducer, { sortByReducerName } from '../services/sortBy';


export const store = configureStore({
  reducer: {
    [usersReducerName]: usersReducer,
    [sortByReducerName]: sortByReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
