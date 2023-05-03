import { atom } from "recoil";

type UserInfoStateType = {
  id: number;
  logined: boolean;
  defaultPageId: number;
};

export const userInfoState = atom<UserInfoStateType>({
  key: "userInfoState",
  default: {
    id: -1,
    logined: false,
    defaultPageId: -1,
  },
});
