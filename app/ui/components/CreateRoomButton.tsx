'use client'; 
import React, { use } from 'react'
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
import useCreateRoom from '@/app/lib/useCreateRoom';

const CreateRoomButton = () => {
	const router = useRouter();
	const teampassword = useRecoilValue(teampasswordState);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [roomStatus, setRoomStatus] = useState<string>('');
	const [numPeople, setNumPeople] = useState<number>(0);
	const [turn, setTurn] = useState<string>('');
	const [status, setStatus] = useState<string>('');
	const { createRoom } = useCreateRoom();

	const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault()
			console.log('Create Room')
			createRoom();
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
