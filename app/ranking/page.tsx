import React from 'react'
import TitleRootButton from '../ui/components/TitleRootButton'
import styles from './Page.module.css'
import Ranking from '../ui/components/Ranking'

const page = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.rankingrogo}>
            結果発表
        </h1>
        <h1 className={styles.rankingrogo}>
            ランキング
        </h1>
        <Ranking/>
        <TitleRootButton/>
    </div>
  )
}

export default page
