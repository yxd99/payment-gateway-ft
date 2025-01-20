import { config } from '@/config/envs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaymentAcceptanceApiTokenResponse } from '@features/checkout/application/ports/payment-acceptance-api-token-response';

export const checkoutApiService = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiUrl,
  }),
  endpoints: (builder) => ({
    submitPayment: builder.mutation({
      query: (payload) => ({
        url: '/payments',
        method: 'POST',
        body: payload,
      }),
    }),
    getAcceptanceTokens: builder.query<PaymentAcceptanceApiTokenResponse, void>(
      {
        query: () => ({
          url: '/payments/acceptance-token',
          method: 'GET',
        }),
        transformResponse: (response: {
          data: PaymentAcceptanceApiTokenResponse;
        }) => response.data,
      }
    ),
  }),
});

export const { useSubmitPaymentMutation, useGetAcceptanceTokensQuery } =
  checkoutApiService;
