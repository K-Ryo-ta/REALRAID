'use client'; 
import React from 'react'
import styles from '../../room_create/Page.module.css'
import { useRouter } from 'next/navigation'


const CreateRoomButton = () => {
	const router = useRouter();
	const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault()
			console.log('Create Room')
			router.push('./join_members')
	};
  return (
    <div>
        <button onClick={(e) => handleButtonClick(e)} className={styles.button}>
            作成
        </button>
    </div>
  )
}

export default CreateRoomButton
