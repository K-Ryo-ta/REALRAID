'use client';
import React from 'react';
import styles from '../../room_create_or_join/Page.module.css';
import { useRouter } from 'next/navigation';

const JoinRoomButton = () => {
	const router = useRouter();
  const handleButtonJoinRoom = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log('Join Room')
		router.push('./room_join')
  };

  return (
    <button onClick={(e)=>handleButtonJoinRoom(e)} className='button_large_blue'>
      <div className='background_b'>
      Join Room
      </div>
      <div className='line_b'>
      Join Room
      </div>
      
    </button>
  );
};

export default JoinRoomButton;
