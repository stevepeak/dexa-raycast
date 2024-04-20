import { ActionPanel, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PrimaryAction } from "./actions";
import { PreferencesActionSection } from "./actions/preferences";
import { useChat } from "./hooks/useChat";
import { useConversations } from "./hooks/useConversations";
import { ALL_ACCOUNTS, useAccount } from "./hooks/useAccount";
import { useQuestion } from "./hooks/useQuestion";
import { Chat, Conversation, Account } from "./type";
import { ChatView } from "./views/chat";
import { AccountDropdown } from "./views/accounts/dropdown";

export default function Ask(props: { conversation?: Conversation }) {
  const conversations = useConversations();
  const accounts = useAccount();

  const chats = useChat<Chat>(props.conversation ? props.conversation.chats : []);
  const question = useQuestion({ initialQuestion: "", disableAutoLoad: props.conversation ? true : false });

  const [conversation, setConversation] = useState<Conversation>(
    props.conversation ?? {
      id: uuidv4(),
      chats: [],
      account: ALL_ACCOUNTS,
      pinned: false,
      updated_at: "",
      created_at: new Date().toISOString(),
    }
  );

  const [isLoading] = useState<boolean>(true);

  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    props.conversation ? props.conversation.account.id : "default"
  );

  useEffect(() => {
    if (props.conversation?.id !== conversation.id || conversations.data.length === 0) {
      conversations.add(conversation);
    }
  }, []);

  useEffect(() => {
    conversations.update(conversation);
  }, [conversation]);

  useEffect(() => {
    if (accounts.data && conversation.chats.length === 0) {
      const defaultUserAccount = accounts.data.find((x) => x.id === ALL_ACCOUNTS.id) ?? conversation.account;
      setConversation({ ...conversation, account: defaultUserAccount, updated_at: new Date().toISOString() });
    }
  }, [accounts.data]);

  useEffect(() => {
    const updatedConversation = { ...conversation, chats: chats.data, updated_at: new Date().toISOString() };
    setConversation(updatedConversation);
  }, [chats.data]);

  useEffect(() => {
    const selectedAccount = accounts.data.find((x) => x.id === selectedAccountId);
    setConversation({
      ...conversation,
      account: selectedAccount ?? { ...conversation.account },
      updated_at: new Date().toISOString(),
    });
  }, [selectedAccountId]);

  const getActionPanel = (question: string, account: Account) => (
    <ActionPanel>
      <PrimaryAction title="Get Answer" onAction={() => chats.ask(question, account)} />
      <PreferencesActionSection />
    </ActionPanel>
  );

  return (
    <List
      searchText={question.data}
      isShowingDetail={chats.data.length > 0 ? true : false}
      filtering={false}
      isLoading={isLoading ? isLoading : question.isLoading ? question.isLoading : chats.isLoading}
      onSearchTextChange={question.update}
      throttle={false}
      navigationTitle={"Ask"}
      actions={
        !question.data ? (
          <ActionPanel>
            <PreferencesActionSection />
          </ActionPanel>
        ) : (
          getActionPanel(question.data, conversation.account)
        )
      }
      selectedItemId={chats.selectedChatId || undefined}
      searchBarAccessory={
        <AccountDropdown accounts={accounts.data} onAccountChange={setSelectedAccountId} selectedAccount={selectedAccountId} />
      }
      onSelectionChange={(id) => {
        if (id !== chats.selectedChatId) {
          chats.setSelectedChatId(id);
        }
      }}
      searchBarPlaceholder={chats.data.length > 0 ? "Ask another question..." : "Ask a question..."}
    >
      <ChatView
        data={chats.data}
        question={question.data}
        setConversation={setConversation}
        use={{ chats }}
        account={conversation.account}
        accounts={accounts.data}
        selectedAccount={selectedAccountId}
        onAccountChange={setSelectedAccountId}
      />
    </List>
  );
}
