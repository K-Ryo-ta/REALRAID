'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../register/Page.module.css';
import { useRouter } from 'next/navigation';
import { useSaveUserinFirebase } from '@/app/lib/userhooks';
import { useRecoilValue, useRecoilState } from 'recoil';
import { roomfullState } from '@/app/states';

const RegisterButton: React.FC = () => {
  const router = useRouter();
  const saveUser = useSaveUserinFirebase();
  const [roomfull, setRoomfull] = useRecoilState(roomfullState);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('ボタンが押されました');
    setIsLoading(true); // ローディング状態を設定
    await saveUser();
    console.log('roomfull after saveUser:', roomfull); // デバッグ情報追加
    // 状態が更新された後に画面遷移を行う
    setIsLoading(false);
    const routerfunc = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (roomfull === false) {
        router.push('/room_create_or_join');
      } else {
        router.push('/register');
      }
    }
    routerfunc(e);
  };

  return (
    <div>
      <button onClick={handleButtonClick} className={styles.button} disabled={isLoading}>
        登録
      </button>
      {isLoading && <p>処理中...</p>}
    </div>
  );
};

export default RegisterButton;
