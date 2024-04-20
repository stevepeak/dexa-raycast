import { Icon, List } from "@raycast/api";

export const EmptyView = () => (
  <List.EmptyView
    title="Ask your inbox anything!"
    description={"Type your question into the search bar and hit the enter key"}
    icon={Icon.QuestionMark}
  />
);
