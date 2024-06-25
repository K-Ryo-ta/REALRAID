'use client';
import { db } from "./firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useRecoilValue } from 'recoil';
import { usernameState } from '@/app/states';
import { teamnameState } from '@/app/states';
import { useRecoilState } from 'recoil';
import { roomfullState } from "@/app/states";
import { set } from "firebase/database";

export const useSaveUserinFirebase = () => {
  const username = useRecoilValue(usernameState);
  const teamname = useRecoilValue(teamnameState);
  const [roomfull, setRoomfull] = useRecoilState<boolean>(roomfullState);

  const saveUser = async () => {
    const usersRef = doc(db, 'users', teamname); // teamnameをドキュメントIDとして使用

    try {
      const docSnapshot = await getDoc(usersRef);
      if (docSnapshot.exists()) {
        // ドキュメントが存在する場合、ユーザー名を更新
        const data = docSnapshot.data();
        if(data.username.length < 4){
          if (data && Array.isArray(data.username)) {
            const updatedUsernames = [...data.username, username];
            await updateDoc(usersRef, { username: updatedUsernames });
          } else {
            await updateDoc(usersRef, { username: [username] });
          }
          setRoomfull(false);
        }
        else{
          setRoomfull(true);
          console.log(roomfull);
          window.alert('部屋が満員です');
        }
      } else {
        // ドキュメントが存在しない場合、新しく作成
        await setDoc(usersRef, { username: [username] });
        setRoomfull(false);
      }
      console.log('User saved successfully');
    } catch (error) {
      console.error('Error saving user: ', error);
    }
  };

  return saveUser;
};
