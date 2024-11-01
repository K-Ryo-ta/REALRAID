"use client";
import React from "react";
import styles from "../../room_create_or_join/Page.module.css";
import { useRouter } from "next/navigation";

const CreateRoomButton = () => {
  const router = useRouter();
  const handleButtonCreateRoom = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Create Room");
    router.push("./room_create");
  };

  return (
    <button
      onClick={(e) => handleButtonCreateRoom(e)}
      className="button_large_yellow"
    >
      <div className="background">Create Room</div>
      <div className="line">Create Room</div>
    </button>
  );
};

export default CreateRoomButton;
