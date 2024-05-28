import { apiSlice } from './apiSlice'; // Ensure this path is correct

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/users/auth',
                method: 'POST',
                body: credentials,
            }),
            keepUnusedDataFor: 24*60*60,
        }),
        register: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            keepUnusedDataFor: 24*60*60,
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
        }),
        getProfile: builder.query({
            query: () => '/users/profile',
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
} = authApiSlice;
