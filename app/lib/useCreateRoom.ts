"use client";
import { useState } from "react";
import { db } from "./firebase";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { teampasswordState } from "../states";

const useCreateRoom = () => {
  const teampassword = useRecoilValue(teampasswordState);
  const [error, setError] = useState<string>("");
  const [roomStatus, setRoomStatus] = useState<string>("");
  const [numPeople, setNumPeople] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const RoomManagement = (roomId: string) => {
    const roomsRef = doc(collection(db, "rooms"), roomId);
    // リアルタイムで部屋を更新します。
    onSnapshot(roomsRef, (querySnapshot) => {
      const data = querySnapshot.data();
      setRoomStatus(data?.status || "");
      if (!data) return;
      if (Number(data.users.length) !== 4) return;
      if (data.status !== "playing") return;
      setLoading(false);
    });
  };

  const createRoom = async (
    teampassword: string,
    username: string,
    teamname: string
  ) => {
    console.log("Create Room");
    if (!teampassword) {
      setError("パスワードを入力してください");
      return;
    }
    const roomRef = doc(db, "rooms", teampassword);
    await setDoc(roomRef, {
      teamname: teamname,
      users: [username],
      status: "waiting",
      creator: username,
      correct: 0,
    });
    // RoomManagementをここで呼び出す
    RoomManagement(teampassword);
  };

  return { createRoom, RoomManagement, error };
};

export default useCreateRoom;
