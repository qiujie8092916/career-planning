import {Dispatch, FC, RefObject, SetStateAction, useContext} from 'react';

import { Introduce } from './Introduce';

import { QUERY_PROCESS_ENUM } from '@/utils/app/urlQuery';

import { Message } from '@/types/chat';

import { ChatInput } from './ChatInput';
import { EnterInfomation } from './EnterInfomation';
import useUrlQuery from "@/hooks/useUrlQuery";
import HomeContext from "@/pages/api/home/home.context";
import {Welcome} from "@/components/Chat/Welcome";

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
      case QUERY_PROCESS_ENUM.WELCOME:
        return <Introduce />
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
