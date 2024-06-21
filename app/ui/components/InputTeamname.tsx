'use client';
import React from 'react'
import styles from '../../register/Page.module.css'
import { useState } from 'react'

const InputTeamname = () => {
	const [teamname, setTeamname] = useState<string>('');
	console.log('teamname', teamname);
  return (
    <div>
			<input 
				type="text" 
				value={teamname} 
				onChange={(e) => setTeamname(e.target.value)}
				placeholder="チーム名"
				className={styles.input}
			/>
		</div>
  )
}

export default InputTeamname
