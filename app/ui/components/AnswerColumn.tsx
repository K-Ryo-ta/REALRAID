import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Character from "./Character";
import style from "../../room_create/Page.module.css";

type AnswerColumnProps = {
  id: string;
  items: { id: string; content: string }[];
  setItems: (items: { id: string; content: string }[]) => void;
};

const AnswerColumn: React.FC<AnswerColumnProps> = ({ id, items }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <SortableContext items={items.map((item) => item.id)}>
      <div
        ref={setNodeRef}
        style={{
          backgroundColor: isOver ? "lightgreen" : "white",
        }}
        className={style.answerColumn}
      >
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id} content={item.content} />
        ))}
      </div>
    </SortableContext>
  );
};

const SortableItem = ({ id, content }: { id: string; content: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 9999 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Character>{content}</Character>
    </div>
  );
};

export default AnswerColumn;
