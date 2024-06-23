import React from 'react'
import styles from './Page.module.css'
import GameStartButton from '../ui/components/GameStartButton'

const page = () => {
  return (
    <div className={styles.container}>
			<h1>参加者一覧</h1>
			<p>参加者の名前を表示</p>
			<GameStartButton/>
			
    </div>
  )
}

export default page
