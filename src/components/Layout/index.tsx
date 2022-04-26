import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';
import Button from '../uiKit/Button';
import { SortBy, changeSorting, selectSortBy } from '../../services/sortBy';
import { useAppDispatch, useAppSelector } from '../../app/hooks';


const Layout = () => {
  const sortBy = useAppSelector(selectSortBy);

  const dispatch = useAppDispatch();

  const filterByCity = useCallback(() => dispatch(changeSorting(SortBy.CITY)), []);
  const filterByCompany = useCallback(() => dispatch(changeSorting(SortBy.COMPANY)), []);

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <h2>Сортировка</h2>
        <Button
          onClick={filterByCity}
          overridingClass={sortBy === SortBy.CITY
            ? styles.active
            : undefined}
        >
          по городу
        </Button>
        <Button
          onClick={filterByCompany}
          overridingClass={sortBy === SortBy.COMPANY
            ? styles.active
            : undefined}
        >
          по компании
        </Button>
      </aside>

      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
