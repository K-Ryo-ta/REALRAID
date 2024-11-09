import React from "react";
import GameStartButton from "../ui/components/GameStartButton";
import CorrectList from "../ui/components/CorrectList";
import styles from "./Page.module.css";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <h1 className={styles.h1}>正解の一部を紹介！！</h1>
        <CorrectList />
        <GameStartButton />
      </div>
    </div>
  );
};

export default page;
