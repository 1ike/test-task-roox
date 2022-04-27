import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Profile.module.scss';
import Header from '../../components/Header';
import Form from './Form';
import { fetchUserById, selectUserById } from '../../services/users';
import { useAppDispatch, useAppSelector, useTitle } from '../../app/hooks';
import Button from '../../components/uiKit/Button/index';


interface Props {
  children: React.ReactNode,
  edit?: () => void,
}

const Wrapper = ({ children, edit }: Props) => (
  <div className={styles.content}>
    <header className={styles.header}>
      <Header>Профиль пользователя</Header>
      <Button
        onClick={edit}
        {...(edit ? null : { overridingClass: styles.invisible })}
      >
        Редактировать
      </Button>
    </header>
    {children}
  </div>
);

const Profile = () => {
  useTitle('Редактирование профиля');

  const params = useParams();
  const id = Number(params.id);
  const user = useAppSelector((state) => selectUserById(state, id));


  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = !user ? dispatch(fetchUserById(id)) : null;

    promise?.unwrap().catch((e) => setError(e));

    return () => {
      if (promise) promise.abort();
    };
  }, [user, id]);

  const [disabled, setDisabled] = useState(true);

  const edit = () => setDisabled(!disabled);

  if (error) {
    return (
      <Wrapper>
        Произошла ошибка при загрузке. Попробуйте обновить страницу.
      </Wrapper>
    );
  }

  return (
    <Wrapper edit={edit}>
      <Form user={user} disabled={disabled} loading={!user} />
    </Wrapper>
  );
};

export default Profile;
