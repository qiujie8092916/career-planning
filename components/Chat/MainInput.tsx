import {Dispatch, FC, RefObject, SetStateAction, useContext} from 'react';

import { useRouter } from 'next/router';

import { QUERY_PROCESS_ENUM } from '@/utils/app/urlQuery';

import { Message } from '@/types/chat';

import { ChatInput } from './ChatInput';
import { EnterInfomation } from './EnterInfomation';
import useUrlQuery from "@/hooks/useUrlQuery";
import HomeContext from "@/pages/api/home/home.context";

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
  const {
    state: { userStatus },
  } = useContext(HomeContext);

  const render = () => {
    switch (userStatus) {
      case null:
      case QUERY_PROCESS_ENUM.REGISTER:
      case QUERY_PROCESS_ENUM.LOGIN:
        return null;
      case QUERY_PROCESS_ENUM.ENTER:
        return (
          <EnterInfomation
            setSpaceholder={setSpaceholder}
          />
        );
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
