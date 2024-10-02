"use client";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  rectIntersection,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import AnswerColumn from "../answer/AnswerColumn";
import UsableCharacterColumn from "./UsableCharacterColumn";
import { useRecoilState } from "recoil";
import { teampasswordState } from "@/app/states";

const INITIAL_USABLE_ITEMS = [
  { id: "usable-1", content: "1" },
  { id: "usable-2", content: "2" },
  { id: "usable-3", content: "3" },
  { id: "usable-4", content: "4" },
  { id: "usable-5", content: "5" },
  { id: "usable-6", content: "6" },
  { id: "usable-7", content: "7" },
  { id: "usable-8", content: "8" },
  { id: "usable-9", content: "9" },
  { id: "usable-0", content: "0" },
];

const CreateRoomPass = () => {
  const [answerItems, setAnswerItems] = useState<
    { id: string; content: string }[]
  >([]);
  const [teampassword, setTeampassword] =
    useRecoilState<string>(teampasswordState);
  const [usableItems, setUsableItems] = useState(INITIAL_USABLE_ITEMS);

  useEffect(() => {
    const answeredItems = answerItems.map((item) => item.content);
    const passPhrase = answeredItems.reduce(
      (arr, character) => arr + character,
      ""
    );
    setTeampassword(passPhrase);
  }, [answerItems, setTeampassword]);

  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;

    if (
      active.data.current?.type === "usable-item" &&
      over &&
      over.id === "answer-column"
    ) {
      if (!answerItems.find((item) => item.id === active.id)) {
        setAnswerItems((items) => [
          ...items,
          { id: active.id, content: active.data.current.content },
        ]);
        setUsableItems((items) =>
          items.filter((item) => item.id !== active.id)
        );
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
        setUsableItems((items) =>
          [...items, item].sort(
            (a, b) =>
              INITIAL_USABLE_ITEMS.findIndex(
                (fixedItem) => fixedItem.id === a.id
              ) -
              INITIAL_USABLE_ITEMS.findIndex(
                (fixedItem) => fixedItem.id === b.id
              )
          )
        );
      }
    }
  };

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <h2>作成したパスワード: {teampassword}</h2>
        <AnswerColumn
          id="answer-column"
          items={answerItems}
          setItems={setAnswerItems}
        />
        <UsableCharacterColumn items={usableItems} />
      </div>
    </DndContext>
  );
};

export default CreateRoomPass;
