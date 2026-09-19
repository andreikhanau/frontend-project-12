import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import socket from './socket';

function ChannelSocketSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewChannel = (channel) => {
      queryClient.setQueryData(['channels'], (channels = []) => [
        ...channels,
        channel,
      ]);
    };

    const handleRenameChannel = (updatedChannel) => {
      queryClient.setQueryData(['channels'], (channels = []) =>
        channels.map((channel) =>
          channel.id === updatedChannel.id
            ? { ...channel, name: updatedChannel.name }
            : channel
        )
      );
    };

    const handleRemoveChannel = ({ id }) => {
      queryClient.setQueryData(['channels'], (channels = []) =>
        channels.filter((channel) => channel.id !== id)
      );
    };

    socket.on('newChannel', handleNewChannel);
    socket.on('renameChannel', handleRenameChannel);
    socket.on('removeChannel', handleRemoveChannel);

    return () => {
      socket.off('newChannel', handleNewChannel);
      socket.off('renameChannel', handleRenameChannel);
      socket.off('removeChannel', handleRemoveChannel);
    };
  }, [queryClient]);

  return null;
}

export default ChannelSocketSync;
