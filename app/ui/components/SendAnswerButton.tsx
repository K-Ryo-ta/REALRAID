"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../answer/Page.module.css";

const SendAnswerButton = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("送信ボタンが押されました");
    router.push("/result");
  };
  return (
    <div className="button_middle_background">
      <button onClick={(e) => handleClick(e)} className="button_middle_front">
        回答を終了
      </button>
    </div>
  );
};

export default SendAnswerButton;
