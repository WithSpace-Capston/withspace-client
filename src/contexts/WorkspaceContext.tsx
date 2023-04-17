/**
 * WorkspaceContext
 * Workspace의 마크다운 저장과 백엔드 업로드를 위한 context
 */

import { createContext, Dispatch, useReducer, useContext } from "react";

type WorkspaceState = {
  md: string | undefined; // 유저가 작성한 마크다운
};

const WorkspaceStateContext = createContext<WorkspaceState | undefined>(
  undefined
);

type Action =
  | { type: "UPDATE_MD"; md: string | undefined }
  | { type: "UPLOAD_MD" };

type WorkspaceDispatch = Dispatch<Action>;

const WorkspaceDispatchContext = createContext<WorkspaceDispatch | undefined>(
  undefined
);

function workspaceReducer(
  state: WorkspaceState,
  action: Action
): WorkspaceState {
  if (action.type === "UPDATE_MD") {
    return { ...state, md: action.md };
  }

  if (action.type === "UPLOAD_MD") {
    console.log("마크다운 업로드 코드 작성하기");
    return { ...state };
  }

  throw new Error("WorkspaceContext - Unhandled Action");
}

const initialState: WorkspaceState = {
  md: "",
};

export function WorkspaceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [workspaceState, workspaceDispatch] = useReducer(
    workspaceReducer,
    initialState
  );

  return (
    <WorkspaceDispatchContext.Provider value={workspaceDispatch}>
      <WorkspaceStateContext.Provider value={workspaceState}>
        {children}
      </WorkspaceStateContext.Provider>
    </WorkspaceDispatchContext.Provider>
  );
}

export function useWorkspaceState() {
  const state = useContext(WorkspaceStateContext);
  if (!state)
    throw new Error("WorkspaceContext - WorkspaceStateProvider not found");
  return state;
}

export function useWorkspaceDispatch() {
  const dispatch = useContext(WorkspaceDispatchContext);
  if (!dispatch)
    throw new Error("WorkspaceContext - WorkspaceDispatchProvider not found");
  return dispatch;
}
