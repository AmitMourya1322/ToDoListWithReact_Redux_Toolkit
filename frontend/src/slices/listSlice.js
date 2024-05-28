import { ITEM_URL } from "../constants";
import { apiSlice } from "./authApiSlice";

export const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getList: builder.query({
      query: () => ({
        url: ITEM_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Items'],
    }),
    getItemDetails: builder.query({
      query: (itemId) => ({
        url: `${ITEM_URL}/${itemId}`,
        method: 'POST',
      }),
      keepUnusedDataFor: 5,
    }),
    deleteItem:builder.mutation({
        query:(itemId)=>({
            url:`${ITEM_URL}/${itemId}`,
            method:'DELETE',
        }),
        providesTags:['Items']
    })
  }),
});

export const { useGetListQuery, useGetItemDetailsQuery } = itemApiSlice;
