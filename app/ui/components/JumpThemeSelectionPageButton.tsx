"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { teampasswordState, usernameState, isCreatorState } from "@/app/states";
import styles from "../../join_members/Page.module.css";
import { supabase, updateTeamStatus } from "@/app/lib/supabase";

const JumpThemeSelectionPageButton: React.FC = () => {
  const router = useRouter();
  const teampassword = useRecoilValue(teampasswordState);
  const username = useRecoilValue(usernameState);
  const isCreator = useRecoilValue(isCreatorState);

  useEffect(() => {
    if (!teampassword) return;
    console.log("teampassword", teampassword);
    const stautsSubscription = supabase
      .channel(`team_game_start_${teampassword}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Teams",
          filter: `team_id=eq.${teampassword}`,
        },
        (payload) => {
          console.log("payload status", payload.new.status);
          if (payload.new.status === "thinking_theme") {
            router.push(`/theme_selection_page`);
          }
        }
      )
      .subscribe();
    console.log("subscription", stautsSubscription);
    // クリーンアップ関数
    return () => {
      stautsSubscription.unsubscribe();
    };

    // const roomRef = doc(db, "rooms", teampassword);
    // const unsubscribe = onSnapshot(roomRef, (docSnapshot) => {
    //   const data = docSnapshot.data();
    //   if (data && data.status === "started") {
    //     router.push(`/answer`);
    //   }
    // });

    // return () => unsubscribe();
  }, [teampassword, router]);

  const handleClick = async () => {
    if (!teampassword || !username || !isCreator) {
      if (!isCreator) {
        window.alert("部屋の作成者のみがゲームを開始できます");
      }
      return;
    }

    try {
      // const roomRef = doc(db, "rooms", teampassword);
      // await updateDoc(roomRef, { status: "started" });
      //ここでsupabaseのstatusをstartedにする。
      await updateTeamStatus(teampassword, "thinking_theme");
    } catch (err) {
      console.error("問題テーマを考える画面に遷移できませんでした。", err);
    }
  };

  if (!isCreator) {
    return null;
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      {" "}
      問題テーマの設定をしよう！
    </button>
  );
};

export default JumpThemeSelectionPageButton;
