import React from "react";
import { useDroppable } from "@dnd-kit/core";
import styles from "../styles/answerArea.module.css";

type AnswerAreaProps = {
  children: React.ReactNode;
  id?: string;
};

const AnswerArea = ({ children }: AnswerAreaProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "answerArea",
  });

  return (
    <div ref={setNodeRef} className={styles.container}>
      {children}
    </div>
  );
};

export default AnswerArea;
