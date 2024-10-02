"use client";
import React, { use, useState } from "react";
import { animaldata } from "../../data";
import { db } from "@/app/lib/firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { teampasswordState } from "@/app/states";
import useCreateRoom from "@/app/lib/useCreateRoom";
import { resultState } from "@/app/states";

const Result = () => {
  const [answer, setAnswer] = useState<string>("");
  const teampassword = useRecoilValue(teampasswordState);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useRecoilState(resultState);
  const correct_result = useRecoilValue(resultState);

  const getCorrect = async () => {
    const roomsRef = doc(collection(db, "rooms"), teampassword);
    try {
      const docSnapshot = await getDoc(roomsRef);
      const data = docSnapshot.data();
      if (data) {
        setResult(data.correct);
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      setError("部屋の更新中にエラーが発生しました");
    }
  };
  getCorrect();

  return (
    <div>
      <p>
        正解数：<span className="correct_span">{correct_result}</span>
      </p>
    </div>
  );
};

export default Result;
