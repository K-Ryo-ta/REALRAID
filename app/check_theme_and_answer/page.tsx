import React from "react";
import GameStartButton from "../ui/components/GameStartButton";
import CorrectList from "../ui/components/CorrectList";

const page = () => {
  return (
    <div>
      <h1>正解リストの一部を紹介！！</h1>
      <CorrectList />
      <GameStartButton />
    </div>
  );
};

export default page;
