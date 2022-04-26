import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Profile.module.scss';
import Header from '../../components/Header';
import Form from './Form';
import { fetchUserById, selectUserById } from '../../services/users';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/uiKit/Button/index';


const error = false;
// const loading = false;

interface Props {
  children: React.ReactNode,
}

const Wrapper = ({ children }: Props) => (
  <div className={styles.content}>
    <header className={styles.header}>
      <Header>Профиль пользователя</Header>
      <Button
        onClick={() => { }}
      >
        Редактировать
      </Button>
    </header>
    {children}
  </div>
);

const Home = () => {
  const params = useParams();
  const id = Number(params.id);
  const user = useAppSelector((state) => selectUserById(state, id));

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserById(id));
    }
  }, [user, id]);

  if (error) {
    return (
      <Wrapper>
        Произошла ошибка при загрузке. Попробуйте обновить страницу.
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {user && <Form user={user} />}
    </Wrapper>
  );
};

export default Home;
