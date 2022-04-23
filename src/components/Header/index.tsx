import React from 'react';

import styles from './Header.module.scss';


interface Props {
  children: React.ReactNode,
}

const Header = ({ children }: Props) => <h1 className={styles.header}>{children}</h1>;


export default Header;
