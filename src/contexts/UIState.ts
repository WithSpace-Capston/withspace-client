import { atom } from "recoil";

type UIStateType = {
  isChatting: boolean;
};

export const uiState = atom<UIStateType>({
  key: "uiInfoState",
  default: {
    isChatting: false,
  },
});
