'use client';
import React from 'react'
import styles from '../../register/Page.module.css'
import { useState } from 'react'
import { useRecoilState } from 'recoil';
import { usernameState } from '../../states';

const InputUsername = () => {
	const [username, setUsername] = useRecoilState<string>(usernameState);
	console.log('username', username);
	return (
		<div>
			<input 
				type="text" 
				value={username} 
				onChange={(e) => setUsername(e.target.value)}
				placeholder="なまえ"
				className={styles.input}
				/>
		</div>
	)
}   

export default InputUsername
