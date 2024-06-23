'use client'; 
import React from 'react'
import styles from '../../room_create/Page.module.css'

import { teampasswordState } from '@/app/states';
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
	setDoc,
} from "firebase/firestore";

import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil';
import { useState } from 'react';



const CreateRoomButton = () => {
	const router = useRouter();
	const teampassword = useRecoilValue(teampasswordState);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [roomStatus, setRoomStatus] = useState<string>('');
	const [roomId, setRoomId] = useState<string>('');
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

	const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault()
			console.log('Create Room')
			CreateRoom();
			router.push('./join_members')
	};
  return (
    <div>
        <button onClick={(e) => handleButtonClick(e)} className={styles.button}>
            作成
        </button>
    </div>
  )
}

export default CreateRoomButton
