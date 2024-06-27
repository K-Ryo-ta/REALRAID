import React from "react";
import InputTeampassword from "../ui/components/InputTeamPassword";
import styles from "./Page.module.css";
import JoinRoomButton from "../ui/components/JoinRoomButton";
import InputRoomPass from "../ui/components/InputRoomPass/InputRoomPass";

const page = () => {
  return (
    <div className={styles.container}>
      <h1>部屋に参加</h1>
      <p>部屋のパスワードを入力してください</p>

      <InputRoomPass />
      <JoinRoomButton />
    </div>
  );
};

export default page;
