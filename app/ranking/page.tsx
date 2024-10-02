import React from "react";
import TitleRootButton from "../ui/components/TitleRootButton";
import styles from "./Page.module.css";
import Ranking from "../ui/components/ranking/Ranking";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <h1 className={styles.h1}>👑👑 ランキング 👑👑</h1>
        <Ranking />
        <TitleRootButton />
      </div>
    </div>
  );
};

export default page;
