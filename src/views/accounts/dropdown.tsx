import { List } from "@raycast/api";
import { ChangeAccountProp } from "../../type";

export const AccountDropdown = (props: ChangeAccountProp) => {
  const { accounts, onAccountChange: onModelChange, selectedAccount: selectedModel } = props;
  const separateDefaultModel = accounts.filter((x) => x.id !== "default");
  const defaultModel = accounts.find((x) => x.id === "default");
  return (
    <List.Dropdown
      tooltip="Select Model"
      storeValue={true}
      defaultValue={selectedModel}
      onChange={(id) => {
        onModelChange(id);
      }}
    >
      {defaultModel && <List.Dropdown.Item key={defaultModel.id} title={defaultModel.name} value={defaultModel.id} />}
      <List.Dropdown.Section title="Accounts">
        {separateDefaultModel.map((account) => (
          <List.Dropdown.Item key={account.id} title={account.name} value={account.id} />
        ))}
      </List.Dropdown.Section>
    </List.Dropdown>
  );
};
