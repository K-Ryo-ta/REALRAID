'use client';
import React from 'react'
import { useState } from 'react';
import styles from '../../room_create/Page.module.css'

const InputTeampassword = () => {
	const [teampassword, setTeampassword] = useState<string>('');
	
  return (
    <div>
			<input 
				type="text" 
				value={teampassword} 
				onChange={(e) => setTeampassword(e.target.value)}
				placeholder="チームパスワード"
				className={styles.input}
			/>
    </div>
  )
}

export default InputTeampassword
