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
  setDoc
} from "firebase/firestore";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { teampasswordState } from '../states';

const router = useRouter();
	const teampassword = useRecoilValue(teampasswordState);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [roomStatus, setRoomStatus] = useState<string>('');
	const [numPeople, setNumPeople] = useState<number>(0);
	const [turn, setTurn] = useState<string>('');
	const [status, setStatus] = useState<string>('');

const RoomManagement = (roomId: string) => {
  const roomsRef = doc(collection(db, "rooms"), roomId);
  // リアルタイムで部屋を更新します。
  onSnapshot(roomsRef, (querySnapshot) => {
    const data = querySnapshot.data();
    setRoomStatus(data?.status || "");
    if (!data) return;
    if (Number(data.current_people_in_room) !== 4) return;
    if (data.status !== "playing") return;
    setLoading(false);
  });
}

const CreateRoom = async () => {
  console.log('Create Room')
  if (!teampassword) {
    setError('パスワードを入力してください');
    return;
  }

  const roomRef = doc(collection(db, 'rooms'), teampassword);

  try {
    await setDoc(roomRef, {
      current_people_in_room: 1,
      status: 'matching',
    });
    setError(''); // エラーをクリア
  } catch (error) {
    console.error('部屋の作成中にエラーが発生しました:', error);
    setError('部屋の作成中にエラーが発生しました');
  }
  RoomManagement(teampassword);
};
