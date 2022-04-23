import React from 'react';

import styles from './Layout.module.scss';
import Button from '../uiKit/Button';

interface Props {
  children: React.ReactNode,
}

const Layout = ({ children }: Props) => {
  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <h2>Сортировка</h2>
        <Button>по городу</Button>
        <Button>по компании</Button>
      </aside>
      {children}
    </main>
  );
};

export default Layout;
