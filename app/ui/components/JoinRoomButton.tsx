'use client';
import React, { useState } from 'react';
import styles from '../../room_join/Page.module.css';
import { useRouter } from 'next/navigation';
import { db } from "../../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useRecoilValue } from 'recoil';
import { teampasswordState } from '@/app/states';
import useCreateRoom from '@/app/lib/useCreateRoom';

const JoinRoomButton = () => {
  const teampassword = useRecoilValue(teampasswordState);
  const [error, setError] = useState<string>('');
  const { RoomManagement } = useCreateRoom();
  const router = useRouter();

  const matching = async () => {
    if (!teampassword) {
      setError('パスワードを入力してください');
      return;
    }

    // 部屋の参加人数とステータスを更新
    const roomsRef = doc(collection(db, 'rooms'), teampassword);

    try {
      const docSnapshot = await getDoc(roomsRef);
      const data = docSnapshot.data();
      if (data && data.current_people_in_room) {
				if(Number(data.current_people_in_room) < 4){
					const newNumPeople = Number(data.current_people_in_room) + 1;
					await updateDoc(roomsRef, {
						current_people_in_room: newNumPeople,
						status: newNumPeople === 4 ? "playing" : "matching",
					});
				}
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      setError('部屋の更新中にエラーが発生しました');
    }

    // 部屋を監視
    RoomManagement(teampassword);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('Join Room');
    await matching();
    router.push('./join_members');
  };

  return (
    <div>
      <button onClick={handleClick} className={styles.button}>
        参加
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default JoinRoomButton;
