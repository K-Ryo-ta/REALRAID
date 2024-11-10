import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const insertUserInfo = async (username: string, teamname: string) => {
  const { error } = await supabase.from("Users").insert([
    {
      username: username,
      teamname: teamname,
    },
  ]);
  if (error) {
    throw new Error("Error inserting team info: " + error.message);
  }
};

export const getUserId = async (username: string, teamname: string) => {
  const { data, error } = await supabase
    .from("Users")
    .select("id")
    .eq("teamname", teamname)
    .eq("username", username);
  if (error) {
    throw new Error("Error inserting team info: " + error.message);
  }
  return { data };
};

export const insertTeamInfo = async (
  team_id: string,
  host_id: string,
  team_name: string,
  username: string,
  status: string
) => {
  const { error } = await supabase.from("Teams").insert([
    {
      team_id: team_id,
      host_id: host_id,
      status: status,
      team_name: team_name,
    },
  ]);
  if (error) {
    throw new Error("Error inserting team info: " + error.message);
  }
  await addMemberToTeam(team_id, username);
};

// 新しいメンバーをTeamsテーブルのmembersカラムに追加する関数
export const addMemberToTeam = async (teamId: string, newMember: string) => {
  // 現在のmembers配列を取得
  const { data, error } = await supabase
    .from("Teams")
    .select("members")
    .eq("team_id", teamId)
    .single();

  if (error) {
    throw new Error("Error fetching team data:" + error.message);
  }

  // 取得したmembers配列に新しいメンバーを追加
  const updatedMembers = data.members
    ? [...data.members, newMember]
    : [newMember];

  // members配列を更新
  const { error: updateError } = await supabase
    .from("Teams")
    .update({ members: updatedMembers })
    .eq("team_id", teamId);

  if (updateError) {
    throw new Error("Error updating members:" + updateError.message);
  }
};

export const getMembers = async (teamId: string) => {
  const { data, error } = await supabase
    .from("Teams")
    .select("members")
    .eq("team_id", teamId)
    .single();

  if (error) {
    throw new Error("Error fetching team data:" + error.message);
  }

  return data.members;
};

export const updateTeamStatus = async (teamId: string, status: string) => {
  const { error } = await supabase
    .from("Teams")
    .update({ status: status })
    .eq("team_id", teamId);

  if (error) {
    throw new Error("Error updating team status:" + error.message);
  }
};

export const getCorrectDB = async (teamId: string) => {
  const { data, error } = await supabase
    .from("Teams")
    .select("correct")
    .eq("team_id", teamId)
    .single();

  if (error) {
    throw new Error("Error fetching team data:" + error.message);
  }
  return data.correct;
};

export const updateCorrectDB = async (teamId: string) => {
  const correct = await getCorrectDB(teamId);
  const newCountCorrect = Number(correct) + 1;

  const { error: updateError } = await supabase
    .from("Teams")
    .update({ correct: newCountCorrect })
    .eq("team_id", teamId);

  if (updateError) {
    throw new Error("Error updating correct:" + updateError.message);
  }
};

export const getAllTeams = async () => {
  const { data, error } = await supabase.from("Teams").select("*");

  if (error) {
    throw new Error("Error fetching team data:" + error.message);
  }

  return data;
};

export const updateCorrectList = async (
  correctList: string[],
  teampassword: string
) => {
  const { error } = await supabase
    .from("Teams")
    .update({ correct_list: correctList }) // 修正: correctList -> correct_list
    .eq("team_id", teampassword); // insertではなくupdateを使用している点にも注意
  if (error) {
    throw new Error("Error inserting team info: " + error.message);
  }
};

export const getCorrectList = async (teampassword: string) => {
  const { data, error } = await supabase
    .from("Teams")
    .select("correct_list")
    .eq("team_id", teampassword)
    .single();
  if (error) {
    throw new Error("Error inserting team info: " + error.message);
  }
  return data.correct_list;
};

export const addParticipant = async (
  teamId: string,
  participant: { name: string; correct_count: number }
) => {
  // 現在のparticipants配列を取得
  const { data, error } = await supabase
    .from("Teams")
    .select("participants")
    .eq("team_id", teamId)
    .single();

  if (error) {
    throw new Error("Error fetching participants:" + error.message);
  }

  // 既存のparticipants配列に新しい参加者を追加
  const updatedParticipants = data.participants
    ? [...data.participants, participant]
    : [participant];

  // participants配列を更新
  const { error: updateError } = await supabase
    .from("Teams")
    .update({ participants: updatedParticipants })
    .eq("team_id", teamId);

  if (updateError) {
    throw new Error("Error updating participants:" + updateError.message);
  }
};
