'use client';
import { db } from "./firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useRecoilValue } from 'recoil';
import { usernameState } from '@/app/states';
import { teamnameState } from '@/app/states';

export const useSaveUserinFirebase = () => {
  const username = useRecoilValue(usernameState);
  const teamname = useRecoilValue(teamnameState);

  const saveUser = async () => {
    console.log('Save User in Firebase');
    const usersRef = doc(db, 'users', teamname); // teamnameをドキュメントIDとして使用

    try {
      const docSnapshot = await getDoc(usersRef);
      if (docSnapshot.exists()) {
        // ドキュメントが存在する場合、ユーザー名を更新
        const data = docSnapshot.data();
        if (data && Array.isArray(data.username)) {
          const updatedUsernames = [...data.username, username];
          await updateDoc(usersRef, { username: updatedUsernames });
        } else {
          await updateDoc(usersRef, { username: [username] });
        }
      } else {
        // ドキュメントが存在しない場合、新しく作成
        await setDoc(usersRef, { username: [username] });
      }
      console.log('User saved successfully');
    } catch (error) {
      console.error('Error saving user: ', error);
    }
  };

  return saveUser;
};
