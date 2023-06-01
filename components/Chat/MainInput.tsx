import {QUERY_PROCESS_ENUM} from '@/utils/app/urlQuery';
import {useRouter} from 'next/router';
import {ChatInput} from './ChatInput';
import {Dispatch, FC, RefObject, SetStateAction} from 'react';
import {EnterInfomation} from './EnterInfomation';
import {Message} from '@/types/chat';
import {useMount} from "react-use";
import useUser from "@/hooks/useUser";

interface Props {
  handleSend: (message: Message, deleteCount?: number, plugin?: Plugin | null) => Promise<void>
  setCurrentMessage: Dispatch<SetStateAction<Message | undefined>>;
  handleScrollDown: () => void;
  showScrollDownButton: boolean;
  textareaRef: RefObject<HTMLTextAreaElement>;
  setSpaceholder: Dispatch<SetStateAction<number>>;
}

export const MainInput: FC<Props> = ({ handleSend,  setCurrentMessage, handleScrollDown, showScrollDownButton, textareaRef, setSpaceholder }) => {
  const router = useRouter();
  const { pathname, query } = router;
  const { process } = query as { process?: QUERY_PROCESS_ENUM };

  const { fetchUserData } = useUser()

  const setUrlQuery = (value: any, key = 'process') => {
    router.push({
      pathname,
      query: {
        ...query,
        [key]: value
      }
    })
  }

  useMount(() => {
    fetchUserData()
  })

  const render = () => {
    switch (process) {
      default:
      case QUERY_PROCESS_ENUM.ENTER:
        return (<EnterInfomation setSpaceholder={setSpaceholder} setUrlQuery={setUrlQuery} />)
      case QUERY_PROCESS_ENUM.REGISTER:
        return null
      case QUERY_PROCESS_ENUM.LOGIN:
        return null
      case QUERY_PROCESS_ENUM.CHAT:
        return (<ChatInput
          setSpaceholder={setSpaceholder}
          textareaRef={textareaRef}
          onSend={(message) => {
            setCurrentMessage(message);
            handleSend(message, 0);
          }}
          onScrollDownClick={handleScrollDown}
          showScrollDownButton={showScrollDownButton}
        />)
    }
  }


  return render()
}
