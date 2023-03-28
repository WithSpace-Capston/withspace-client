/**
 * TeamContext
 * 현재 유저가 어떤 팀의 Space에 있는지를 나타내는 state를 위한 context
 * ex) personal space, team a, team b, ...
 */

import { createContext, Dispatch, useContext, useReducer } from "react";

type TeamState = {
  isPersonal: boolean;
};

const TeamStateContext = createContext<TeamState | undefined>(undefined);

type Action = { type: "TO_PERSONAL" } | { type: "TO_OTHER_TEAM" };

type TeamDispatch = Dispatch<Action>;

const TeamDispatchContext = createContext<TeamDispatch | undefined>(undefined);

function teamReducer(state: TeamState, action: Action): TeamState {
  // Personal Space로 변경
  if (action.type === "TO_PERSONAL") {
    return { isPersonal: true };
  }

  // Team 변경
  if (action.type === "TO_OTHER_TEAM") {
    return { isPersonal: false };
  }

  throw new Error("TeamStateContext - Unhandled action");
}

const initialState: TeamState = {
  isPersonal: true,
};

export function TeamContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [teamState, teamDispatch] = useReducer(teamReducer, initialState);

  return (
    <TeamDispatchContext.Provider value={teamDispatch}>
      <TeamStateContext.Provider value={teamState}>
        {children}
      </TeamStateContext.Provider>
    </TeamDispatchContext.Provider>
  );
}

export function useTeamState() {
  const state = useContext(TeamStateContext);
  if (!state) throw new Error("TeamContext - TeamStateProvider not found");
  return state;
}

export function useTeamDispatch() {
  const dispatch = useContext(TeamDispatchContext);
  if (!dispatch) {
    throw new Error("TeamContext - TeamDispatchProvider not found");
  }
  return dispatch;
}
