import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';


interface Props {
  children: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  type?: 'button' | 'submit' | 'reset',
  overridingClass?: String,
}

const Button = ({
  children, onClick, type = 'button', overridingClass = '',
}: Props) => {
  return (
    <button
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
