"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../../ranking/Page.module.css";

const TitleRootButton = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked");
    router.push("/");
  };
  return (
    <div>
      <button
        onClick={(e) => handleClick(e)}
        className="button_middle_background"
      >
        <div className="button_middle_front">Titleへ</div>
      </button>
    </div>
  );
};

export default TitleRootButton;
