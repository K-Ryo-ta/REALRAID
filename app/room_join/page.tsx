import React from 'react'
import InputTeampassword from '../ui/components/InputTeamPassword'
import styles from './Page.module.css'
import JoinRoomButton from '../ui/components/JoinRoomButton'

const page = () => {
  return (
    <div className={styles.container}>
      <h1>部屋に参加</h1>
      <p>部屋のパスワードを入力してください</p>
      <InputTeampassword />
      <JoinRoomButton />
    </div>
  )
}

export default page
