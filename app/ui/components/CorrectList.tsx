"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { themeWordsState } from "@/app/states";

const CorrectList: React.FC = () => {
  const correctWordsList = useRecoilValue(themeWordsState);
  return (
    <div>
      <h1>CorrectList</h1>
      {correctWordsList.slice(0, 20).map((correctWord, index) => (
        <div key={index}>{correctWord}</div>
      ))}
    </div>
  );
};

export default CorrectList;
