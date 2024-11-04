"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSaveUserinFirebase } from "@/app/lib/userhooks";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  canSubmitState,
  roomfullState,
  teamnameState,
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

  const handleButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // teamname と username が空でないかを確認
    const canSubmitValue = Boolean(teamname && username);
    setCanSubmit(canSubmitValue);
    if (!canSubmitValue) {
      console.log("名前とチーム名を入力してください");
      return;
    }

    console.log("ボタンが押されました");

    setIsLoading(true); // ローディング状態を設定

    // const isRoomFull = await saveUser();
    try {
      // ユーザー情報をデータベースに保存
      const insertUserInfoError = await insertUserInfo(username, teamname);
      console.log("insertUserInfoError", insertUserInfoError);

      // ユーザーIDを取得
      const getUserIdErrorAndData = await getUserId(username, teamname);
      console.log("GetUsernameAndTeamnameErrorAndData", getUserIdErrorAndData);
      if (getUserIdErrorAndData.data) {
        console.log("ユーザーID", getUserIdErrorAndData.data[0].id);
        //user_idとしてrecoilで管理する
        setUserId(getUserIdErrorAndData.data[0].id);
      }

      setIsLoading(false); // ローディング状態を解除
    } catch (e) {
      console.log(e);
    }

    router.push("/room_create_or_join");

    // saveUser() の完了後に最新の roomfull の値を確認
    // if (!isRoomFull) {
    //   router.push("/room_create_or_join");
    // } else {
    //   console.log("このチームは満員です");
    // }
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
    </div>
  );
};
export default RegisterButton;
