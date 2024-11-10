"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  teampasswordState,
  usernameState,
  correctCountState,
} from "@/app/states";
import { resultState } from "@/app/states";
import { addParticipant, getCorrectDB, supabase } from "@/app/lib/supabase";

interface Participant {
  name: string;
  correct_count: number;
}

const Result = () => {
  const [answer, setAnswer] = useState<string>("");
  const teampassword = useRecoilValue(teampasswordState);
  const username = useRecoilValue(usernameState);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useRecoilState(resultState);
  const correct_result = useRecoilValue(resultState);
  const correct_count = useRecoilValue(correctCountState);
  const [loading, setLoading] = useState(true);
  const [userRanking, setUserRanking] = useState<Participant[]>([]); // 型を指定

  const getCorrect = async () => {
    try {
      const correct = await getCorrectDB(teampassword);
      if (correct) {
        setResult(correct);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      setError("正解数を取得できませんでした。");
    }
  };
  getCorrect();

  useEffect(() => {
    setLoading(true);
    const addParticipantfunc = async (
      teampassword: string,
      participant: Participant
    ) => {
      await addParticipant(teampassword, {
        name: username,
        correct_count: correct_count,
      });
    };
    addParticipantfunc(teampassword, {
      name: username,
      correct_count: correct_count,
    });

    const stautsSubscription = supabase
      .channel(`team_ranking_${teampassword}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Teams",
          filter: `team_id=eq.${teampassword}`,
        },
        (payload) => {
          console.log("payload status", payload.new.participants);
          setUserRanking(payload.new.participants);
        }
      )
      .subscribe();
    setLoading(false);
    console.log("subscription", stautsSubscription);
    return () => {
      stautsSubscription.unsubscribe();
    };
  }, [teampassword]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 正解数順にソート
  const sortedRanking = [...userRanking].sort(
    (a, b) => b.correct_count - a.correct_count
  );

  return (
    <div>
      <p>
        チーム正解数：<span className="correct_span">{correct_result}</span>
      </p>
      <h3>チーム内ランキング</h3>
      <ul>
        {sortedRanking.map((user, index) => (
          <li key={index}>
            {index + 1}位: {user.name} - 正解数: {user.correct_count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
