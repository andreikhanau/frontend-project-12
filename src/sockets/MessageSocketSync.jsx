import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function MessageSocketSync({ socket }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewMessage = (message) => {
      queryClient.setQueryData(['messages'], (messages = []) => {
        if (messages.some((item) => item.id === message.id)) {
          return messages;
        }

        return [...messages, message];
      });
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [queryClient, socket]);

  return null;
}

export default MessageSocketSync;
