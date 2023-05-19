import { atom } from "recoil";

type UserInfoStateType = {
  id: number;
  name: string | null;
  logined: boolean;
  defaultPageId: number;
  inPersonal: boolean;
  activeTeamId: number | null;
  activeChattingRoomId: number | null;
  teamList: {
    teamId: number;
    teamName: string;
  }[];
};

export const userInfoState = atom<UserInfoStateType>({
  key: "userInfoState",
  default: {
    id: -1,
    name: null,
    logined: false,
    defaultPageId: -1,
    inPersonal: true,
    activeTeamId: null,
    activeChattingRoomId: null,
    teamList: [],
  },
});
