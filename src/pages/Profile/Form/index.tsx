/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cn from 'classnames';
import Skeleton from 'react-loading-skeleton';

import styles from './Form.module.scss';
import Button from '../../../components/uiKit/Button/index';
import { User } from '../../../services/users';


const shortTrimedString = yup.string().trim().min(3).required();
const schema = yup.object({
  name: shortTrimedString,
  username: shortTrimedString,
  email: yup.string().email().required(),
  street: shortTrimedString,
  city: shortTrimedString,
  zipcode: shortTrimedString,
  phone: shortTrimedString,
  website: shortTrimedString,
}).required();


interface Props {
  user?: User,
  disabled?: boolean
  loading?: boolean
}

const Form = ({ user, disabled }: Props) => {
  const formData = [
    {
      name: 'name',
      label: 'Name',
      value: user?.name,
    },
    {
      name: 'username',
      label: 'User name',
      value: user?.username,
    },
    {
      name: 'email',
      label: 'E-mail',
      value: user?.email,
      type: 'email',
    },
    {
      name: 'street',
      label: 'Street',
      value: user?.address?.street,
    },
    {
      name: 'city',
      label: 'City',
      value: user?.address?.city,
    },
    {
      name: 'zipcode',
      label: 'Zip code',
      value: user?.address?.zipcode,
    },
    {
      name: 'phone',
      label: 'Phone',
      value: user?.phone,
      type: 'phone',
    },
    {
      name: 'website',
      label: 'Website',
      value: user?.website,
    },
  ];

  console.log('user = ', user);

  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  if (user) {
    formData.forEach((field) => {
      setValue(field.name, field.value);
    });
  }

  const onSubmit = (data: any) => console.log(JSON.stringify(data));

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        {formData.map((field) => (
          <div className={styles.field} key={field.label}>
            <label className={styles.label}>
              {field.label}
              :
              {' '}
              {user ? (
                <input
                  type={field.type || 'text'}
                  className={cn(
                    styles.input,
                    errors[field.name] ? styles.inputInvalid : styles.inputValid,
                  )}
                  disabled={disabled}
                  {...register(field.name)}
                />
              ) : <Skeleton className={styles.skeletonField} />}
            </label>
          </div>
        ))}
        <label className={styles.label}>
          Comment:
          <textarea
            className={cn(styles.input, styles.inputValid)}
            disabled={disabled}
            {...register('comment')}
          />
        </label>
      </div>
      <Button
        type="submit"
        disabled={disabled}
        overridingClass={styles.buttonSubmit}
      >
        Отправить
      </Button>
    </form>
  );
};

export default Form;
