import {
  IconArrowDown,
  IconPlayerStop,
  IconRepeat,
  IconSend,
} from '@tabler/icons-react';
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useTranslation } from 'next-i18next';

import { Message } from '@/types/chat';

import HomeContext from '@/pages/api/home/home.context';

interface Props {
  onSend: (message: Message) => void;
  onRegenerate: () => void;
  onScrollDownClick: () => void;
  stopConversationRef: MutableRefObject<boolean>;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  showScrollDownButton: boolean;
}

export const ChatInput = ({
  onSend,
  onRegenerate,
  onScrollDownClick,
  stopConversationRef,
  textareaRef,
  showScrollDownButton,
}: Props) => {
  const { t } = useTranslation('chat');

  const {
    state: { selectedConversation, messageIsStreaming, prompts },
  } = useContext(HomeContext);

  const [content, setContent] = useState<string>();
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const promptListRef = useRef<HTMLUListElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const maxLength = selectedConversation?.model.maxLength;

    if (maxLength && value.length > maxLength) {
      alert(
        t(
          `Message limit is {{maxLength}} characters. You have entered {{valueLength}} characters.`,
          { maxLength, valueLength: value.length },
        ),
      );
      return;
    }

    setContent(value);
  };

  const handleSend = () => {
    if (messageIsStreaming) {
      return;
    }

    if (!content) {
      alert(t('Please enter a message'));
      return;
    }

    onSend({ role: 'user', content });
    setContent('');

    if (window.innerWidth < 640 && textareaRef && textareaRef.current) {
      textareaRef.current.blur();
    }
  };

  const handleStopConversation = () => {
    stopConversationRef.current = true;
    setTimeout(() => {
      stopConversationRef.current = false;
    }, 1000);
  };

  const parseVariables = (content: string) => {
    const regex = /{{(.*?)}}/g;
    const foundVariables = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      foundVariables.push(match[1]);
    }

    return foundVariables;
  };

  useEffect(() => {
    if (promptListRef.current) {
      promptListRef.current.scrollTop = activePromptIndex * 30;
    }
  }, [activePromptIndex]);

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
      textareaRef.current.style.overflow = `${
        textareaRef?.current?.scrollHeight > 400 ? 'auto' : 'hidden'
      }`;
    }
  }, [content]);

  return (
    <>
      {messageIsStreaming && (
        <button
          className="mx-auto flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black hover:opacity-50 md:mb-0 md:mt-2"
          onClick={handleStopConversation}
        >
          <IconPlayerStop size={16} /> {t('Stop Generating')}
        </button>
      )}

      {!messageIsStreaming &&
        selectedConversation &&
        selectedConversation.messages.length > 0 && (
          <button
            className="mx-auto flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black hover:opacity-50 md:mb-0 md:mt-2"
            onClick={onRegenerate}
          >
            <IconRepeat size={16} /> {t('Regenerate response')}
          </button>
        )}

      <div className="relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)]">
        <textarea
          ref={textareaRef}
          className="m-0 w-full resize-none border-0 bg-transparent p-0 py-2 pr-8 pl-4 text-black md:py-3 md:pl-4"
          style={{
            resize: 'none',
            bottom: `${textareaRef?.current?.scrollHeight}px`,
            maxHeight: '400px',
            overflow: `${
              textareaRef.current && textareaRef.current.scrollHeight > 400
                ? 'auto'
                : 'hidden'
            }`,
          }}
          placeholder={
            t('Type a message or type "/" to select a prompt...') || ''
          }
          value={content}
          rows={1}
          onChange={handleChange}
        />

        <button
          className="absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900"
          onClick={handleSend}
        >
          {messageIsStreaming ? (
            <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60"></div>
          ) : (
            <IconSend size={18} />
          )}
        </button>

        {showScrollDownButton && (
          <div className="absolute bottom-12 right-0 lg:bottom-0 lg:-right-10">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 text-gray-800 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onScrollDownClick}
            >
              <IconArrowDown size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
