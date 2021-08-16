const config = {
  firebaseBaseUrl: "https://otus-js-chat-4ed79-default-rtdb.firebaseio.com",
  firebaseCollection: "messages.json",
};

export async function getMessagesList(): Promise<MessageList> {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) =>
      Object.values(data).map((el: Messsage) => ({
        ...el,
        date: new Date(el.date),
      }))
    )
    .catch(() => {
      throw new Error("Get message problem");
    });
}

export async function sendMessage(data: Messsage): Promise<boolean> {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch(() => {
      throw new Error("Send message problem");
    });
}

export function observeWithEventSource(cb: (...args: any[]) => void): void {
  const evtSource = new EventSource(
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`
  );

  evtSource.addEventListener("put", (ev: any) => cb(JSON.parse(ev.data).data));
}
