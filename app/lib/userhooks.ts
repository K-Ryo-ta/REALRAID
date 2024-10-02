"use client";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { usernameState } from "@/app/states";
import { teamnameState } from "@/app/states";
import { useRecoilState } from "recoil";
import { roomfullState } from "@/app/states";

export const useSaveUserinFirebase = () => {
  const username = useRecoilValue(usernameState);
  const teamname = useRecoilValue(teamnameState);
  const [roomfull, setRoomfull] = useRecoilState<boolean>(roomfullState);

  const saveUser = async (): Promise<boolean> => {
    const usersRef = doc(db, "users", teamname); // teamnameをドキュメントIDとして使用

    try {
      const docSnapshot = await getDoc(usersRef);
      if (docSnapshot.exists()) {
        // ドキュメントが存在する場合、ユーザー名を更新
        const data = docSnapshot.data();
        if (data && data.username.length < 4) {
          const updatedUsernames = [...data.username, username];
          await updateDoc(usersRef, { username: updatedUsernames });
          setRoomfull(false);
          return false; // 部屋が満員ではない
        } else {
          setRoomfull(true);
          window.alert("このチームは満員です");
          return true; // 部屋が満員
        }
      } else {
        // ドキュメントが存在しない場合、新しく作成
        await setDoc(usersRef, { username: [username] });
        setRoomfull(false);
        return false; // 部屋が満員ではない
      }
    } catch (error) {
      console.error("Error saving user: ", error);
      return true; // エラーの場合は満員とみなす
    }
  };

  return saveUser;
};
