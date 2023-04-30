import { atom } from "recoil";

type SpaceStateType = {
  title: string | undefined;
  content: string | undefined;
};

export const spaceState = atom<SpaceStateType>({
  key: "spaceState",
  default: {
    title: undefined,
    content: undefined,
  },
});
