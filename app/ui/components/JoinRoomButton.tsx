"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { teampasswordState, usernameState, isCreatorState } from "@/app/states";
import { db } from "@/app/lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const JoinRoomButton: React.FC = () => {
  const router = useRouter();
  const teampassword = useRecoilValue(teampasswordState);
  const username = useRecoilValue(usernameState);
  const setIsCreator = useSetRecoilState(isCreatorState);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!teampassword || !username) {
      setError("パスワードとユーザー名を入力してください");
      return;
    }

    try {
      const roomRef = doc(db, "rooms", teampassword);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        await updateDoc(roomRef, {
          users: roomSnap.data().users
            ? [...roomSnap.data().users, username]
            : [username],
        });
        setIsCreator(false); // 参加者として設定
        router.push(`join_members`);
      } else {
        setError("部屋が存在しません");
      }
    } catch (err) {
      console.error("部屋の参加に失敗しました", err);
      setError("部屋の参加に失敗しました");
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={handleClick} className="button_middle_background">
        <div className="button_middle_front">部屋に参加</div>
      </button>
    </div>
  );
};

export default JoinRoomButton;
