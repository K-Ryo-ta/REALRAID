'use client';
import React from 'react';
import styles from '../../register/Page.module.css';
import { useRouter } from 'next/navigation';
import { useSaveUserinFirebase } from '@/app/lib/userfunction';

const RegisterButton: React.FC = () => {
  const router = useRouter();
  const saveUser = useSaveUserinFirebase();

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('ボタンが押されました');
    await saveUser();
    router.push('/room_create_or_join');
  };

  return (
    <div>
      <button onClick={handleButtonClick} className={styles.button}>
        登録
      </button>
    </div>
  );
};

export default RegisterButton;
