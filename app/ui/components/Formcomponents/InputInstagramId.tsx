"use client";
import React from "react";
import styles from "../../../register/Page.module.css";
import { useRecoilState } from "recoil";
import { instagramIdState } from "../../../states";

const InputInstagramId = () => {
	const [instagramId, setInstagramId] =
		useRecoilState<string>(instagramIdState);
	console.log("instagramId", instagramId);
	return (
		<div>
			<input
				type="text"
				value={instagramId}
				onChange={(e) => setInstagramId(e.target.value)}
				placeholder="Instagram ID"
				className={styles.input}
			/>
		</div>
	);
};

export default InputInstagramId;
