'use client';
import React, { useState } from 'react';
import styles from '../../register/Page.module.css';
import { useRouter } from 'next/navigation';
import { useSaveUserinFirebase } from '@/app/lib/userhooks';
import { useRecoilValue } from 'recoil';
import { roomfullState } from '@/app/states';

const RegisterButton: React.FC = () => {
  const router = useRouter();
  const saveUser = useSaveUserinFirebase();
  const roomfull = useRecoilValue(roomfullState);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('ボタンが押されました');
    setIsLoading(true); // ローディング状態を設定

    const isRoomFull = await saveUser();
    setIsLoading(false); // ローディング状態を解除

    // saveUser() の完了後に最新の roomfull の値を確認
    if (!isRoomFull) {
      router.push('/room_create_or_join');
    } else {
      console.log('このチームは満員です');
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} className='button_middle_background' disabled={isLoading}>
        <div className='button_middle_front'>
          登録
        </div>
      </button>
      {isLoading && <p>処理中...</p>}
    </div>
  );
};

export default RegisterButton;
