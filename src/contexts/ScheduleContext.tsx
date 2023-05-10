
import React, { useContext, useReducer } from "react";
import { createContext, Dispatch } from "react";

type ScheduleState = {
  isCategory: boolean;
  isTodo: boolean; // false -> 미완료, true -> 완료
};

const ScheduleStateContext = createContext<ScheduleState | undefined>(
  undefined
);

type Action =
  | { type: "COMPLETE_TODO" }
  | { type: "ADD_CATEGORY" }
  | { type: "WRITE_TODO" };

type ScheduleDispatch = Dispatch<Action>;

const ScheduleDispatchContext = createContext<ScheduleDispatch | undefined>(
  undefined
);

const scheduleReducer = (
  state: ScheduleState,
  action: Action
): ScheduleState => {
  // 완료한 todo
  if (action.type === "COMPLETE_TODO") {
    return { ...state, isTodo: true };
  }

  // 미완료 todo
  if (action.type === "ADD_CATEGORY") {
    return { ...state, isCategory: false };
  }

  // 카테고리창 열고 닫기
  if (action.type === "WRITE_TODO") {
    return { ...state, isCategory: !state.isCategory };
  }

  throw new Error("UIContext - Unhandled action");
};

const initialState: ScheduleState = {
  isCategory: false,
  isTodo: false,
};

export function ScheduleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scheduleState, scheduleDispatch] = useReducer(
    scheduleReducer,
    initialState
  );

  return (
    <ScheduleDispatchContext.Provider value={scheduleDispatch}>
      <ScheduleStateContext.Provider value={scheduleState}>
        {children}
      </ScheduleStateContext.Provider>
    </ScheduleDispatchContext.Provider>
  );
}

export function useScheduleState() {
  const state = useContext(ScheduleStateContext);
  if (!state)
    throw new Error("ScheduleContext - ScheduleStateProvider not found");
  return state;
}

export function useScheduleDispatch() {
  const dispatch = useContext(ScheduleDispatchContext);
  if (!dispatch)
    throw new Error("ScheduleContext - ScheduleDispatchProvider not found");
  return dispatch;
}


