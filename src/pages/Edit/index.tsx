import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Edit.module.scss';
import Header from '../../components/Header';
import Card from './Card';
import { fetchUserById, selectUserById } from '../../services/users';
import { useAppDispatch, useAppSelector } from '../../app/hooks';


const error = false;

interface Props {
  children: React.ReactNode,
}

const Wrapper = ({ children }: Props) => (
  <div className={styles.content}>
    <Header>Список пользователей</Header>
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
      {/* {users?.map((user) => ( */}
      {user && (
        <Card
          user={user}
          key={user.id}
          containerClassName={styles.card}
        />
      )}
      {/* ))} */}
      <footer className={styles.footer}>Найдено 10 пользователей</footer>
    </Wrapper>
  );
};

export default Home;
