import Image from "next/image";
import styles from "./Page.module.css";
import RegisterStartRootButton from "./ui/components/RegisterStartRootButton";

export default function Home() {
  return (
    <div className={styles.container}>
      <RegisterStartRootButton />
    </div>
  );
}
