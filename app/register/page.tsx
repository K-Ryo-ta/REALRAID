import React from 'react';
import styles from './Page.module.css';
import InputTeamname from "../ui/components/InputTeamname";
import InputUsername from "../ui/components/InputUsername";
import RegisterButton from '../ui/components/RegisterButton';

const page = () => {
	return (
		<div className={styles.container}>
			<h1>チーム名とおなまえ登録</h1>
			<InputTeamname />
			<InputUsername />
			<RegisterButton />
		</div>
	);
}

export default page;
