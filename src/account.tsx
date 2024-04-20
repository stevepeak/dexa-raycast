import { Icon, List } from "@raycast/api";
import { useState } from "react";
import { ALL_ACCOUNTS, useAccount } from "./hooks/useAccount";
import { AccountListItem, AccountListView } from "./views/accounts/list";

export default function Account() {
  const accounts = useAccount();
  const [searchText, setSearchText] = useState<string>("");
  const [selectedAccountlId, setSelectedModelId] = useState<string | null>(null);

  const filteredAccounts = accounts.data
    .filter((value, index, self) => index === self.findIndex((account) => account.id === value.id))
    .filter((account) => {
      if (searchText === "") {
        return true;
      }
      return account.name.toLowerCase().includes(searchText.toLowerCase());
    });

  const defaultAccountOnly = filteredAccounts.find((x) => x.id === ALL_ACCOUNTS.id) ?? ALL_ACCOUNTS;

  const singleAccountsOnly = filteredAccounts.filter((x) => x.id !== ALL_ACCOUNTS.id);

  return (
    <List
      isShowingDetail={filteredAccounts.length === 0 ? false : true}
      isLoading={accounts.isLoading}
      filtering={false}
      throttle={false}
      navigationTitle={"Accounts"}
      selectedItemId={selectedAccountlId || undefined}
      onSelectionChange={(id) => {
        if (id !== selectedAccountlId) {
          setSelectedModelId(id);
        }
      }}
      searchBarPlaceholder="Search account..."
      searchText={searchText}
      onSearchTextChange={setSearchText}
    >
      {accounts.data.length === 0 ? (
        <List.EmptyView title="No accounts found" icon={Icon.Stars} />
      ) : (
        <>
          <AccountListItem key="default" account={defaultAccountOnly} />
          <AccountListView
            key="accounts"
            title="Accounts"
            accounts={singleAccountsOnly.filter((x) => !x.pinned)}
            selectedAccount={selectedAccountlId}
          />
        </>
      )}
    </List>
  );
}
