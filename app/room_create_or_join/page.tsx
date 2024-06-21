import React from 'react';
import styles from './Page.module.css';
import CreateRoomButton from '../ui/components/CreateRoomButton';
import JoinRoomButton from '../ui/components/JoinRoomButton';

const Page = () => {
  return (
    <div className={styles.container}>
      <CreateRoomButton />
      <JoinRoomButton />
    </div>
  );
};

export default Page;
