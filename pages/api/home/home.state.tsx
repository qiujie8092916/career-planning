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
  chat_count_left: number;
  invite_code: string;
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
  loading: boolean;
  messageIsStreaming: boolean;
  modelError: ErrorMessage | null;
  models: OpenAIModel[];
  conversations: Conversation[];
  selectedConversation: Conversation | undefined;
  currentMessage: Message | undefined;
  prompts: Prompt[];
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
  loading: false,
  messageIsStreaming: false,
  modelError: null,
  models: [],
  conversations: [],
  selectedConversation: undefined,
  currentMessage: undefined,
  prompts: [],
  messageError: false,
  searchTerm: '',
  defaultModelId: undefined,
  serverSideApiKeyIsSet: false,
  serverSidePluginKeysSet: false,
};
