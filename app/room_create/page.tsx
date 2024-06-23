import React from 'react'
import CreateTeampassword from '../ui/components/CreateTeampassword'
import styles from './Page.module.css'
import CreateRoomButton from '../ui/components/CreateRoomButton'
import Teamname from '../ui/components/Teamname'

const page = () => {
  return (
    <div className={styles.container}>
			<h1>部屋の作成</h1>
      <Teamname/>
			<p>パスワードを作成してください！</p>
			<CreateTeampassword/>
			<CreateRoomButton/>
    </div>
  )
}

export default page
