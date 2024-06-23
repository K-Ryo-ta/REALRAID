'use client';
import React from 'react'
import { useState } from 'react';
import styles from '../../room_join/Page.module.css'

const InputTeampassword = () => {
	const [teampassword, setTeampassword] = useState<string>('');
	console.log('teampassword', teampassword);
  return (
    <div>
        <input 
					type="text" 
					placeholder="チームパスワード"
					value={teampassword}
					onChange={(e) => setTeampassword(e.target.value)}
					className={styles.input}
        />
    </div>
  )
}

export default InputTeampassword
