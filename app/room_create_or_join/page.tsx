import React from "react";
import styles from "./Page.module.css";
import CreateRoomRootButton from "../ui/components/CreateRoomRootButton";
import JoinRoomRootButton from "../ui/components/JoinRoomRootButton";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background_large}>
        {/* <p className={styles.p}>◾️◾️◾️ GAME START ◾️◾️◾️</p> */}

        <CreateRoomRootButton />
        <JoinRoomRootButton />
      </div>
    </div>
  );
};

export default Page;
