'use client';
import React from 'react'
import { useState } from 'react';
import styles from '../../room_create/Page.module.css'
import { useRecoilState } from 'recoil';
import { teampasswordState } from '../../states';

const CreateTeampassword = () => {
	const [teampassword, setTeampassword] = useRecoilState<string>(teampasswordState);
	
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

export default CreateTeampassword
