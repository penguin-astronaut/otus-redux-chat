import { Action } from "./store";

export const pushMessage = (message: Messsage): Action => ({
  type: "PUSH_MESSAGE",
  payload: message,
});

export const pushMessages = (messages: MessageList): Action => ({
  type: "PUSH_MESSAGES",
  payload: messages,
});

export const setName = (name: string): Action => ({
  type: "SET_NAME",
  payload: name,
});
