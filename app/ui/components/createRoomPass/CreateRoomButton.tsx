"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  teampasswordState,
  usernameState,
  isCreatorState,
  userIdState,
  userListState,
} from "@/app/states";
import { db } from "@/app/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { teamnameState } from "@/app/states";
import style from "../../../room_create/Page.module.css";
import { insertTeamInfo } from "@/app/lib/supabase";

const CreateRoomButton = () => {
  const router = useRouter();
  const teampassword = useRecoilValue(teampasswordState);
  const username = useRecoilValue(usernameState);
  const [error, setError] = useState<string | null>(null);
  const [, setIsCreator] = useRecoilState(isCreatorState);
  const teamname = useRecoilValue(teamnameState);
  const host_id = useRecoilValue(userIdState);
  const [userList, setUserList] = useRecoilState<string[]>(userListState);

  const handleClick = async () => {
    if (!teampassword || !username) {
      setError("パスワードとユーザー名を入力してください");
      return;
    }

    try {
      await insertTeamInfo(
        teampassword,
        host_id,
        teamname,
        username,
        "waiting"
      );
      setIsCreator(true); // 作成者として設定
      const hostList = [username];
      setUserList(hostList);
      router.push(`join_members`);
    } catch (err) {
      console.log("部屋の作成に失敗しました", err);
      setError(
        "部屋の作成に失敗しました。すでに存在するパスワードの可能性があります。"
      );
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
