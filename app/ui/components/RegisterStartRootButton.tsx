"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../Page.module.css";

const RegisterStartRootButton = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked");
    router.push("/register");
  };
  return (
    <div className="flex flex-col items-end">
      <button
        onClick={(e) => handleClick(e)}
        className="button_middle_background "
      >
        <div className="button_middle_front">お名前登録へ</div>
      </button>
    </div>
  );
};

export default RegisterStartRootButton;
