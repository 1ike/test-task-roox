import { configureStore } from '@reduxjs/toolkit';

import usersReducer, { usersReducerName } from '../services/users';


export const store = configureStore({
  reducer: {
    [usersReducerName]: usersReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
