"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { teampasswordState, usernameState, isCreatorState } from "@/app/states";
import { db } from "@/app/lib/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import styles from "../../join_members/Page.module.css";

const GameStartButton: React.FC = () => {
  const router = useRouter();
  const teampassword = useRecoilValue(teampasswordState);
  const username = useRecoilValue(usernameState);
  const isCreator = useRecoilValue(isCreatorState);

  useEffect(() => {
    if (!teampassword) return;

    const roomRef = doc(db, "rooms", teampassword);
    const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data && data.status === "started") {
        router.push(`/answer`);
      }
    });

    return () => unsubscribe();
  }, [teampassword, router]);

  const handleClick = async () => {
    if (!teampassword || !username || !isCreator) {
      if (!isCreator) {
        window.alert("部屋の作成者のみがゲームを開始できます");
      }
      return;
    }

    try {
      const roomRef = doc(db, "rooms", teampassword);
      await updateDoc(roomRef, { status: "started" });
    } catch (err) {
      console.error("ゲームの開始に失敗しました", err);
    }
  };

  if (!isCreator) {
    return null;
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      {" "}
      ゲームを開始
    </button>
  );
};

export default GameStartButton;
