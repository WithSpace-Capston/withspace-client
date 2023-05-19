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

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    // setSelf -> Callbacks to set or reset the value of the atom.
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // onSet -> Subscribe to changes in the atom value.
    onSet((newValue: any, _: any, inReset: boolean) => {
      inReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
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
  effects: [localStorageEffect("userInfoState")],
});
