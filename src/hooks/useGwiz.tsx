import { getPreferenceValues } from "@raycast/api";
import { useState } from "react";

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

  ask({ messages }: { messages: any[] }) {
    // TODO
  }
}
