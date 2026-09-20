import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  addChannelRequest,
  editChannelRequest,
  fetchChannels,
  fetchMessages,
  loginRequest,
  removeChannelRequest,
  sendMessageRequest,
  signUpRequest,
} from './apiFunctions.js';
import { useAuthStore } from '../stores/useStores.js';

export const useChannelsQuery = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['channels'],
    queryFn: () => fetchChannels(token),
  });
};

export const useMessagesQuery = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['messages'],
    queryFn: () => fetchMessages(token),
  });
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginRequest,
  });

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: signUpRequest,
  });

export const useAddChannelMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (channelData) => addChannelRequest(channelData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['channels'],
      });
    },
  });
};

export const useEditChannelMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (channelData) => editChannelRequest(channelData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['channels'],
      });
    },
  });
};

export const useRemoveChannelMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (channelId) => removeChannelRequest(channelId, token),
    onSuccess: (_removedChannel, channelId) => {
      queryClient.setQueryData(['channels'], (channels = []) =>
        channels.filter((channel) => channel.id !== channelId)
      );
      queryClient.setQueryData(['messages'], (messages = []) =>
        messages.filter((message) => message.channelId !== channelId)
      );
      queryClient.invalidateQueries({
        queryKey: ['channels'],
      });
      queryClient.invalidateQueries({
        queryKey: ['messages'],
      });
    },
  });
};

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (message) => sendMessageRequest(message, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages'],
      });
    },
  });
};