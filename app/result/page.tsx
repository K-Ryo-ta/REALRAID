import React from 'react'
import styles from './Page.module.css'
import RankingRootButton from '../ui/components/RankingRootButton'
import Result from '../ui/components/Result'

const page = () => {
  return (
    <div className={styles.container}>
        <h1>結果</h1>
        <Result/>
        <RankingRootButton/>
    </div>
  )
}

export default page
