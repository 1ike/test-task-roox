import React, { useEffect, useState } from 'react';
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
  edit?: () => void,
}

const Wrapper = ({ children, edit }: Props) => (
  <div className={styles.content}>
    <header className={styles.header}>
      <Header>Профиль пользователя</Header>
      {edit && (
        <Button
          onClick={edit}
        >
          Редактировать
        </Button>
      )}
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

  const [disabled, setDisabled] = useState(false);

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
      {user && <Form user={user} disabled={disabled} />}
    </Wrapper>
  );
};

export default Home;
