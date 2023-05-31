import {QUERY_PROCESS_ENUM} from '@/utils/app/urlQuery';
import {useRouter} from 'next/router';
import {ChatInput} from './ChatInput';
import {Dispatch, FC, MutableRefObject, RefObject, SetStateAction} from 'react';
import {EnterInfomation} from './EnterInfomation';
import {Message} from '@/types/chat';

interface Props {
  handleSend: (message: Message, deleteCount?: number, plugin?: Plugin | null) => Promise<void>
  currentMessage?: Message;
  setCurrentMessage: Dispatch<SetStateAction<Message | undefined>>;
  handleScrollDown: () => void;
  showScrollDownButton: boolean;
  textareaRef: RefObject<HTMLTextAreaElement>;
  stopConversationRef: MutableRefObject<boolean>;
  setSpaceholder: Dispatch<SetStateAction<number>>;
}

export const MainInput: FC<Props> = ({ handleSend, currentMessage, setCurrentMessage, handleScrollDown, showScrollDownButton, textareaRef, stopConversationRef, setSpaceholder }) => {
  const router = useRouter();
  const { process } = router.query as { process?: QUERY_PROCESS_ENUM };

  const render = () => {
    switch (process) {
      default:
      case QUERY_PROCESS_ENUM.ENTER:
        return (<EnterInfomation setSpaceholder={setSpaceholder} />)
      case QUERY_PROCESS_ENUM.REGISTER:
        return null
      case QUERY_PROCESS_ENUM.LOGIN:
        return null
      case QUERY_PROCESS_ENUM.CHAT:
        return (<ChatInput
          stopConversationRef={stopConversationRef}
          textareaRef={textareaRef}
          onSend={(message) => {
            setCurrentMessage(message);
            handleSend(message, 0);
          }}
          onScrollDownClick={handleScrollDown}
          onRegenerate={() => {
            if (currentMessage) {
              handleSend(currentMessage, 2, null);
            }
          }}
          showScrollDownButton={showScrollDownButton}
        />)
    }
  }


  return render()
}
