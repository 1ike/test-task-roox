import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './Edit.module.scss';
import Header from '../../components/Header';
import Card from './Card';
import { selectUserById } from '../../services/users';
import { useAppSelector } from '../../app/hooks';


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
  const { id } = useParams();
  const user = useAppSelector((state) => selectUserById(state, Number(id)));

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   if (users.length === 0) {
  //     dispatch(fetchUsers());
  //   }
  // }, [users]);

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
