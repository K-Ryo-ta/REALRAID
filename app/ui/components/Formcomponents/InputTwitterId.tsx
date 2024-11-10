"use client";
import React from "react";
import styles from "../../../register/Page.module.css";
import { useRecoilState } from "recoil";
import { twitterIdState } from "../../../states";

const InputTwitterId = () => {
	const [twitterId, setTwitterId] = useRecoilState<string>(twitterIdState);
	console.log("twitterId", twitterId);
	return (
		<div>
			<input
				type="text"
				value={twitterId}
				onChange={(e) => setTwitterId(e.target.value)}
				placeholder="Twitter ID"
				className={styles.input}
			/>
		</div>
	);
};

export default InputTwitterId;
