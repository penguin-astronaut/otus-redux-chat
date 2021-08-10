import { getMessagesList } from './messageApi'
import { store } from './store'
import './style.scss'

const chatMessages: HTMLDivElement = document.querySelector('.chat-messages');
async function renderMessageList() {
  const messages = await getMessagesList();
  store.dispatch({type:"PUSH_MESSAGES", payload: messages.slice(-20)})
  store.getState().mesages.forEach((message: Messsage) => {
    const messageTemplate = `
    <div class="chat-message">
      <div class="chat-message__nickname">${message.name}:</div>
      <div class="chat-message__text">${message.message}</div>
    </div>
    `
    chatMessages.insertAdjacentHTML('beforeend', messageTemplate)
  })
}

renderMessageList()

