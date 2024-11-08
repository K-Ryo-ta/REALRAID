"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../theme_selection_page/Page.module.css";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  teampasswordState,
  usernameState,
  isCreatorState,
  themeWordsState,
} from "@/app/states";
import { supabase, updateTeamStatus } from "@/app/lib/supabase";
import { ReturnThemeJSONData } from "@/app/lib/openAI";

const InputQuestionForm = () => {
  const [theme, setTheme] = useState("");
  const isCreator = useRecoilValue(isCreatorState);
  const router = useRouter();
  const teampassword = useRecoilValue(teampasswordState);
  const username = useRecoilValue(usernameState);
  const [themeWords, setThemeWords] = useRecoilState<string[]>(themeWordsState);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("テーマ:", theme);
    setTheme("");
  };

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
      setLoading(true);
      // const roomRef = doc(db, "rooms", teampassword);
      // await updateDoc(roomRef, { status: "started" });
      //ここでsupabaseのstatusをsetThemeにする。
      const themeData = await ReturnThemeJSONData(theme);
      if (!themeData) {
        console.error("テーマの取得に失敗しました");
        return;
      }
      console.log("themeData.words", themeData.words);
      setThemeWords(themeData.words);
      console.log("themeWords", themeWords);
      setLoading(false);
      await updateTeamStatus(teampassword, "setTheme");
    } catch (err) {
      console.error("ゲームの開始に失敗しました", err);
    }
  };

  if (!isCreator) {
    return (
      <div>
        <h1>Team作成者と一緒に問題テーマを相談してください。</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>お題テーマを入力</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          value={theme}
          onChange={(e) => handleInputChange(e)}
          placeholder="お題テーマを入力してください"
          className={styles.input}
        />
        <button type="submit" className={styles.button} onClick={handleClick}>
          決定
        </button>
        {loading && <p>正解リスト作成中</p>}
      </form>
    </div>
  );
};

export default InputQuestionForm;
