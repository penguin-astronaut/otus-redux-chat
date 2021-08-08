const config = {
  firebaseBaseUrl: "https://otus-js-chat-4ed79-default-rtdb.firebaseio.com",
  firebaseCollection: "messages.json"
};

interface Messsage {
  date: Date,
  message: string,
  nickname: string
}

type MessageList = Messsage[];

export async function getMessagesList(): Promise<MessageList> {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((data) =>
      Object.values(data).map((el: Messsage) => ({
        ...el,
        date: new Date(el.date)
      }))
    );
}

export async function sendMessage(data: Messsage): Promise<boolean> {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    method: "POST",
    body: JSON.stringify({
      ...data,
      date: new Date()
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then((response) => response.json());
}

export function observeWithXHR(cb: (...args: any[]) => void): void {
  // https://firebase.google.com/docs/reference/rest/database#section-streaming
  const xhr = new XMLHttpRequest();
  let lastResponseLength = 0;

  xhr.addEventListener("progress", () => {
    // console.log("xhr body", xhr.response);
    const body = xhr.response.substr(lastResponseLength);
    lastResponseLength = xhr.response.length;

    const eventType = body.match(/event: (.+)/)[1];
    const data = JSON.parse(body.match(/data: (.+)/)[1]);

    if (eventType === "put") {
      cb(data.data);
    }
  });

  xhr.open(
    "POST",
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`,
    true
  );
  xhr.setRequestHeader("Accept", "text/event-stream");

  xhr.send();
}

export function observeWithEventSource(cb: (...args: any[]) => void): void {
  // https://developer.mozilla.org/en-US/docs/Web/API/EventSource/EventSource
  const evtSource = new EventSource(
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`
  );

  evtSource.addEventListener("put", (ev: any) => cb(JSON.parse(ev.data).data));
}