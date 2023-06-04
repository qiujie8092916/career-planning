import { useContext } from 'react';

import HomeContext from '@/pages/api/home/home.context';

import { MemoizedChatMessage } from './MemoizedChatMessage';

export const UserInitData = () => {
  const {
    state: { selectedConversation },
  } = useContext(HomeContext);

  return (
    <>
      {selectedConversation?.messages.map((message, index) => (
        <MemoizedChatMessage
          key={index}
          message={message}
          messageIndex={index}
        />
      ))}
    </>
  );
};
