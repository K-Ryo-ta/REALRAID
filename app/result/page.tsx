import React from "react";
import styles from "./Page.module.css";
import RankingRootButton from "../ui/components/ranking/RankingRootButton";
import Result from "../ui/components/result/Result";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <h1 className={styles.h1}>結果</h1>
        <Result />
        <RankingRootButton />
      </div>
    </div>
  );
};

export default page;
