import { config } from '@/config/envs';
import { Payment } from '@/features/user/core/payment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface MyPaymentsFilter {
  page: number;
  size: number;
  email: string;
}

export const userApiService = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiUrl,
  }),
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: ({ email, page, size }: MyPaymentsFilter) => ({
        url: `/payments/my-payments/${email}?page=${page}&size=${size}`,
        method: 'GET',
      }),
      transformResponse: (response: any): Payment[] => response.data,
      merge: (current, next) => {
        if (current) {
          return [...current, ...next];
        }
        return [...next];
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
  }),
});

export const { useGetPaymentsQuery } = userApiService;
