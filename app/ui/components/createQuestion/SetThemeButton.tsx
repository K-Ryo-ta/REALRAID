"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { teampasswordState, usernameState, isCreatorState } from "@/app/states";
import styles from "../../join_members/Page.module.css";
import { supabase, updateTeamStatus } from "@/app/lib/supabase";

const SetThemeButton: React.FC = () => {
  const router = useRouter();
  const teampassword = useRecoilValue(teampasswordState);
  const username = useRecoilValue(usernameState);
  const isCreator = useRecoilValue(isCreatorState);

  useEffect(() => {
    if (!teampassword) return;
    console.log("teampassword", teampassword);
    const stautsSubscription = supabase
      .channel(`team_set_theme_${teampassword}`)
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
          if (payload.new.status === "setTheme") {
            router.push(`/check_theme_and_answer`);
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
        window.alert("部屋の作成者のみが問題テーマを入力できます");
      }
      return;
    }

    try {
      // const roomRef = doc(db, "rooms", teampassword);
      // await updateDoc(roomRef, { status: "started" });
      //ここでsupabaseのstatusをstartedにする。
      await updateTeamStatus(teampassword, "setTheme");
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
      問題テーマを決定
    </button>
  );
};

export default SetThemeButton;
