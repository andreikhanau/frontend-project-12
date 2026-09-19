import {useAuthStore} from "./authStore";

const API_BASE_URL = '/api/v1';

const request = async (url, options = {}) => {
  const token = useAuthStore.getState().token || localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
};

export const fetchChannels = () => request('/channels');

export const fetchMessages = () => request('/messages');

export const loginRequest = (credentials) =>
  request('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const signUpRequest = (credentials) =>
  request('/signup', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const addChannelRequest = (channelData) =>
  request('/channels', {
    method: 'POST',
    body: JSON.stringify(channelData),
  });

export const editChannelRequest = ({ id, name }) =>
  request(`/channels/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  });

export const removeChannelRequest = (id) =>
  request(`/channels/${id}`, {
    method: 'DELETE',
  });

export const sendMessageRequest = ({ channelId, body, username }) =>
  request('/messages', {
    method: 'POST',
    body: JSON.stringify({ channelId, body, username }),
  });