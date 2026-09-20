const API_BASE_URL = '/api/v1';

const request = async (url, options = {}, token = null) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const responseText = await response.text();
  return responseText ? JSON.parse(responseText) : null;
};


export const fetchChannels = (token) => request('/channels', {}, token);

export const fetchMessages = (token) => request('/messages', {}, token);

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

export const addChannelRequest = (channelData, token) =>
  request('/channels', {
    method: 'POST',
    body: JSON.stringify(channelData),
  }, token);

export const editChannelRequest = ({ id, name }, token) =>
  request(`/channels/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  }, token);

export const removeChannelRequest = (id, token) =>
  request(`/channels/${id}`, {
    method: 'DELETE',
  }, token);

export const sendMessageRequest = ({ channelId, body, username }, token) =>
  request('/messages', {
    method: 'POST',
    body: JSON.stringify({ channelId, body, username }),
  }, token);