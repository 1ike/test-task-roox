import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';


interface Props {
  children: React.ReactNode,
  overridingClass?: String,
}

const Button = ({ children, overridingClass = '' }: Props) => {
  return (
    <button
      className={cn(styles.button, overridingClass)}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
