/**
 * UIContext
 * UI 표시를 위한 state를 위한 context
 */

import { createContext, Dispatch, useReducer } from "react";

type UIState = {
  isSpaceWorkspace: boolean; // true -> Workspace, false -> Calendar
  isOpenChatting: boolean;
};

const UIStateContext = createContext<UIState | undefined>(undefined);

type Action =
  | { type: "OPEN_WORKSPACE" }
  | { type: "OPEN_CALENDAR" }
  | { type: "TOGGLE_CHATTING" };

type UIDispatch = Dispatch<Action>;

const UIDispatchContext = createContext<UIDispatch | undefined>(undefined);

function uiReducer(state: UIState, action: Action): UIState {
  // 메인 space 공간을 Workspace로
  if (action.type === "OPEN_WORKSPACE") {
    return { ...state, isSpaceWorkspace: true };
  }

  // 메인 space 공간을 Calendar로
  if (action.type === "OPEN_CALENDAR") {
    return { ...state, isSpaceWorkspace: false };
  }

  // Chatting 열고 닫기
  if (action.type === "TOGGLE_CHATTING") {
    return { ...state, isOpenChatting: !state.isOpenChatting };
  }

  throw new Error("UIContext - Unhandled action");
}

export function UIContextProvider({ children }: { children: React.ReactNode }) {
  const [uiState, uiDispatch] = useReducer(uiReducer, {
    isSpaceWorkspace: true,
    isOpenChatting: false,
  });

  return (
    <UIDispatchContext.Provider value={uiDispatch}>
      <UIStateContext.Provider value={uiState}>
        {children}
      </UIStateContext.Provider>
    </UIDispatchContext.Provider>
  );
}
