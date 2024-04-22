import { LocalStorage } from "@raycast/api";
import { useEffect, useMemo, useState } from "react";
import { Account, AccountHook } from "../type";

export const ALL_ACCOUNTS: Account = {
  id: "default",
  name: "All accounts",
  pinned: false,
};

export function useAccount(): AccountHook {
  const [data, setData] = useState<Account[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      // TODO when we want accounts
      // const storedAccounts = await LocalStorage.getItem<string>("accounts");
      const storedAccounts = null

      if (!storedAccounts) {
        setData([ALL_ACCOUNTS]);
      } else {
        setData((previous) => [...previous, ...JSON.parse(storedAccounts)]);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    LocalStorage.setItem("accounts", JSON.stringify(data));
  }, [data]);

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
}
