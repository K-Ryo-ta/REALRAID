"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import RankingUsers from "./RankingUsers";
import { getAllTeams } from "@/app/lib/supabase";
import { all } from "axios";

interface RoomData {
  id: string;
  teamname: string;
  correct: number;
  users: string[];
}

const Ranking: React.FC = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const allTeamsData = await getAllTeams();
        // const querySnapshot = await getDocs(collection(db, "rooms"));
        const roomsData: RoomData[] = [];
        allTeamsData.forEach((data) => {
          if (
            data.correct != null &&
            data.team_name != null &&
            data.team_id != null &&
            data.members != null
          ) {
            roomsData.push({
              id: data.team_id,
              teamname: data.team_name,
              correct: data.correct,
              users: data.members,
            });
          }
        });
        // querySnapshot.forEach((doc) => {
        //   const data = doc.data();
        //   if (data.correct !== undefined) {
        //     roomsData.push({
        //       id: data.id,
        //       teamname: data.teamname,
        //       correct: data.correct,
        //       users: data.users,
        //     });
        //   }
        // });
        roomsData.sort((a, b) => b.correct - a.correct); // 正解数が多い順にソート
        setRooms(roomsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="ranking_h2">Ranking</h2>
      <ul className="ranking_ul">
        {rooms.map((room, index) =>
          index < 5 ? (
            <li key={room.id} className="ranking_list">
              <p className="lip1">
                {index + 1}. Teamname: <span>{room.teamname}</span>
              </p>
              <p className="lip2">
                Correct Answers: <span>{room.correct}</span>
              </p>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default Ranking;
