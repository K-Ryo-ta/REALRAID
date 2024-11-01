"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../../result/Page.module.css";

const RankingRootButton = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("ランキングを表示");
    router.push("/ranking");
  };
  return (
    <div>
      <button onClick={(e) => handleClick(e)} className={styles.button}>
        ランキングを表示
      </button>
    </div>
  );
};

export default RankingRootButton;
