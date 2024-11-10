"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSaveUserinFirebase } from "@/app/lib/userhooks";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	canSubmitState,
	roomfullState,
	teamnameState,
	instagramIdState,
	twitterIdState,
	usernameState,
	userIdState,
} from "@/app/states";
import { getUserId, insertUserInfo } from "@/app/lib/supabase";

const RegisterButton: React.FC = () => {
	const router = useRouter();
	const saveUser = useSaveUserinFirebase();
	const roomfull = useRecoilValue(roomfullState);
	const [isLoading, setIsLoading] = useState(false);
	const [teamname, setTeamname] = useRecoilState<string>(teamnameState);
	const [username, setUsername] = useRecoilState<string>(usernameState);
	const [canSubmit, setCanSubmit] = useRecoilState<boolean>(canSubmitState);
	const [userId, setUserId] = useRecoilState<string>(userIdState);
	const [instagramId, setInstagramId] =
		useRecoilState<string>(instagramIdState);
	const [twitterId, setTwitterId] = useRecoilState<string>(twitterIdState);

	const handleButtonClick = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const canSubmitValue = Boolean(teamname && username);
		setCanSubmit(canSubmitValue);
		if (!canSubmitValue) {
			console.log("全ての情報を入力してください");
			return;
		}

		setIsLoading(true);

		try {
			const insertUserInfoError = await insertUserInfo(
				username,
				teamname,
				instagramId,
				twitterId
			);
			console.log("insertUserInfoError", insertUserInfoError);

			const getUserIdErrorAndData = await getUserId(username, teamname);
			if (getUserIdErrorAndData.data) {
				setUserId(getUserIdErrorAndData.data[0].id);
			}

			setIsLoading(false);
		} catch (e) {
			console.log(e);
		}

		router.push("/room_create_or_join");
	};

	return (
		<div>
			<button
				onClick={handleButtonClick}
				className="button_middle_background"
				disabled={isLoading}
			>
				<div className="button_middle_front">登録</div>
			</button>
			{isLoading && <p>処理中...</p>}
			{!canSubmit && <p>チーム名と名前は必須です。</p>}

			{/* 各値の表示 */}
			<div>
				<p>チーム名: {teamname}</p>
				<p>ユーザー名: {username}</p>
				<p>Instagram ID: {instagramId}</p>
				<p>Twitter ID: {twitterId}</p>
			</div>
		</div>
	);
};

export default RegisterButton;
