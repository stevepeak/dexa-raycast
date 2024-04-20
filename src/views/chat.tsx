import { ActionPanel, clearSearchBar, Icon, List } from "@raycast/api";
import { v4 as uuidv4 } from "uuid";
import { DestructiveAction, PrimaryAction, TextToSpeechAction } from "../actions";
import { CopyActionSection } from "../actions/copy";
import { PreferencesActionSection } from "../actions/preferences";
import { SaveActionSection } from "../actions/save";
import { ALL_ACCOUNTS } from "../hooks/useAccount";
import { useSavedChat } from "../hooks/useSavedChat";
import { Chat, ChatViewProps } from "../type";
import { AnswerDetailView } from "./answer-detail";
import { EmptyView } from "./empty";

export const ChatView = ({
  data,
  question,
  account,
  setConversation,
  use,
}: ChatViewProps) => {
  const savedChat = useSavedChat();

  const sortedChats = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const getActionPanel = (selectedChat: Chat) => (
    <ActionPanel>
      {question.length > 0 ? (
        <PrimaryAction title="Get Answer" onAction={() => use.chats.ask(question, account)} />
      ) : selectedChat.answer && use.chats.selectedChatId === selectedChat.id ? (
        <>
          <CopyActionSection answer={selectedChat.answer} question={selectedChat.question} />
          <SaveActionSection onSaveAnswerAction={() => savedChat.add(selectedChat)} />
          <ActionPanel.Section title="Output">
            <TextToSpeechAction content={selectedChat.answer} />
          </ActionPanel.Section>
        </>
      ) : null}
      {use.chats.data.length > 0 && (
        <ActionPanel.Section title="Restart">
          <DestructiveAction
            title="Start New Conversation"
            icon={Icon.RotateAntiClockwise}
            dialog={{
              title: "Are you sure you want to start a new conversation?",
              primaryButton: "Start New",
            }}
            onAction={() => {
              setConversation({
                id: uuidv4(),
                chats: [],
                account: ALL_ACCOUNTS,
                pinned: false,
                updated_at: "",
                created_at: new Date().toISOString(),
              });
              use.chats.clear();
              clearSearchBar();
              use.chats.setLoading(false);
            }}
            shortcut={{ modifiers: ["cmd", "shift"], key: "n" }}
          />
        </ActionPanel.Section>
      )}
      <PreferencesActionSection />
    </ActionPanel>
  );

  return sortedChats.length === 0 ? (
    <EmptyView />
  ) : (
    <List.Section title="Results" subtitle={data.length.toLocaleString()}>
      {sortedChats.map((sortedChat, i) => {
        const markdown = `**${sortedChat.question}**\n\n${sortedChat.answer}`;
        return (
          <List.Item
            id={sortedChat.id}
            key={sortedChat.id}
            accessories={[{ text: `#${use.chats.data.length - i}` }]}
            title={sortedChat.question}
            detail={sortedChat.answer && <AnswerDetailView chat={sortedChat} markdown={markdown} />}
            actions={use.chats.isLoading ? undefined : getActionPanel(sortedChat)}
          />
        );
      })}
    </List.Section>
  );
};
