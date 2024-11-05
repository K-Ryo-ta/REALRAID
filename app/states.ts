import { atom } from "recoil";

export const roomState = atom({
  key: "roomState",
  default: "",
});

export const teamnameState = atom<string>({
  key: "teamnameState",
  default: "",
});

export const usernameState = atom<string>({
  key: "usernameState",
  default: "",
});

export const userListState = atom<string[]>({
  key: "userListState",
  default: [],
});

export const teampasswordState = atom<string>({
  key: "teampasswordState",
  default: "",
});

export const roomfullState = atom<boolean>({
  key: "roomfullState",
  default: false,
});

export const resultState = atom<number>({
  key: "resultState",
  default: 0,
});

export const isCreatorState = atom<boolean>({
  key: "isCreatorState",
  default: false,
});

export const allAnswerState = atom<string[]>({
  key: "allAnswerState",
  default: [],
});

export const canSubmitState = atom<boolean>({
  key: "canSubmitState",
  default: true,
});

export const userIdState = atom<string>({
  key: "userIdState",
  default: "",
});
