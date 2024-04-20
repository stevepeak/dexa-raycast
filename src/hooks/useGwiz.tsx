import { getPreferenceValues } from "@raycast/api";
import { useState } from "react";
import { Account, Message } from "../type";

export function useGwiz() {
  const [Gwiz] = useState(() => {
    const apiKey = getPreferenceValues<{
      api: string;
    }>().api;

    return new GwizAPI({ apiKey });
  });

  return Gwiz;
}

class GwizAPI {
  apiKey;

  constructor({ apiKey }: { apiKey: string }) {
    this.apiKey = apiKey;
  }

  ask({ messages, account }: { messages: Message[]; account: Account }): Promise<{ answer: string }> {
    return new Promise((resolve) => {
      const lastMessage = messages[messages.length - 1];
      resolve({ answer: `${lastMessage.content} is a good question!` });
    });
  }
}
