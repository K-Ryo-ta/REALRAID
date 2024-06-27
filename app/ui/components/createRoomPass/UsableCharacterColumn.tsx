import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Character from "../Character";
import style from "../../../room_create/Page.module.css";

type UsableCharacterColumnProps = {
  items: { id: string; content: string }[];
};

const UsableCharacterColumn: React.FC<UsableCharacterColumnProps> = ({
  items,
}) => {
  return (
    <div className={style.UsableCharacterColumn}>
      {items.map((item) => (
        <DraggableItem key={item.id} id={item.id} content={item.content} />
      ))}
    </div>
  );
};

const DraggableItem = ({ id, content }: { id: string; content: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { type: "usable-item", content },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    zIndex: transform ? 9999 : "auto", // ドラッグ時に要素が上に表示されるようにする
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Character>{content}</Character>
    </div>
  );
};

export default UsableCharacterColumn;
