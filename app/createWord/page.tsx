"use client";
import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
};

const SortableList = () => {
  const [items, setItems] = useState([
    "よ",
    "し",
    "か",
    "わ",
    "ま",
    "さ",
    "や",
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);

        // 並び替え後の配列をコンソールに出力
        console.log("Sorted array:", newArray);

        return newArray;
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item} id={item}>
            <div
              style={{
                padding: "8px",
                border: "1px solid black",
                margin: "4px",
                backgroundColor: "lightgray",
              }}
            >
              {item}
            </div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};

const App = () => (
  <div>
    <h1>ドラッグアンドドロップで並び替え</h1>
    <SortableList />
  </div>
);

export default App;
