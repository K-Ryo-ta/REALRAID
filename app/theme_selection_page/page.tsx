import React from "react";
import CreateQuestion from "../ui/components/createQuestion/CreateQuestion";
import styles from "./Page.module.css";

const page = () => {
  return (
    <div className={styles.container}>
      <CreateQuestion />
    </div>
  );
};

export default page;
