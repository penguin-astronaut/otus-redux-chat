import { getMessagesList, sendMessage as apiSendMessage } from "./messageApi";
import { store } from "./store";
import "./style.scss";

const chatMessagesContainer: HTMLDivElement =
  document.querySelector(".chat-messages");
const chatMessage: HTMLDivElement = document.querySelector(
  ".chat-send__message"
);
const nicknameInput: HTMLInputElement = document.querySelector(
  ".chat-settings__name-input"
);
async function initMessageList() {
  const messages = await getMessagesList();
  store.dispatch({ type: "PUSH_MESSAGES", payload: messages.slice(-20) });
}

function renderApp() {
  const { mesages, name } = store.getState();
  chatMessagesContainer.innerHTML = "";

  mesages.forEach((message: Messsage) => {
    const messageTemplate = `
    <div class="chat-message">
      <div class="chat-message__nickname">${message.name}:</div>
      <div class="chat-message__text">${message.message}</div>
    </div>
    `;
    chatMessagesContainer.insertAdjacentHTML("beforeend", messageTemplate);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  });

  nicknameInput.value = name;
}

store.subscribe(renderApp);

initMessageList();

document
  .querySelector(".chat-send__button")
  .addEventListener("click", async () => {
    const messageText = chatMessage.innerHTML.trim();
    if (!messageText.length) {
      return;
    }

    const message: Messsage = {
      message: messageText,
      name: store.getState().name,
      date: new Date(),
    };

    try {
      await apiSendMessage(message);
      store.dispatch({ type: "PUSH_MESSAGE", payload: message });
      chatMessage.innerHTML = "";
    } catch (e) {
      alert("There was an error sending your message, please try again later");
    }
  });

document
  .querySelector(".chat-settings__name-update")
  .addEventListener("click", () => {
    const nickname = nicknameInput.value.trim();
    if (!nickname) {
      alert("Nickname can't be null!");
      return;
    }
    store.dispatch({ type: "SET_NAME", payload: nickname });
  });
