/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import styles from './Form.module.scss';
import Button from '../../../components/uiKit/Button/index';
import { User } from '../../../services/users';


interface Props {
  user: User,
}

const Form = ({ user }: Props) => {
  const formData = [
    {
      label: 'Name',
      value: user?.name,
    },
    {
      label: 'User name',
      value: user?.username,
    },
    {
      label: 'E-mail',
      value: user?.email,
      type: 'email',
    },
    {
      label: 'Street',
      value: user?.address.street,
    },
    {
      label: 'City',
      value: user?.address.city,
    },
    {
      label: 'Zip code',
      value: user?.address.zipcode,
    },
    {
      label: 'Phone',
      value: user?.phone,
      type: 'phone',
    },
    {
      label: 'Website',
      value: user?.website,
      type: 'url',
    },
  ];

  return (
    <>
      {user && (
        <form className={styles.form}>
          {formData.map((field) => (
            <div className={styles.field}>
              <label className={styles.label}>
                {field.label}
                :
                {' '}
                <input type={field.type || 'text'} value={field.value} className={styles.input} />
              </label>
            </div>
          ))}
          <label className={styles.label}>
            Comment:
            <textarea className={styles.input} />
          </label>
        </form>
      )}
      <footer className={styles.footer}>
        <Button
          onClick={() => { }}
          overridingClass={styles.buttonSubmit}
        >
          Отправить
        </Button>
      </footer>
    </>
  );
};

export default Form;
