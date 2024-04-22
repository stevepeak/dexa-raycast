import { getPreferenceValues } from "@raycast/api";
import { useState } from "react";
import fetch from "node-fetch";
import { Account, Message } from "../type";

export function useDexa() {
  const [Dexa] = useState(() => {
    const apiKey = getPreferenceValues<{
      api: string;
    }>().api;

    return new DexaAPI({ apiKey });
  });

  return Dexa;
}

class DexaAPI {
  apiKey;

  constructor({ apiKey }: { apiKey: string }) {
    this.apiKey = apiKey;
  }

  async ask({ messages, account }: { messages: Message[]; account: Account }): Promise<{ answer: string }> {
    const response = await fetch("https://dexa.ai/api/ask-dexa", {
      method: "POST",
      body: JSON.stringify({
        secret: this.apiKey,
        messages,
      }),
    });
    const res = await response.json();
    // throw new Error( res);
    return {answer: res};
  }
}
