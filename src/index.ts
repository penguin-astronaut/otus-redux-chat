import { pushMessage } from "./actionsCreater";
import { initMessageList, initListeners, renderApp } from "./domActions";
import { observeWithEventSource } from "./messageApi";
import { store } from "./store";
import "./style.scss";

store.subscribe(renderApp);

initMessageList();
initListeners();

observeWithEventSource((data: any) => {
  if (!Object.keys(data).includes("message")) {
    return;
  }
  const message: Messsage = { ...data, date: new Date(data.date) };

  store.dispatch(pushMessage(message));
});
