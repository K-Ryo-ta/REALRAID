import React from 'react'
import styles from './Page.module.css'
import SendAnswerButton from '../ui/components/SendAnswerButton'

const page = () => {
  return (
    <div className={styles.container}>
        <p>timer</p>
        <p>名前候補</p>
        <p>解答欄</p>
        <SendAnswerButton/>
    </div>
  )
}

export default page
