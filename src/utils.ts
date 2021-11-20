export function smileReplace(text: string): string {
  interface Smiles {
    [key: string]: string;
  }
  const smiles: Smiles = {
    ":-)": "img/smile.svg",
    ":-(": "img/sad.svg",
    ":-D": "img/laugh.svg",
  };
  let formattedText: string = text ?? "";
  Object.keys(smiles).forEach((emotion: keyof Smiles) => {
    const emotionEscaped = (emotion as string).replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const re = new RegExp(emotionEscaped, "g");
    formattedText = formattedText.replace(
      re,
      `<img class="chat-message__smile" src='${smiles[emotion]}'>`
    );
  });

  return formattedText;
}
