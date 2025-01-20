import { config } from '@/config/envs';
import { Payment } from '@features/user/core/payment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MyPaymentsParams } from '@features/user/application/ports/my-payments-params';

export const userApiService = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiUrl,
  }),
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: ({ email, page, size }: MyPaymentsParams) => ({
        url: `/payments/my-payments/${email}?page=${page}&size=${size}`,
        method: 'GET',
      }),
      transformResponse: (response: Record<string, unknown>): Payment[] => response.data as Payment[],
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
