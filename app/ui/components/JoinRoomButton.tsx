'use client';
import React from 'react'
import styles from '../../room_join/Page.module.css'
import { useRouter } from 'next/navigation'

const JoinRoomButton = () => {
	const router = useRouter();
	const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault()
			console.log('Join Room')
			router.push('./join_members')
	}
  return (
    <div>
			<button onClick={(e)=>handleClick(e)} className={styles.button}>
					参加
			</button>
    </div>
  )
}

export default JoinRoomButton
