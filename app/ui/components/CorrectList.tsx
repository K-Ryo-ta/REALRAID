"use client";
import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { teampasswordState, themeWordsState } from "@/app/states";
import { getCorrectList } from "@/app/lib/supabase";

const CorrectList: React.FC = () => {
  const [correctWordsList, setCorrectWordsList] =
    useRecoilState(themeWordsState);
  const teampassword = useRecoilValue(teampasswordState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getAndSetCorrectList = async (teampassword: string) => {
      const correctList = await getCorrectList(teampassword);
      if (correctList) {
        setCorrectWordsList(correctList);
      }
    };
    getAndSetCorrectList(teampassword);
    setLoading(false);
  }, [teampassword]);

  return (
    <div>
      <h1>CorrectList</h1>
      {correctWordsList.slice(0, 20).map((correctWord, index) => (
        <div key={index}>{correctWord}</div>
      ))}
      {loading && <p>正解リストを取得中</p>}
    </div>
  );
};

export default CorrectList;
