'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface RoomData {
	id : string;
  teamname: string;
  correct: number;
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
            roomsData.push({ id: data.id, teamname: data.teamname, correct: data.correct });
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
      <h2 className='ranking_h2'>Ranking</h2>
      <ul className='ranking_ul'>
        {rooms.map((room, index) => (
          <li key={room.id} className='ranking_list'>
            <p className='lip1'>{index + 1}. Teamname: <span>{room.teamname}</span></p>
            <p className='lip2'>Correct Answers: <span>{room.correct}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
