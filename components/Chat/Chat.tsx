import { MutableRefObject, memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useMount } from 'react-use';



import { useTranslation } from 'next-i18next';



import useRecommands from '@/hooks/useRecommands';
import useUser from '@/hooks/useUser';



import { getEndpoint } from '@/utils/app/api';
import { saveConversation, saveConversations, updateConversation } from '@/utils/app/conversation';
import { QUERY_PROCESS_ENUM } from '@/utils/app/urlQuery';
import { throttle } from '@/utils/data/throttle';



import { ChatBody, Conversation, Message } from '@/types/chat';



import HomeContext from '@/pages/api/home/home.context';



import Spinner from '@/components/Spinner';



import { ChatLoader } from './ChatLoader';
import { MainInput } from './MainInput';
import { UserInitData } from './UserInitData';
import { Welcome } from './Welcome';


interface Props {
  onScrollHeight: (scrollHeight: number) => any;
  stopConversationRef: MutableRefObject<boolean>;
}

export const Chat = memo(({ onScrollHeight, stopConversationRef }: Props) => {
  const { t } = useTranslation('chat');

  const {
    state: {
      selectedConversation,
      conversations,
      loading,
      getUserLoading,
      userStatus,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const { fetchRecommands } = useRecommands();

  const { fetchUserData } = useUser();

  const [spaceholder, setSpaceholder] = useState<number>(200);
  const [currentMessage, setCurrentMessage] = useState<Message>();
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [showScrollDownButton, setShowScrollDownButton] =
    useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(
    async (message: Message, deleteCount = 0, plugin: Plugin | null = null) => {
      if (selectedConversation) {
        let updatedConversation: Conversation;
        if (deleteCount) {
          const updatedMessages = [...selectedConversation.messages];
          for (let i = 0; i < deleteCount; i++) {
            updatedMessages.pop();
          }
          updatedConversation = {
            ...selectedConversation,
            messages: [...updatedMessages, message],
          };
        } else {
          updatedConversation = {
            ...selectedConversation,
            messages: [...selectedConversation.messages, message],
          };
        }
        homeDispatch({
          field: 'selectedConversation',
          value: updatedConversation,
        });
        homeDispatch({ field: 'loading', value: true });
        homeDispatch({ field: 'messageIsStreaming', value: true });
        const chatBody: ChatBody = {
          id: updatedConversation.id,
          model: updatedConversation.model,
          messages: updatedConversation.messages.slice(2),
          key: '',
          prompt: updatedConversation.prompt,
        };
        const endpoint = getEndpoint();
        let body;
        if (!plugin) {
          body = JSON.stringify(chatBody);
        } else {
          body = JSON.stringify({
            ...chatBody,
          });
        }
        const controller = new AbortController();
        const response = await fetch(endpoint, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
          body,
        });
        if (!response.ok) {
          homeDispatch({ field: 'loading', value: false });
          homeDispatch({ field: 'messageIsStreaming', value: false });
          toast.error(response.statusText);
          return;
        }
        const data = response.body;
        if (!data) {
          homeDispatch({ field: 'loading', value: false });
          homeDispatch({ field: 'messageIsStreaming', value: false });
          return;
        }
        if (!plugin) {
          if (updatedConversation.messages.length === 1) {
            const { content } = message;
            const customName =
              content.length > 30 ? content.substring(0, 30) + '...' : content;
            updatedConversation = {
              ...updatedConversation,
              name: customName,
            };
          }
          homeDispatch({ field: 'loading', value: false });
          const reader = data.getReader();
          const decoder = new TextDecoder();
          let done = false;
          let isFirst = true;
          let text = '';
          while (!done) {
            if (stopConversationRef.current === true) {
              controller.abort();
              done = true;
              break;
            }
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            text += chunkValue;
            if (isFirst) {
              isFirst = false;
              const updatedMessages: Message[] = [
                ...updatedConversation.messages,
                { role: 'assistant', content: chunkValue },
              ];
              updatedConversation = {
                ...updatedConversation,
                messages: updatedMessages,
              };
              homeDispatch({
                field: 'selectedConversation',
                value: updatedConversation,
              });
            } else {
              const updatedMessages: Message[] =
                updatedConversation.messages.map((message, index) => {
                  if (index === updatedConversation.messages.length - 1) {
                    return {
                      ...message,
                      content: text,
                    };
                  }
                  return message;
                });
              updatedConversation = {
                ...updatedConversation,
                messages: updatedMessages,
              };
              homeDispatch({
                field: 'selectedConversation',
                value: updatedConversation,
              });
            }
          }

          // chatting end
          fetchUserData()
          if (updatedConversation.messages.length > 1) {
            fetchRecommands(updatedConversation.messages.slice(-2));
          }

          saveConversation(updatedConversation);
          const updatedConversations: Conversation[] = conversations.map(
            (conversation) => {
              if (conversation.id === selectedConversation.id) {
                return updatedConversation;
              }
              return conversation;
            },
          );
          if (updatedConversations.length === 0) {
            updatedConversations.push(updatedConversation);
          }
          homeDispatch({ field: 'conversations', value: updatedConversations });
          saveConversations(updatedConversations);
          homeDispatch({ field: 'messageIsStreaming', value: false });
        } else {
          const { answer } = await response.json();
          const updatedMessages: Message[] = [
            ...updatedConversation.messages,
            { role: 'assistant', content: answer },
          ];
          updatedConversation = {
            ...updatedConversation,
            messages: updatedMessages,
          };
          homeDispatch({
            field: 'selectedConversation',
            value: updateConversation,
          });
          saveConversation(updatedConversation);
          const updatedConversations: Conversation[] = conversations.map(
            (conversation) => {
              if (conversation.id === selectedConversation.id) {
                return updatedConversation;
              }
              return conversation;
            },
          );
          if (updatedConversations.length === 0) {
            updatedConversations.push(updatedConversation);
          }
          homeDispatch({ field: 'conversations', value: updatedConversations });
          saveConversations(updatedConversations);
          homeDispatch({ field: 'loading', value: false });
          homeDispatch({ field: 'messageIsStreaming', value: false });
        }
      }
    },
    [conversations, selectedConversation, stopConversationRef],
  );

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
        setShowScrollDownButton(true);
      } else {
        setAutoScrollEnabled(true);
        setShowScrollDownButton(false);
      }
      // throttledHandleScroll(scrollTop)
      onScrollHeight(scrollTop);
    }
  };

  const throttledHandleScroll = throttle((scrollTop: number) => {
    onScrollHeight(scrollTop);
  }, 350);

  const handleScrollDown = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const scrollDown = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true);
    }
  };
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    if (userStatus === QUERY_PROCESS_ENUM.CHAT) {
      throttledScrollDown();
    }
    selectedConversation &&
      setCurrentMessage(
        selectedConversation.messages[selectedConversation.messages.length - 2],
      );
  }, [selectedConversation, throttledScrollDown]);

  useMount(async () => {
    await fetchUserData();
    fetchRecommands();
  });

  const renderMainChat = () => {
    switch (userStatus) {
      case null:
        return null;
      case QUERY_PROCESS_ENUM.WELCOME:
      case QUERY_PROCESS_ENUM.REGISTER:
      case QUERY_PROCESS_ENUM.LOGIN:
      case QUERY_PROCESS_ENUM.ENTER:
        return <Welcome />;
      case QUERY_PROCESS_ENUM.CHAT:
      case QUERY_PROCESS_ENUM.EXHAUST:
        return <UserInitData />;
    }
  };

  return (
    <div className={`h-full w-full overflow-y-auto relative`}>
      <div
        className="max-h-full overflow-x-hidden"
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {getUserLoading && !selectedConversation ? (
          <div className="text-center text-3xl font-semibold text-[#3C3C3C] dark:text-gray-100">
            <Spinner size="16px" className="mx-auto" />
          </div>
        ) : (
          renderMainChat()
        )}

        {loading && <ChatLoader />}

        <div
          className="w-full"
          style={{
            height: `${spaceholder}px`,
          }}
          ref={messagesEndRef}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full border-transparent bg-gradient-to-b from-transparent via-white to-white pt-6 md:pt-2 stretch gap-3 px-5 mt-4 flex flex-col last:pb-5 md:mt-[52px] md:last:pb-6 lg:px-auto lg:max-w-3xl">
        <MainInput
          handleSend={handleSend}
          setCurrentMessage={setCurrentMessage}
          handleScrollDown={handleScrollDown}
          showScrollDownButton={showScrollDownButton}
          textareaRef={textareaRef}
          setSpaceholder={setSpaceholder}
        />
      </div>
    </div>
  );
});
Chat.displayName = 'Chat';
