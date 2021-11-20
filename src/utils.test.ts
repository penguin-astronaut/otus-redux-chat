import { smileReplace } from "./utils";

describe("utils test", () => {
  it("smile replace return with replace smile", () => {
    expect(smileReplace("some text :-)")).toBe(
      "some text <img class=\"chat-message__smile\" src='img/smile.svg'>"
    );
    expect(smileReplace("some text :-(")).toBe(
      "some text <img class=\"chat-message__smile\" src='img/sad.svg'>"
    );
    expect(smileReplace("some text :-D")).toBe(
      "some text <img class=\"chat-message__smile\" src='img/laugh.svg'>"
    );
  });
  it("smile replace return previos text without smile", () => {
    expect(smileReplace("some text without smile")).toBe(
      "some text without smile"
    );
  });
});
