import React from 'react';
import styles from './Page.module.css';
import CreateRoomRootButton from '../ui/components/CreateRoomRootButton';
import JoinRoomRootButton from '../ui/components/JoinRoomRootButton';

const Page = () => {
  return (
    <div className={styles.container}>
      <CreateRoomRootButton />
      <JoinRoomRootButton />
    </div>
  );
};

export default Page;
