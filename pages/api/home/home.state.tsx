import { Conversation, Message } from '@/types/chat';
import { ErrorMessage } from '@/types/error';
import { OpenAIModel, OpenAIModelID } from '@/types/openai';
import { Prompt } from '@/types/prompt';
import {QUERY_PROCESS_ENUM} from "@/utils/app/urlQuery";

export interface UserData {
  data_time_range: number;
  college_count: number;
  college_985_count: number;
  college_211_count: number;
  most_recommend: { value: string }[];
  basic_info: {
    location: string;
    rank: number;
    score: number;
    subject: string;
  };
}

export interface HomeInitialState {
  logoutLoading: boolean;
  getUserLoading: boolean,
  userStatus: QUERY_PROCESS_ENUM | null;
  userData: UserData | null | {};
  recommendLoading: boolean;
  recommendData: string[];
  scrollHeight: number;
  loading: boolean;
  lightMode: 'light' | 'dark';
  messageIsStreaming: boolean;
  modelError: ErrorMessage | null;
  models: OpenAIModel[];
  conversations: Conversation[];
  selectedConversation: Conversation | undefined;
  currentMessage: Message | undefined;
  prompts: Prompt[];
  showChatbar: boolean;
  showPromptbar: boolean;
  messageError: boolean;
  searchTerm: string;
  defaultModelId: OpenAIModelID | undefined;
  serverSideApiKeyIsSet: boolean;
  serverSidePluginKeysSet: boolean;
}

export const initialState: HomeInitialState = {
  logoutLoading: false,
  getUserLoading: false,
  userStatus: null,
  userData: null,
  recommendLoading: false,
  recommendData: [],
  scrollHeight: 0,
  loading: false,
  lightMode: 'dark',
  messageIsStreaming: false,
  modelError: null,
  models: [],
  conversations: [],
  selectedConversation: undefined,
  currentMessage: undefined,
  prompts: [],
  showPromptbar: true,
  showChatbar: true,
  messageError: false,
  searchTerm: '',
  defaultModelId: undefined,
  serverSideApiKeyIsSet: false,
  serverSidePluginKeysSet: false,
};
