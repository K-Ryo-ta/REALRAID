'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import styles from '../../answer/Page.module.css';

const SendAnswerButton = () => {
    const router = useRouter();
    const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log("送信ボタンが押されました")
        router.push('/result')
    }
  return (
    <div>
        <button onClick={(e)=>handleClick(e)} className={styles.button}>送信</button>
    </div>
  )
}

export default SendAnswerButton
