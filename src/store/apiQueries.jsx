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
} from './apiFunctions';

export const useChannelsQuery = () =>
  useQuery({
    queryKey: ['channels'],
    queryFn: fetchChannels,
  });

export const useMessagesQuery = () =>
  useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
  });

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

  return useMutation({
    mutationFn: addChannelRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['channels'],
      });
    },
  });
};

export const useEditChannelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editChannelRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['channels'],
      });
    },
  });
};

export const useRemoveChannelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeChannelRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['channels'],
      });
    },
  });
};

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessageRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages'],
      });
    },
  });
};