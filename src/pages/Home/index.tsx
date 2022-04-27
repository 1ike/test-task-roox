import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './Home.module.scss';
import Header from '../../components/Header';
import Card from './Card';
import {
  fetchUsers, selectTotalUsers, selectIsUsersLoading, selectUsersFetchingError,
} from '../../services/users';
import { selectUsersSelector } from '../../services/sortBy';
import { useAppDispatch, useAppSelector, useTitle } from '../../app/hooks';


interface Props {
  children: React.ReactNode,
}

const Wrapper = ({ children }: Props) => (
  <div className={styles.content}>
    <Header>Список пользователей</Header>
    {children}
  </div>
);


const UsersSkeleton = () => (
  <>
    {Array(10)
      .fill(null)
      .map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton height={75} containerClassName={styles.skeletonCardContainer} key={index} />
      ))}
  </>
);


const Home = () => {
  useTitle('Список пользователей');

  const usersSelector = useAppSelector(selectUsersSelector);
  const users = useAppSelector(usersSelector);

  const usersTotal = useAppSelector(selectTotalUsers);
  const isLoading = useAppSelector(selectIsUsersLoading);

  const error = useAppSelector(selectUsersFetchingError);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (users.length <= 1) {
      dispatch(fetchUsers());
    }
  }, [users]);

  if (error) {
    return (
      <Wrapper>
        Произошла ошибка при загрузке. Попробуйте обновить страницу.
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className={styles.list}>
        {isLoading ? <UsersSkeleton /> : users.map((user) => (
          <Card
            user={user}
            key={user.id}
            containerClassName={styles.card}
          />
        ))}
        <footer className={styles.footer}>
          Найдено
          {' '}
          {usersTotal || <Skeleton width={12} inline />}
          {' '}
          пользователей
        </footer>
      </div>
    </Wrapper>
  );
};

export default Home;
