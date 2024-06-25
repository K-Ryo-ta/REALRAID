import React from 'react'
import TitleRootButton from '../ui/components/TitleRootButton'
import styles from './Page.module.css'

const page = () => {
  return (
    <div className={styles.container}>
        <h1>
            ランキング
        </h1>
        <p>ランキングを表示</p>
        <TitleRootButton/>
    </div>
  )
}

export default page
