'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import styles from '../../join_members/Page.module.css';


const GameStartButton = () => {
	const router = useRouter();
	const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		console.log('ゲームスタート')
		e.preventDefault()
		router.push('/answer')
	}
  return (
    <div>
      <button onClick={(e => handleClick(e))} className={styles.button}>ゲームスタート</button>
    </div>
  )
}

export default GameStartButton
