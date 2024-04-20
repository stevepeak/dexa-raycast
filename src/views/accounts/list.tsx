import { List } from "@raycast/api";
import { Account } from "../../type";

export const AccountListView = ({
  title,
  accounts,
}: {
  title: string;
  accounts: Account[];
  selectedAccount: string | null;
}) => (
  <List.Section title={title} subtitle={accounts.length.toLocaleString()}>
    {accounts.map((account) => (
      <AccountListItem key={account.id} account={account}  />
    ))}
  </List.Section>
);

export const AccountListItem = ({
  account,
}: {
  account: Account;
}) => {
  return (
    <List.Item
      id={account.id}
      key={account.id}
      title={account.name}
      detail={<AccountDetailView account={account} />}
    />
  );
};

const AccountDetailView = (props: { account: Account; markdown?: string | null | undefined }) => {
  const { markdown } = props;

  return (
    <List.Item.Detail
      markdown={markdown}
      metadata={
        <List.Item.Detail.Metadata>
          <List.Item.Detail.Metadata.TagList title="Account">
            <List.Item.Detail.Metadata.TagList.Item text="<Metadata.TagList.Item>" />
          </List.Item.Detail.Metadata.TagList>
          <List.Item.Detail.Metadata.Separator />
        </List.Item.Detail.Metadata>
      }
    />
  );
};
