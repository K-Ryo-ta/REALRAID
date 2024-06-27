import React, { ReactNode } from "react";
import style from "../../room_create/Page.module.css";

const Character = ({ children }: { children: ReactNode }) => {
  return <div className={style.character}>{children}</div>;
};

export default Character;
