import { initListeners, initMessageList, renderApp } from "./domActions";
import { getMessagesList, sendMessage } from "./messageApi";
import { store } from "./store";

beforeEach(() => {
  document.body.innerHTML = `
      <div class="app">
        <div class="chat">
          <div class="chat-messages"></div>
          <div class="chat-send">
            <div class="chat-settings">
              <div class="chat-settings__name">
                Nickname:
                <input class="chat-settings__name-input" type="text" /><button
                  class="chat-settings__name-update"
                >
                  Save
                </button>
              </div>
            </div>
            <div class="chat-send__wrapper">
              <div class="chat-send__message" contenteditable="true"></div>
              <button class="chat-send__button">Send</button>
            </div>
          </div>
        </div>
      </div>
    `;
  store.subscribe(renderApp);
  global.alert = jest.fn();
});

jest.mock("./messageApi", () => ({
  __esModule: true, // this property makes it work
  getMessagesList: jest.fn(() => [
    { date: new Date(), message: "test", name: "nick" },
    { date: new Date(), message: "test2", name: "nick2" },
  ]),
  sendMessage: jest.fn(),
}));

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("test app", () => {
  it("init message list and render app", async () => {
    expect(document.querySelectorAll(".chat-message").length).toBe(0);
    await initMessageList();
    expect(getMessagesList).toHaveBeenCalled();
    await sleep(20);
    expect(document.querySelectorAll(".chat-message").length).toBe(2);
  });
  describe("listeners", () => {
    let input: HTMLDivElement | HTMLInputElement;
    let button: HTMLButtonElement;
    beforeEach(() => {
      initListeners();
    });
    describe("nickname listener", () => {
      beforeEach(() => {
        input = document.querySelector(".chat-settings__name-input");
        button = document.querySelector(
          ".chat-settings__name-update"
        ) as HTMLButtonElement;
      });
      it("change nickname success", async () => {
        (input as HTMLInputElement).value = "Test";
        button.click();
        expect(store.getState().name).toBe("Test");
      });
      it("change nickname false", () => {
        (input as HTMLInputElement).value = "";
        button.click();
        expect(alert).toHaveBeenCalledWith("Nickname can't be null!");
      });
    });

    describe("send message listener", () => {
      beforeEach(() => {
        input = document.querySelector(".chat-send__message") as HTMLDivElement;
        button = document.querySelector(
          ".chat-send__button"
        ) as HTMLButtonElement;
      });
      it("send ok", async () => {
        input.innerHTML = "Test message";
        button.click();
        expect(sendMessage).toHaveBeenCalled();
      });
      it("change nickname false", () => {
        input.innerHTML = "";
        button.click();
        expect(sendMessage).not.toHaveBeenCalled();
      });
    });
  });
});
