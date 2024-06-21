'use client';
import React from 'react'
import styles from '../../register/Page.module.css'
import { useRouter } from 'next/navigation'

const RegisterButton = () => {
  const router = useRouter();

  const handleButtonClick = (e :React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
		console.log('ボタンが押されました');
		router.push('/room_create_or_join');
	};
  
  return (
    <div>
      <button onClick={(e) => handleButtonClick(e)} className={styles.button}>
				登録
			</button>
    </div>
  )
}

export default RegisterButton
