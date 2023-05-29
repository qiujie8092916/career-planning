import { Conversation } from './chat';
import { Prompt } from './prompt';

// keep track of local storage schema
export interface LocalStorage {
  apiKey: string;
  conversationHistory: Conversation[];
  selectedConversation: Conversation;
  theme: 'light' | 'dark';
  prompts: Prompt[];
  // added showChatbar and showPromptbar (3/26/23)
  showChatbar: boolean;
  showPromptbar: boolean;
}
