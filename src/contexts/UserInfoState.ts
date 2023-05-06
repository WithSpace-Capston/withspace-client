import { atom } from "recoil";

type UserInfoStateType = {
  id: number;
  logined: boolean;
  defaultPageId: number;
  inPersonal: boolean;
  activeTeamId: number | null;
};

export const userInfoState = atom<UserInfoStateType>({
  key: "userInfoState",
  default: {
    id: -1,
    logined: false,
    defaultPageId: -1,
    inPersonal: true,
    activeTeamId: null,
  },
});
