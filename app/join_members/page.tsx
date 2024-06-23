import React from 'react'
import styles from './Page.module.css'
import GameStartButton from '../ui/components/GameStartButton'
import UserList from '../ui/components/UserList'

const page = () => {
  return (
    <div className={styles.container}>
			<h1>参加者一覧</h1>
			<UserList/>
			<GameStartButton/>
    </div>
  )
}

export default page
