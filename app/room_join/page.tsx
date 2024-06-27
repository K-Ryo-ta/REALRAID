import React from 'react'
import InputTeampassword from '../ui/components/InputTeamPassword'
import styles from './Page.module.css'
import JoinRoomButton from '../ui/components/JoinRoomButton'

const page = () => {
  return (
    <div className={styles.container}>
      <div className='background_large'>
        <h1 className={styles.h1}>部屋に参加</h1>
        <p className={styles.p}>部屋のパスワードを入力してください</p>
        <InputTeampassword />
        <JoinRoomButton />
      </div>
    </div>
  )
}

export default page