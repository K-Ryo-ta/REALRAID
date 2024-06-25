import {
  DndContext,
  UniqueIdentifier,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragStartEvent,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { Attributes, use, useCallback } from "react";

// リソースの型
type Item = {
  id: UniqueIdentifier;
  text: string;
};

export const MyDraggableList = (items: Item[]) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const onDragStart = useCallback((e: DragEndEvent) => {
    const { active, over } = e;
  }, []);
  const onDragEnd = useCallback((e: DragEndEvent) => {
    const { active, over } = e;
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <ul>
          {items.map((item) => {
            return <MyDraggableItem item={item} key={item.id} />;
          })}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export const MyDraggableItem = ({ item }: { item: Item }) => {
  const { setNodeRef, attributes, listeners } = useSortable({ id: item.id });

  return (
    <li ref={setNodeRef} {...attributes} {...listeners}>
      {item.id}
    </li>
  );
};
