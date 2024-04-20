import type { ChatCompletionRequestMessage } from "openai";

export type Set<T> = React.Dispatch<React.SetStateAction<T>>;

export type Message = ChatCompletionRequestMessage;

export interface Question {
  id: string;
  question: string;
  created_at: string;
}

export interface Chat extends Question {
  answer: string;
}

export interface SavedChat extends Chat {
  saved_at?: string;
}

export interface Conversation {
  id: string;
  account: Account;
  chats: Chat[];
  updated_at: string;
  created_at: string;
  pinned: boolean;
}

export interface Account {
  id: string;
  name: string;
  pinned: boolean;
}

type PromiseFunctionNoArg = () => Promise<void>;
type PromiseFunctionWithOneArg<T> = (arg: T) => Promise<void>;
type PromiseFunctionWithTwoArg<T, V> = (arg_1: T, arg_2: V) => Promise<void>;

interface BaseFunctionHook<T> {
  add: PromiseFunctionWithOneArg<T>;
  remove: PromiseFunctionWithOneArg<T>;
  clear: PromiseFunctionNoArg;
}

interface BaseHook<T> {
  data: T;
  isLoading: boolean;
}

type CruddableHook<T> = BaseHook<T[]> & BaseFunctionHook<T>;

export type HistoryHook = CruddableHook<Chat>;

export type SavedChatHook = CruddableHook<SavedChat>;

export type ConversationsHook = CruddableHook<Conversation> & { update: PromiseFunctionWithOneArg<Conversation> };

export type QuestionHook = BaseHook<string> & { update: PromiseFunctionWithOneArg<string> };

export type AccountHook = BaseHook<Account[]>;

export interface ChatHook {
  data: Chat[];
  setData: Set<Chat[]>;
  isLoading: boolean;
  setLoading: Set<boolean>;
  selectedChatId: string | null;
  setSelectedChatId: Set<string | null>;
  ask: PromiseFunctionWithTwoArg<string, Account>;
  clear: PromiseFunctionNoArg;
}

export interface ChangeAccountProp {
  accounts: Account[];
  selectedAccount: string;
  onAccountChange: Set<string>;
}

export interface QuestionFormProps extends ChangeAccountProp {
  initialQuestion: string;
  onSubmit: (question: string) => void;
}

export interface ChatViewProps extends ChangeAccountProp {
  data: Chat[];
  question: string;
  account: Account;
  setConversation: Set<Conversation>;
  use: { chats: ChatHook };
}
