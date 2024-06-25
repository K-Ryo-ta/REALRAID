import React from "react";
import styles from "../styles/charArea.module.css";
import Char from "./Char";
import { useDroppable } from "@dnd-kit/core";

type CharAreaProps = { children: React.ReactNode; id?: string };

const CharArea = ({ children }: CharAreaProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "charArea",
  });
  return (
    <div ref={setNodeRef} className={styles.container}>
      {children}
    </div>
  );
};

export default CharArea;
