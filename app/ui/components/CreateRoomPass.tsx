"use client";
import React, { useState } from "react";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import AnswerColumn from "./AnswerColumn";
import UsableCharacterColumn from "./UsableCharacterColumn";

const INITIAL_FIXED_ITEMS = [
  { id: "fixed-1", content: "1" },
  { id: "fixed-2", content: "し" },
  { id: "fixed-3", content: "か" },
  { id: "fixed-4", content: "わ" },
  { id: "fixed-5", content: "ま" },
  { id: "fixed-6", content: "さ" },
  { id: "fixed-7", content: "や" },
];

const CreateRoomPass = () => {
  const [answerItems, setAnswerItems] = useState<
    { id: string; content: string }[]
  >([]);
  const [fixedItems, setFixedItems] = useState(INITIAL_FIXED_ITEMS);

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;

    if (
      active.data.current?.type === "fixed-item" &&
      over &&
      over.id === "answer-column"
    ) {
      if (!answerItems.find((item) => item.id === active.id)) {
        setAnswerItems((items) => [
          ...items,
          { id: active.id, content: active.data.current.content },
        ]);
        setFixedItems((items) => items.filter((item) => item.id !== active.id));
      }
    } else if (over && active.id !== over.id) {
      const oldIndex = answerItems.findIndex((item) => item.id === active.id);
      const newIndex = answerItems.findIndex((item) => item.id === over.id);
      setAnswerItems((items) => arrayMove(items, oldIndex, newIndex));
    } else if (!over) {
      const item = answerItems.find((item) => item.id === active.id);
      if (item) {
        setAnswerItems((items) =>
          items.filter((item) => item.id !== active.id)
        );
        setFixedItems((items) =>
          [...items, item].sort(
            (a, b) =>
              INITIAL_FIXED_ITEMS.findIndex(
                (fixedItem) => fixedItem.id === a.id
              ) -
              INITIAL_FIXED_ITEMS.findIndex(
                (fixedItem) => fixedItem.id === b.id
              )
          )
        );
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={rectIntersection}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <h2>DnDで文字を入れる並び替えあり</h2>
        <AnswerColumn
          id="answer-column"
          items={answerItems}
          setItems={setAnswerItems}
        />

        <h2>名前が一文字づつ入るここは並び替えなし</h2>
        <UsableCharacterColumn items={fixedItems} />
      </div>
    </DndContext>
  );
};

export default CreateRoomPass;
