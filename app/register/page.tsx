import React from "react";
import styles from "./Page.module.css";
import InputTeamname from "../ui/components/Formcomponents/InputTeamname";
import InputUsername from "../ui/components/Formcomponents/InputUsername";
import RegisterButton from "../ui/components/Formcomponents/RegisterButton";

const page = () => {
  return (
    <div className={styles.container}>
      <div className="background_large">
        <h1 className={styles.anm}>チーム名とおなまえ 登録</h1>
        <p className={styles.font_small}>
          ◾️◾️◾️ チーム名 ◾️◾️◾️<br></br>
          ランキングで表示されるよ！<br></br>
          一緒にプレイする友達と<br></br>
          同じチーム名を入力してね！
        </p>
        <InputTeamname />
        <p className={styles.font_small}>
          ◾️◾️◾️ なまえ ◾️◾️◾️<br></br>
          フルネームをひらがなで入力してね！
        </p>
        <InputUsername />
        <RegisterButton />
      </div>
    </div>
  );
};

export default page;
