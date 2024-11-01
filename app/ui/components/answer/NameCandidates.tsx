import React, { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { teamnameState } from "@/app/states";
import { useRecoilValue } from "recoil";

const NameCandidates: React.FC = () => {
  const [characters, setCharacters] = useState<string[]>([]);
  const teamname = useRecoilValue(teamnameState);

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
    };

    fetchNames();
  }, [teamname]);

  return (
    <div className="name_parts">
      {characters.map((char, index) => (
        <span key={index} className="name_span">
          {char}{" "}
        </span>
      ))}
    </div>
  );
};

export default NameCandidates;
