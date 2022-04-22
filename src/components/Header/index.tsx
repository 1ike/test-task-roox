import React from 'react';

import styles from './Header.module.scss';


interface IProps {
  children: React.ReactNode,
}

const Header = ({ children }: IProps) => <h1 className={styles.header}>{children}</h1>;


export default Header;
