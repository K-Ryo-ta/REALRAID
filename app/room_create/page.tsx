import React from "react";
import CreateTeampassword from "../ui/components/CreateTeampassword";
import styles from "./Page.module.css";
import CreateRoomButton from "../ui/components/createRoomPass/CreateRoomButton";
import Teamname from "../ui/components/Teamname";
// import RoomPassArea from "../ui/InputRoomPass";
// import CharactersArea from "../ui/CharactersArea";
import CreateRoomPass from "../ui/components/createRoomPass/CreateRoomPass";

const page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>部屋の作成</h1>
      <Teamname />

      <CreateRoomPass />
      <CreateRoomButton />
    </div>
  );
};

export default page;
