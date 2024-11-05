"use client";
import React, { useState } from "react";
import styles from "../../../register/Page.module.css";
import { useRecoilState } from "recoil";
import { usernameState } from "../../../states";

const InputUsername = () => {
  const [username, setUsername] = useRecoilState<string>(usernameState);
  const [tempUsername, setTempUsername] = useState<string>(username);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempUsername(e.target.value);
  };

  const handleInputBlur = () => {
    const regex = /^[ぁ-ん]*$/;
    if (regex.test(tempUsername)) {
      setUsername(tempUsername);
    } else {
      setTempUsername(username); // 不正な入力があった場合は元の値に戻す
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    setIsComposing(false);
    // 変換が確定したタイミングで検証
    const input = e.currentTarget.value;
    const regex = /^[ぁ-ん]*$/;
    if (regex.test(input)) {
      setUsername(input);
    } else {
      setTempUsername(username); // 不正な入力があった場合は元の値に戻す
    }
  };

  return (
    <div>
      <input
        type="text"
        value={tempUsername}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        placeholder="なまえ"
        className={styles.input}
      />
    </div>
  );
};

export default InputUsername;
