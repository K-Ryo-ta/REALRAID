import React from "react";
import styles from "../styles/char.module.css";
import { useDraggable } from "@dnd-kit/core";

type CharProps = {
  char: string;
  id?: string | number;
};

const Char = ({ char, id }: CharProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      className={styles.charContainer}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {char}
    </div>
  );
};

export default Char;
