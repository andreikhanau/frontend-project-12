import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Channels", "Messages"],// Define tag types for cache invalidation

  endpoints: (builder) => ({

    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }), 
    }),// Define the login endpoint

    getChannels: builder.query({
      query: () => (
        {
          url: "/channels",
          method: "GET",}
      ),
      providesTags: [{ type: "Channels", id: "LIST" }],
    }),// Define the getChannels endpoint

    addChannel: builder.mutation({
      query: (channelData) => ({
        url: "/channels",
        method: "POST",
        body: channelData,
      }),
      invalidatesTags: [{ type: "Channels", id: "LIST" }],
    }), // Define the addChannel endpoint

    editChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/channels/${id}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: [{ type: "Channels", id: "LIST" }],
    }), // Define the editChannel endpoint

    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }), // Define the signUp endpoint

    getMessages: builder.query({
      query: () => ({
        url: '/messages',
        method: 'GET',
      }),
      providesTags: [{ type: 'Messages', id: 'LIST' }],
    }),// Define the getMessages endpoint

    sendMessage: builder.mutation({
      query: ({ channelId, body, username }) => ({
        url: `/messages`,
        method: "POST",
        body: { body, channelId, username },
      }),
      invalidatesTags: [{ type: "Messages", id: "LIST" }],
    }),// Define the sendMessage endpoint
    
  }),// End of endpoints
});

export const { 
  useLoginMutation, 
  useGetChannelsQuery, 
  useSignUpMutation, 
  useAddChannelMutation, 
  useEditChannelMutation, 
  useSendMessageMutation, 
  useGetMessagesQuery,
} = api;