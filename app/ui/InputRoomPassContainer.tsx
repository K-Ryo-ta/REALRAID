import React from "react";
import DraggableCharacter from "./components/AnswerColumn";

type Props = {
  id: string;
  name: string;
};

type ItemArray = {
  items: Props[];
};

const InputRoomPass = ({ items }: ItemArray) => {
  return (
    <div style={{ padding: 50 }}>
      {items.map((item) => (
        <DraggableCharacter id={item.id} name={item.name} key={item.id} />
      ))}
    </div>
  );
};

export default InputRoomPass;
