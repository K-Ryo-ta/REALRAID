"use client";
import React, { useEffect } from "react";
import styles from "../../join_members/Page.module.css";
import { db } from "../../lib/firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { userListState } from "@/app/states";
import { teamnameState } from "@/app/states";

const UserList: React.FC = () => {
  const [userList, setUserList] = useRecoilState<string[]>(userListState);
  const teamname = useRecoilValue(teamnameState);

  useEffect(() => {
    const usersRef = doc(collection(db, "users"), teamname); // 'userListDocId' を実際のドキュメントIDに置き換えてください
    const unsubscribe = onSnapshot(usersRef, (docSnapshot) => {
      const data = docSnapshot.data();
      if (data && data.username) {
        setUserList(data.username); // data.usernames が配列であることを確認してください
      }
    });

    // クリーンアップ関数
    return () => unsubscribe();
  }, []);

  console.log(userList);

  return (
    <div>
      {userList.map((user, index) => {
        return (
          <div className={styles.username} key={index}>
            {user}
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
