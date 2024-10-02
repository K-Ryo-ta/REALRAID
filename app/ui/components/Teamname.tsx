"use client";
import React from "react";
import styles from "../../room_create/Page.module.css";
import { useRecoilValue } from "recoil";
import { teamnameState } from "@/app/states";

const Teamname = () => {
  const teamname = useRecoilValue(teamnameState);
  return <div>{teamname}</div>;
};

export default Teamname;
