import React from 'react'
import TitleRootButton from '../ui/components/TitleRootButton'
import styles from './Page.module.css'
import Ranking from '../ui/components/Ranking'

const page = () => {
  return (
    <div className={styles.container}>
        <h1>
            ランキング
        </h1>
        <Ranking/>
        <TitleRootButton/>
    </div>
  )
}

export default page
