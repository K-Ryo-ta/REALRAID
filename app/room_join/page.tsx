import React from "react";
import styles from "./Page.module.css";
import JoinRoomButton from "../ui/components/JoinRoomButton";
import InputRoomPass from "../ui/components/InputRoomPass/InputRoomPass";

const page = () => {
	return (
		<div className={styles.container}>
			<div className={styles.background_large}>
				<h1 className={styles.h1}>部屋に参加</h1>
				<p className={styles.p}>
					部屋のパスワードを
					<br />
					ドラッグ&ドロップで入力してください！
				</p>
				<InputRoomPass />
				<JoinRoomButton />
			</div>
		</div>
	);
};

export default page;
