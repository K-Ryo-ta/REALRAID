import { atom } from "recoil";

export const roomState = atom({
 key: 'roomState', 
 default: '',
});

export const teamnameState = atom<string>({
    key: 'teamnameState', 
    default: '',
});

export const usernameState = atom<string>({
    key: 'usernameState', 
    default: '',
});

export const userListState = atom<string[]>({
    key: 'userListState', 
    default: [],
});

export const teampasswordState = atom<string>({
    key: 'teampasswordState', 
    default: '',
});

export const roomfullState = atom<boolean>({
    key: 'roomfullState', 
    default: false,
});
