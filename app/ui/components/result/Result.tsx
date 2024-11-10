"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  teampasswordState,
  usernameState,
  correctCountState,
  twitterIdState,
  instagramIdState,
  resultState,
} from "@/app/states";
import { addParticipant, getCorrectDB, supabase } from "@/app/lib/supabase";
import { FaInstagram, FaTwitter } from "react-icons/fa6";

interface Participant {
  name: string;
  correct_count: number;
  twitterID: string;
  instagramID: string;
}

const Result = () => {
  const teampassword = useRecoilValue(teampasswordState);
  const username = useRecoilValue(usernameState);
  const [result, setResult] = useRecoilState(resultState);
  const correct_result = useRecoilValue(resultState);
  const correct_count = useRecoilValue(correctCountState);
  const twitterId = useRecoilValue(twitterIdState);
  const instagramId = useRecoilValue(instagramIdState);
  const [loading, setLoading] = useState(true);
  const [userRanking, setUserRanking] = useState<Participant[]>([]);

  useEffect(() => {
    const getCorrect = async () => {
      try {
        const correct = await getCorrectDB(teampassword);
        if (correct) {
          setResult(correct);
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      } finally {
        setLoading(false);
      }
    };

    getCorrect();
  }, [teampassword, setResult]);

  useEffect(() => {
    setLoading(true);
    // ランダムな遅延時間を生成
    const delay = Math.floor(Math.random() * 5 + 1) * 1000;

    const addParticipantfunc = async () => {
      await addParticipant(teampassword, {
        name: username,
        correct_count: correct_count,
        twitterID: twitterId,
        instagramID: instagramId,
      });
    };

    // 遅延を入れてaddParticipantfuncを呼び出す
    const timer = setTimeout(() => {
      addParticipantfunc();
    }, delay);

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

    return () => {
      clearTimeout(timer); // タイマーをクリア
      stautsSubscription.unsubscribe(); // サブスクリプションを解除
    };
  }, [teampassword, username, correct_count, twitterId, instagramId]);

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
            <br />
            <a
              href={user.twitterID ? `https://x.com/${user.twitterID}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={30} color={user.twitterID ? "black" : "gray"} />
            </a>
            Twitter ID: {user.twitterID || "なし"}
            <br />
            <a
              href={
                user.instagramID
                  ? `https://instagram.com/${user.instagramID}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                size={30}
                color={user.instagramID ? "black" : "gray"}
              />
            </a>
            Instagram ID: {user.instagramID || "なし"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
