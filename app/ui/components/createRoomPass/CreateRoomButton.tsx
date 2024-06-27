"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { teampasswordState, usernameState, isCreatorState } from "@/app/states";
import useCreateRoom from "@/app/lib/useCreateRoom";
import { db } from "@/app/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { teamnameState } from "@/app/states";
import style from "../../../room_create/Page.module.css";

const CreateRoomButton = () => {
  const router = useRouter();
  const teampassword = useRecoilValue(teampasswordState);
  const username = useRecoilValue(usernameState);
  const [error, setError] = useState<string | null>(null);
  const { createRoom, RoomManagement } = useCreateRoom();
  const [, setIsCreator] = useRecoilState(isCreatorState);
  const teamname = useRecoilValue(teamnameState);

  const handleClick = async () => {
    if (!teampassword || !username) {
      setError("パスワードとユーザー名を入力してください");
      return;
    }

    try {
      await createRoom(teampassword, username, teamname);
      setIsCreator(true); // 作成者として設定
      router.push(`join_members`);
    } catch (err) {
      console.error("部屋の作成に失敗しました", err);
      setError("部屋の作成に失敗しました");
    }
  };

  return (
    <div className={style.button}>
      {error && <p>{error}</p>}
      <button onClick={handleClick}>部屋を作成</button>
    </div>
  );
};

export default CreateRoomButton;
