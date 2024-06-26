import ClientSideComponents from '../ui/components/AnswerClientSideComponents'
import styles from './Page.module.css'

const page = () => {

  return (
    <div className={styles.container}>
        <ClientSideComponents />
    </div>
  )
}

export default page
