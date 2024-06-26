'use client';
import React, { useState } from 'react'
import styles from './Page.module.css'
import SendAnswerButton from '../ui/components/SendAnswerButton'
import Timer from '../ui/components/Timer'
import NameCandidates from '../ui/components/NameCandidates'
import AnswerInput from '../ui/components/AnswerInput'

const page = () => {
const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  const handleTimeUp = () => {
    setIsTimeUp(true);
    console.log('時間切れです');
    // 時間切れ時の処理をここに追加
  };
  return (
    <div className={styles.container}>
        <Timer onTimeUp={handleTimeUp}/>
        <NameCandidates/>
        <AnswerInput/>
        <SendAnswerButton/>
    </div>
  )
}

export default page
