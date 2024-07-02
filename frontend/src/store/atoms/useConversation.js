import {atom} from "recoil";

export const selectedConversation = atom({
  key: "selectedConversation",
  default: ""
})

export const messages = atom({
  key: "messages",
  default: []
})