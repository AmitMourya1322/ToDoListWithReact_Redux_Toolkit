import { apiSlice } from './apiSlice';
import { ITEM_URL } from '../constants';

export const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getList: builder.query({
      query: () => ({
        url: ITEM_URL,
        credentials: 'include', // Include credentials
      }),
      providesTags: ['Items'],
    }),
    createItem: builder.mutation({
      query: (newItem) => ({
        url: ITEM_URL,
        method: 'POST',
        body: newItem,
        credentials: 'include', // Include credentials
      }),
      invalidatesTags: ['Items'],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `${ITEM_URL}/${id}`,
        method: 'DELETE',
        credentials: 'include', // Include credentials
      }),
      invalidatesTags: ['Items'],
    }),
  }),
});

export const {
  useGetListQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
} = itemApiSlice;
