import ClientSideComponents from "../ui/components/answer/AnswerClientSideComponents";
import CreateAnswer from "../ui/components/answer/CreateAnswer";
import styles from "./Page.module.css";

const page = () => {
  return (
    <div className={styles.container}>
      <CreateAnswer />
    </div>
  );
};

export default page;
