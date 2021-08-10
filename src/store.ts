import { createStore } from "redux";

interface State {
  mesages: MessageList;
  name: string;
}

interface Action {
  type: string;
  payload?: any;
}

function chatReducer(
  state: State = { name: "", mesages: [] },
  action: Action
): State {
  switch (action.type) {
    case "PUSH_MESSAGES":
      return {
        ...state,
        mesages: [...state.mesages, ...action.payload],
      };
    case "PUSH_MESSAGE":
      return {
        ...state,
        mesages: [...state.mesages, action.payload],
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}

export const store = createStore(chatReducer);
