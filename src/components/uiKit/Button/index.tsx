import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';


interface Props {
  children: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  type?: 'button' | 'submit' | 'reset',
  overridingClass?: String,
  [x:string]: any,
}

const Button = ({
  children, onClick, type = 'button', overridingClass = '', ...rest
}: Props) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cn(styles.button, overridingClass)}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
