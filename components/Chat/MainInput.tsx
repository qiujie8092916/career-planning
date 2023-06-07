import { Dispatch, FC, RefObject, SetStateAction, useContext } from 'react';



import { QUERY_PROCESS_ENUM } from '@/utils/app/urlQuery';



import { Message } from '@/types/chat';



import HomeContext from '@/pages/api/home/home.context';



import { ChatInput } from './ChatInput';
import { EnterInfomation } from './EnterInfomation';
import { Exhaust } from './Exhaust';
import { Introduce } from './Introduce';
import { Login } from './Login';
import { Register } from './Register';


export interface Props {
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
        return null;
      case QUERY_PROCESS_ENUM.WELCOME:
        return <Introduce setSpaceholder={setSpaceholder} />;
      case QUERY_PROCESS_ENUM.REGISTER:
        return <Register setSpaceholder={setSpaceholder} />;
      case QUERY_PROCESS_ENUM.LOGIN:
        return <Login setSpaceholder={setSpaceholder} />;
      case QUERY_PROCESS_ENUM.ENTER:
        return <EnterInfomation setSpaceholder={setSpaceholder} />;
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
      case QUERY_PROCESS_ENUM.EXHAUST:
        return <Exhaust setSpaceholder={setSpaceholder} />;
    }
  };

  return render();
};
