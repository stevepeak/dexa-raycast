<p align="center">
<img width=100 src="https://github.com/abielzulio/chatgpt-raycast/blob/main/assets/icon@dark.png?raw=true">
</p>

<h1 align="center">Dexa</h1>

<h3 align="center">
Chat with Dexa right from your command bar
</h3>

<p align="center">
<a title="Install Dexa Raycast Extension" href="#"><img src="https://www.raycast.com/abielzulio/chatgpt/install_button@2x.png" style="height: 64px;" alt="" height="64"></a>
</p>

<p align="center">
<a href="#" title="Dexa Raycast extension latest source code">Latest source code
</a>
</p>


# How to use

> All the preferences value will be stored locally using [Preferences API](https://developers.raycast.com/api-reference/preferences)

# Preferences

All preferences properties list that can be customize through `Raycast Settings > Extensions > ChatGPT`

| Properties               | Label                  | Value                               | Required | Default | Description                                                                                                      |
| ------------------------ | ---------------------- | ----------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `useStream`              | Stream Completion      | `boolean`                           | `true`   | `true`  | Stream the completions of the generated answer                                                                   |
| `isAutoSaveConversation` | Auto-save Conversation | `boolean`                           | `true`   | `true`  | Auto-save every conversation that you had with the model                                                         |
| `isAutoLoadText`         | Auto-load              | `boolean`                           | `false`  | `false` | Load selected text from your frontmost application to the `question bar` or `full text input form` automatically |
| `isAutoTTS`              | Text-to-Speech         | `boolean`                           | `false`  | `false` | Enable auto text-to-speech everytime you get a generated answer                                                  |
