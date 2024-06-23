import React from 'react'
import styles from './Page.module.css'
import RankingRootButton from '../ui/components/RankingRootButton'

const page = () => {
  return (
    <div className={styles.container}>
        <h1>結果</h1>
        <p>結果を表示</p>
        <RankingRootButton/>
    </div>
  )
}

export default page
