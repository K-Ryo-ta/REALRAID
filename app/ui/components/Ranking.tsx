'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import RankingUsers from './RankingUsers';

interface RoomData {
	id : string;
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
        const querySnapshot = await getDocs(collection(db, 'rooms'));
        const roomsData: RoomData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.correct !== undefined) {
            roomsData.push({ id: data.id, teamname: data.teamname, correct: data.correct, users: data.users});
          }
        });
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
      {rooms.map((room, index) => {console.log(index); return index < 5 ? <RankingUsers rank={index+1} teamname={room.teamname} corrects={room.correct} users={room.users}/> : null;}
      //(
      //<RankingUsers rank={index+1} teamname={room.teamname} corrects={room.correct} users={room.users}/>
      //)
      )
    }
    </div>
  );
};

export default Ranking;
