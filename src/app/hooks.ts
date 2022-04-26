import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import type { RootState, AppDispatch } from './store';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


type TitleOrFnType = string | (() => string);
export const useTitle = (titleOrFn: TitleOrFnType, deps: any[] = []) => {
  useEffect(
    () => {
      document.title = `${typeof titleOrFn === 'function' ? titleOrFn() : titleOrFn} — RooX test task`;
    },
    deps,
  );
};
