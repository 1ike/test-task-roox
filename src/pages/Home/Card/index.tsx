import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import styles from './Card.module.scss';
import Button from '../../../components/uiKit/Button';
import { User } from '../../../services/users';


interface Props {
  user: User,
  containerClassName?: string,
}

const Card = ({ user, containerClassName }: Props) => {
  const userDetails = [
    { title: 'ФИО', value: user.name },
    { title: 'город', value: user.address.city },
    { title: 'компания', value: user.company.name },
  ];

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`${user.id}/edit`);
  };

  return (
    <div className={cn(styles.card, containerClassName)}>
      <div>
        {userDetails.map((detail, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={styles.detail} key={idx}>
            <span className={styles.detailTitle}>
              {detail.title}
              :
            </span>
            <span className={styles.detailValue}>{detail.value}</span>
          </div>
        ))}
      </div>
      <Button
        onClick={onClick}
        overridingClass={styles.button}
      >
        Подробнее
      </Button>
    </div>
  );
};

export default Card;
