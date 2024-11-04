"use client";
import React, { useEffect } from "react";
import styles from "../../join_members/Page.module.css";
import { db } from "../../lib/firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { userListState } from "@/app/states";
import { teamnameState, teampasswordState } from "@/app/states";
import { supabase } from "@/app/lib/supabase";
import { getMembers } from "@/app/lib/supabase";

const UserList: React.FC = () => {
  const [userList, setUserList] = useRecoilState<string[]>(userListState);
  const teamname = useRecoilValue(teamnameState);
  const teampassword = useRecoilValue(teampasswordState);

  // useEffect(() => {
  //   const usersRef = doc(collection(db, "users"), teamname); // 'userListDocId' を実際のドキュメントIDに置き換えてください
  //   const unsubscribe = onSnapshot(usersRef, (docSnapshot) => {
  //     const data = docSnapshot.data();
  //     if (data && data.username) {
  //       // setUserList(data.username); // data.usernames が配列であることを確認してください
  //     }
  //   });

  //   // クリーンアップ関数
  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    // 非同期でgetMembers関数を呼び出し
    const fetchMembers = async (team_id: string) => {
      const members = await getMembers(team_id);
      if (members) {
        setUserList(members);
      }
    };

    fetchMembers(teampassword);
  }, [teampassword]);

  useEffect(() => {
    console.log("teampassword", teampassword);
    const memberSubscription = supabase
      .channel(`team_members_${teampassword}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Teams",
          filter: `team_id=eq.${teampassword}`,
        },
        (payload) => {
          console.log("payload member", payload.new.members);
          setUserList(payload.new.members);
        }
      )
      .subscribe();
    console.log("subscription", memberSubscription);
    // クリーンアップ関数
    return () => {
      memberSubscription.unsubscribe();
    };
  }, [teampassword]);

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
