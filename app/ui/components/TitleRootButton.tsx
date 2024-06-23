'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import styles from '../../ranking/Page.module.css'

const TitleRootButton = () => {
	const router = useRouter();
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			console.log('clicked');
			router.push('/register')
	}
  return (
		<div>
				<button onClick={(e)=>handleClick(e)} className={styles.button}>Titleへ</button>
		</div>
  )
}

export default TitleRootButton