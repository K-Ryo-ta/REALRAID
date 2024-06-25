import React from "react";
import { useDroppable } from "@dnd-kit/core";
import styles from "../styles/answerArea.module.css";

type DroppableProps = {
  children: React.ReactNode;
  id?: string;
};

export const Droppable = (props: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div ref={setNodeRef} className={styles.container}>
      {props.children}
    </div>
  );
};
