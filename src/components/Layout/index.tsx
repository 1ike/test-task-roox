import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';
import Button from '../uiKit/Button';


const Layout = () => {
  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <h2>Сортировка</h2>
        <Button onClick={() => console.log('по городу')}>по городу</Button>
        <Button onClick={() => console.log('по компании')}>по компании</Button>
      </aside>
      <Outlet />
    </main>
  );
};

export default Layout;
