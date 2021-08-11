declare interface Messsage {
  date: Date;
  message: string;
  name: string;
}

declare interface MessageFromApi {
  date: string;
  message: string;
  name: string;
}

declare type MessageList = Messsage[];
