import { Dispatch, FC, RefObject, SetStateAction } from 'react';

import { useRouter } from 'next/router';

import { QUERY_PROCESS_ENUM } from '@/utils/app/urlQuery';

import { Message } from '@/types/chat';

import { ChatInput } from './ChatInput';
import { EnterInfomation } from './EnterInfomation';

interface Props {
  handleSend: (
    message: Message,
    deleteCount?: number,
    plugin?: Plugin | null,
  ) => Promise<void>;
  setCurrentMessage: Dispatch<SetStateAction<Message | undefined>>;
  handleScrollDown: () => void;
  showScrollDownButton: boolean;
  textareaRef: RefObject<HTMLTextAreaElement>;
  setSpaceholder: Dispatch<SetStateAction<number>>;
}

export const MainInput: FC<Props> = ({
  handleSend,
  setCurrentMessage,
  handleScrollDown,
  showScrollDownButton,
  textareaRef,
  setSpaceholder,
}) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { process } = query as { process?: QUERY_PROCESS_ENUM };

  const setUrlQuery = (value: any, key = 'process') => {
    router.push({
      pathname,
      query: {
        ...query,
        [key]: value,
      },
    });
  };
  const render = () => {
    switch (process) {
      default:
      case QUERY_PROCESS_ENUM.ENTER:
        return (
          <EnterInfomation
            setSpaceholder={setSpaceholder}
            setUrlQuery={setUrlQuery}
          />
        );
      case QUERY_PROCESS_ENUM.REGISTER:
        return null;
      case QUERY_PROCESS_ENUM.LOGIN:
        return null;
      case QUERY_PROCESS_ENUM.CHAT:
        return (
          <ChatInput
            setSpaceholder={setSpaceholder}
            textareaRef={textareaRef}
            onSend={(message) => {
              setCurrentMessage(message);
              handleSend(message, 0);
            }}
            onScrollDownClick={handleScrollDown}
            showScrollDownButton={showScrollDownButton}
          />
        );
    }
  };

  return render();
};
