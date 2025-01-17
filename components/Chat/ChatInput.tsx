import { IconArrowDown, IconChevronDown, IconSend } from '@tabler/icons-react';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
  KeyboardEvent
} from 'react';

import { useTranslation } from 'next-i18next';

import { Message } from '@/types/chat';

import HomeContext from '@/pages/api/home/home.context';

import clsx from 'clsx';

interface Props {
  setSpaceholder: Dispatch<SetStateAction<number>>;
  onSend: (message: Message) => void;
  onScrollDownClick: () => void;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  showScrollDownButton: boolean;
}

export const ChatInput = ({
  setSpaceholder,
  onSend,
  onScrollDownClick,
  textareaRef,
  showScrollDownButton,
}: Props) => {
  const { t } = useTranslation('chat');

  const {
    state: { selectedConversation, messageIsStreaming, recommendData },
  } = useContext(HomeContext);

  const [content, setContent] = useState<string>();
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [expansionRecommend, setExpansionRecommend] = useState<boolean>(false);

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
    setExpansionRecommend(false);
    setContent('');

    if (window.innerWidth < 640 && textareaRef && textareaRef.current) {
      textareaRef.current.blur();
    }
  };

  const isMobile = () => {
    const userAgent =
        typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    return mobileRegex.test(userAgent);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isMobile() && e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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

  useEffect(() => {
    setSpaceholder(recommendData.length ? 130 : 80);
  }, [recommendData]);

  return (
    <>
      {/*{messageIsStreaming && (*/}
      {/*  <button*/}
      {/*    className="mx-auto flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black hover:opacity-50 md:mb-0 md:mt-2"*/}
      {/*    onClick={handleStopConversation}*/}
      {/*  >*/}
      {/*    <IconPlayerStop size={16} /> {t('Stop Generating')}*/}
      {/*  </button>*/}
      {/*)}*/}

      {/*{recommendData.length ? (*/}
      {/*  <div className='text-xs text-[#3C3C3C] dark:text-gray-100 flex justify-start'>*/}
      {/*    <div className={clsx('pointer-events-auto w-full overflow-x-auto whitespace-nowrap')}>*/}
      {/*      {recommendData.map(recommand => (*/}
      {/*        <div key={recommand} onClick={() => setContent(recommand)} className='inline-block max-w-[15rem] mr-4 hover:opacity-100 hover:border-gray-100 opacity-90 px-4 py-1.5 rounded-2xl border dark:border-gray-400 bg-gray-50 dark:bg-[#444654] cursor-pointer truncate'>{recommand}</div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*) : null}*/}

      {recommendData.length ? (
        <div
          className={clsx(
            `py-2 text-black text-sm px-4 rounded-md border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)]`,
          )}
        >
          <div
            className="h-[18px] flex justify-between items-center text-[#3C3C3C]"
            onClick={() => setExpansionRecommend(!expansionRecommend)}
          >
            参考问题
            <div className={expansionRecommend ? '' : 'transform rotate-180'}>
              <IconChevronDown size={14} />
            </div>
          </div>
          {expansionRecommend && (
            <div className="text-sm text-[#3C3C3C] pt-2 dark:text-gray-100 flex items-start flex-col gap-3">
              {recommendData.map((recommand) => (
                <div
                  key={recommand}
                  onClick={() => {
                    setContent(recommand);
                  }}
                  className="hover:opacity-100 hover:border-gray-100 opacity-90 px-4 py-1.5 rounded-xl border dark:border-gray-400 bg-gray-50 dark:bg-[#444654] cursor-pointer truncate max-w-full"
                >
                  {recommand}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

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
          placeholder={'点击输入你的疑问...'}
          value={content}
          rows={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
          <div className="absolute bottom-24 right-0 lg:bottom-0 lg:-right-10">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 text-[#3C3C3C] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
