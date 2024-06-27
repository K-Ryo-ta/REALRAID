import React from 'react';
import styles from './Page.module.css';
import InputTeamname from "../ui/components/InputTeamname";
import InputUsername from "../ui/components/InputUsername";
import RegisterButton from '../ui/components/RegisterButton';

const page = () => {
	return (
		<div className={styles.container}>
			<div className='background_large'>
				<h1 className={styles.anm}>チーム名とおなまえ登録</h1>
				<p className={styles.font_small}>◾️◾️◾️ チーム名 ◾️◾️◾️</p>
				<InputTeamname />
				<p className={styles.font_small}>◾️◾️◾️ なまえ ◾️◾️◾️</p>
				<InputUsername />
				<RegisterButton />
			</div>
		</div>
	);
}

export default page;
