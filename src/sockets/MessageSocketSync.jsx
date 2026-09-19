import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import socket from './socket';

function MessageSocketSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewMessage = (message) => {
      queryClient.setQueryData(['messages'], (messages = []) => [
        ...messages,
        message,
      ]);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [queryClient]);

  return null;
}

export default MessageSocketSync;
