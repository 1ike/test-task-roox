import React from 'react';

import styles from './Edit.module.scss';
import Header from '../../components/Header';
import Card from './Card';
// import { useGetUsersQuery } from '../../services/users';


const error = false;
// const isLoading = false;
const user = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};


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
  // const { data: users, error, isLoading } = useGetUsersQuery();

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
      <Card
        user={user}
        key={user.id}
        containerClassName={styles.card}
      />
      {/* ))} */}
      <footer className={styles.footer}>Найдено 10 пользователей</footer>
    </Wrapper>
  );
};

export default Home;
