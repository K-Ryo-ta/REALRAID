'use client';
import { useState,useEffect } from 'react';
import { db } from "./firebase";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

// RoomManagement関数
const RoomManagement = (roomId: string) => {
    const [roomStatus, setRoomStatus] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
  
    const roomsRef = doc(db, "random_rooms", roomId);
    // リアルタイムで部屋を更新します。
    onSnapshot(roomsRef, (querySnapshot) => {
      const data = querySnapshot.data();
      setRoomStatus(data?.status || "");
      if (!data) return;
      if (Number(data.num_people) !== 4) return;
      if (data.status !== "playing") return;
      setLoading(false);
    });
  }

// CreateRoom関数
export const CreateRoom = async () => {
  const [randomRoomId, setRandomRoomId] = useState<string | null>(null);
  const docRef = collection(db, "random_rooms");
  const data = await addDoc(docRef, {
    // Firebaseは二次元配列を格納できない
    num_people: 1,
    status: "matching",
    turn: "white",
  });
  if (!data.id) return;
  setRandomRoomId(data.id);
  RoomManagement(data.id);
};

// const matching = async () => {
//   setLoading(true);
//   // 初期化
//   setRoomStatus("");
//   setMyColor("white");
//   setTurn("white");
//   const collectionRef = collection(db, "random_rooms");
//   // マッチ中の部屋を取得するためのクエリ
//   const q = query(collectionRef, where("status", "==", "matching"));
//   // マッチ中の部屋の取得
//   const rooms = await getDocs(q);
//   // もし部屋がなければ作っています。
//   if (rooms.size === 0) {
//     await createRoom();
//     return;
//   }

//   // 部屋情報を取得してデータを取り出しています。
//   const roomData = [] as {
//     id: string;
//     board: string[];
//     num_people: number;
//     status: string;
//     turn: string;
//   }[];
//   rooms.forEach((doc) => {
//     if (!doc?.id) return;
//     const data = doc.data();
//     roomData.push({
//       id: doc.id,
//       board: data.board,
//       num_people: data.num_people,
//       status: data.status,
//       turn: data.turn,
//     });
//   });
//   // 最初に見つかった部屋をセットしています。
//   setRandomRoomId(roomData[0].id);
//   // 部屋の参加人数とステータスを更新
//   const roomsDoc = doc(db, "random_rooms", roomData[0].id);
//   const newNumPeople = Number(roomData[0].num_people) + 1;
//   if (newNumPeople === 2) setMyColor("black");
//   await updateDoc(roomsDoc, {
//     ...roomData[0],
//     num_people: newNumPeople,
//     status: newNumPeople === 2 ? "playing" : "matching",
//   });

//   // 部屋を監視
//   watchRoom(roomData[0].id);
// };
