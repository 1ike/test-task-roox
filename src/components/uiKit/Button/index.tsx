import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';


interface PropsInterface {
  children: React.ReactNode,
  overridingClass?: String,
}

const Button = ({ children, overridingClass = '' }: PropsInterface) => {
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
