/**
 * UserInfoContext
 * 로그인된 유저 ID를 저장하는 context (일단은...)
 * 그 밖에도 뭔가 필요한 정보가 있을 경우 추가 예정
 */

import { Dispatch, createContext, useContext, useReducer } from "react";

type UserInfoState = {
  id: number;
  isLogin: boolean;
};

const UserInfoStateContext = createContext<UserInfoState | undefined>(
  undefined
);

type Action =
  | { type: "FETCH_INFO"; id: number }
  | { type: "LOGIN" }
  | { type: "LOGOUT" };

type UserInfoDispatch = Dispatch<Action>;

const UserInfoDispatchContext = createContext<UserInfoDispatch | undefined>(
  undefined
);

function userInfoReducer(state: UserInfoState, action: Action): UserInfoState {
  if (action.type === "FETCH_INFO") {
    return { ...state, id: action.id };
  }

  if (action.type === "LOGIN") {
    return { ...state, isLogin: true };
  }

  if (action.type === "LOGOUT") {
    return { ...state, isLogin: false };
  }

  throw new Error("UserInfoContext - Unhandled Action");
}

const initialState: UserInfoState = {
  id: -1,
  isLogin: false,
};

export function UserInfoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfoState, userInfoDispatch] = useReducer(
    userInfoReducer,
    initialState
  );

  return (
    <UserInfoDispatchContext.Provider value={userInfoDispatch}>
      <UserInfoStateContext.Provider value={userInfoState}>
        {children}
      </UserInfoStateContext.Provider>
    </UserInfoDispatchContext.Provider>
  );
}

export function useUserInfoState() {
  const state = useContext(UserInfoStateContext);
  if (!state)
    throw new Error("UserInfoContext - UserInfoStateContext not found");
  return state;
}

export function useUserInfoDispatch() {
  const dispatch = useContext(UserInfoDispatchContext);
  if (!dispatch)
    throw new Error("UserInfoContext - UserInfoDispatchContext not found");
  return dispatch;
}
