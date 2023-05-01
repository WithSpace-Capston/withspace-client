import { atom } from "recoil";

type SpaceStateType = {
  title: string | undefined;
  content: string | undefined;
};

type SpaceEditedStateType = boolean | undefined;

export const spaceState = atom<SpaceStateType>({
  key: "spaceState",
  default: {
    title: undefined,
    content: undefined,
  },
});

export const spaceEditedState = atom<SpaceEditedStateType>({
  key: "spaceEditedState",
  default: false,
});
