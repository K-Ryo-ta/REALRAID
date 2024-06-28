import React, { useState } from 'react';
import { animaldata } from '../../../data'
import { db } from '@/app/lib/firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRecoilValue, useRecoilState } from 'recoil';
import { teampasswordState } from '@/app/states';
import  useCreateRoom  from '@/app/lib/useCreateRoom';
import { allAnswerState } from '@/app/states';

const AnswerInput: React.FC = () => {
  const [answer, setAnswer] = useState<string>('');
  const teampassword = useRecoilValue(teampasswordState);
  const [error, setError] = useState<string>('');
  const { RoomManagement } = useCreateRoom();
  const [allAnswer, setAllAnswer] = useRecoilState(allAnswerState);


  const updateCorrect = async () => {

    // 部屋の参加人数とステータスを更新
    const roomsRef = doc(collection(db, 'rooms'), teampassword);

    try {
      const docSnapshot = await getDoc(roomsRef);
      const data = docSnapshot.data();
      if (data) {
        const newCountCorrect = Number(data.correct) + 1;
        await updateDoc(roomsRef, {
            correct: newCountCorrect,
        });
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      setError('部屋の更新中にエラーが発生しました');
    }

    // 部屋を監視
    RoomManagement(teampassword);
  };

  const checkAnswer = () =>{
    for(let i = 0; i < animaldata.length; i++){
        if (answer === animaldata[i]){
            updateCorrect();
            setAllAnswer([...allAnswer, answer]);
        }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('回答:', answer);
    checkAnswer();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className='input_send_answer' type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} />
      <button className='button_send' type="submit">送信</button>
    </form>
  );
};

export default AnswerInput;
