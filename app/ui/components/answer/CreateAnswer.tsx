"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  rectIntersection,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import AnswerColumn from "./AnswerColumn";
import UsableCharacterColumn from "../createRoomPass/UsableCharacterColumn";
import { useRecoilState, useRecoilValue } from "recoil";
import { allAnswerState, teamnameState, teampasswordState } from "@/app/states";
import { useRouter } from "next/navigation";
import Timer from "../Timer";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import useCreateRoom from "@/app/lib/useCreateRoom";
import { animaldata } from "../../../data";
import styles from "../../../answer/Page.module.css";

// アイテムの型定義
type Item = {
  id: string;
  content: string;
};

const CreateRoomPass = () => {
  // 状態管理用のフック
  const [characters, setCharacters] = useState<string[]>([]);
  const [usableCharacters, setUsableCharacters] = useState<Item[]>([]);
  const [error, setError] = useState<string>("");
  const { RoomManagement } = useCreateRoom();
  const [allAnswer, setAllAnswer] = useRecoilState(allAnswerState);
  const [answerStr, setAnswerStr] = useState("");

  // 正解アニメーション用の状態
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0); // 正解数を管理する状態

  // Recoil状態からチーム名を取得
  const teamname = useRecoilValue(teamnameState);

  // 初回レンダリング時に使用可能なキャラクターを設定
  useEffect(() => {
    console.log(usableCharacters);
    setUsableItems(usableCharacters);
  }, [usableCharacters]);

  // チーム名が変更された時にデータベースからユーザー名を取得
  useEffect(() => {
    const fetchNames = async () => {
      if (!teamname) return;

      const usersDocRef = doc(db, "users", teamname);
      const docSnapshot = await getDoc(usersDocRef);
      const names: string[] = [];

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (Array.isArray(data?.username)) {
          data.username.forEach((name: string) => {
            names.push(...name.split(""));
          });
        }
      }

      setCharacters(names);
      const characterObj = names.map((character, key) => {
        return { id: `usable-${key}`, content: character };
      });
      setUsableCharacters(characterObj);
    };

    fetchNames();
  }, [teamname]);

  const updateCorrect = async () => {
    console.log("update");
    // 部屋の参加人数とステータスを更新
    console.log("Updating document for password: ", teampassword);
    const roomsRef = doc(collection(db, "rooms"), teampassword);

    try {
      const docSnapshot = await getDoc(roomsRef);
      const data = docSnapshot.data();
      if (data) {
        const newCountCorrect = Number(data.correct) + 1;
        await updateDoc(roomsRef, {
          correct: newCountCorrect,
        });
        console.log(newCountCorrect);
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      setError("部屋の更新中にエラーが発生しました");
    }

    // 部屋を監視
    RoomManagement(teampassword);
  };

  const checkAnswer = () => {
    for (let i = 0; i < animaldata.length; i++) {
      if (answerStr === animaldata[i] && !allAnswer.includes(answerStr)) {
        updateCorrect();
        setAllAnswer([...allAnswer, answerStr]);
        setCorrectCount((prevCount) => prevCount + 1); // 正解数を更新
        console.log("正解です");
        // 正解時にアニメーションをトリガー
        setIsCorrect(true);
        setTimeout(() => setIsCorrect(false), 1000); // 1秒後にアニメーションを終了
      }
    }
    // 解答欄を空にして使える文字をリセット
    setAnswerItems([]);
    setUsableItems(usableCharacters);
  };

  // answerStrの変更を監視してcheckAnswerを実行
  useEffect(() => {
    if (answerStr) {
      checkAnswer();
    }
  }, [answerStr]);

  const handleSubmit = () => {
    const tmpAnswer = answerItems.reduce((arr, item) => arr + item.content, "");
    setAnswerStr(tmpAnswer);
  };

  // 時間切れの状態管理とルーターの設定
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const router = useRouter();

  // 時間切れ時の処理
  const handleTimeUp = () => {
    setIsTimeUp(true);
    console.log("時間切れです");
    // 時間切れ時の処理をここに追加
    router.push("/result");
  };

  // 回答アイテムとチームパスワードの状態管理
  const [answerItems, setAnswerItems] = useState<Item[]>([]);
  const [teampassword, setTeampassword] =
    useRecoilState<string>(teampasswordState);
  const [usableItems, setUsableItems] = useState<Item[]>(usableCharacters);

  // 回答アイテムからチームパスワードを生成
  const answeredItems = answerItems.map((item) => item.content);
  const passPhrase = answeredItems.reduce(
    (arr, character) => arr + character,
    ""
  );

  useEffect(() => {
    console.log("teampassword updated: ", teampassword);
  }, [teampassword]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // ドラッグ終了時の処理
  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;

    // ドラッグしたアイテムが使用可能なアイテムかつ回答列にドロップされた場合
    if (
      active.data.current?.type === "usable-item" &&
      over &&
      over.id === "answer-column"
    ) {
      if (!answerItems.find((item) => item.id === active.id)) {
        setAnswerItems((items) => [
          ...items,
          { id: active.id, content: active.data.current.content },
        ]);
        setUsableItems((items) =>
          items.filter((item) => item.id !== active.id)
        );
      }
    } else if (over && active.id !== over.id) {
      const oldIndex = answerItems.findIndex((item) => item.id === active.id);
      const newIndex = answerItems.findIndex((item) => item.id === over.id);
      setAnswerItems((items) => arrayMove(items, oldIndex, newIndex));
    } else if (!over) {
      const item = answerItems.find((item) => item.id === active.id);
      if (item) {
        setAnswerItems((items) =>
          items.filter((item) => item.id !== active.id)
        );
        setUsableItems((items) =>
          [...items, item].sort(
            (a, b) =>
              usableCharacters.findIndex((fixedItem) => fixedItem.id === a.id) -
              usableCharacters.findIndex((fixedItem) => fixedItem.id === b.id)
          )
        );
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div className="self-start sticky top-0">
          <Timer onTimeUp={handleTimeUp} />
        </div>
        <div className={isCorrect ? styles.correctAnimation : ""}>
          <AnswerColumn
            id="answer-column"
            items={answerItems}
            setItems={setAnswerItems}
          />
        </div>
        <UsableCharacterColumn items={usableItems} />
        <button onClick={handleSubmit}>回答</button>
        <div>正解数: {correctCount}</div> {/* 正解数を表示 */}
      </div>
    </DndContext>
  );
};

export default CreateRoomPass;
