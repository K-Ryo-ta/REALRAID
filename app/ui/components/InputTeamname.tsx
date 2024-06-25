'use client';
import React from 'react'
import styles from '../../register/Page.module.css'
import { useState } from 'react'
import { useRecoilState } from 'recoil';
import { teamnameState } from '../../states';

const InputTeamname = () => {
	const [teamname, setTeamname] = useRecoilState<string>(teamnameState);
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
