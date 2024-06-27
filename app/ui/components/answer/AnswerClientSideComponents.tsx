"use client";

import React, { useState } from "react";
import Timer from "../Timer";
import NameCandidates from "./NameCandidates";
import AnswerInput from "./AnswerInput";
import { useRouter } from "next/navigation";
import SendAnswerButton from "../SendAnswerButton";

const ClientSideComponents: React.FC = () => {
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const router = useRouter();

  const handleTimeUp = () => {
    setIsTimeUp(true);
    console.log("時間切れです");
    // 時間切れ時の処理をここに追加
    router.push("/result");
  };

  return (
    <div>
      <Timer onTimeUp={handleTimeUp} />
      <NameCandidates />
      <AnswerInput />
      <SendAnswerButton />
    </div>
  );
};

export default ClientSideComponents;
