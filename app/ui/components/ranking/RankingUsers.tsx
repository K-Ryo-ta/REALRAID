import React from "react";
import styles from "../../result/Page.module.css";

const RankingUsers = ({
  rank,
  teamname,
  corrects,
  users,
}: {
  rank: number;
  teamname: string;
  corrects: number;
  users: string[];
}) => {
  return (
    <div className={styles.rankingusers}>
      <div className={styles.rank}>{rank}</div>
      <div className={styles.teamname}>{teamname}</div>
      <div className={styles.corrects}>{corrects}</div>

      {/* {users.map((user, index) => { console.log(index); return index < 5 ? <p>{user}</p> : null; })} */}
    </div>
  );
};

export default RankingUsers;
