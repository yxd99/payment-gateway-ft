import { config } from '@/config/envs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../core/product';

export interface Pagination {
  page: number;
  size: number;
}

export const productsApiService = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiUrl,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, size }: Pagination) => ({
        url: `/products?page=${page}&size=${size}`,
        method: 'GET',
      }),
      transformResponse: (response: any): Product[] => response.data,
      merge: (current, next) => {
        current.push(...next);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
  }),
});

export const { useGetProductsQuery } = productsApiService;
