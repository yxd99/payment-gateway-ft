import { config } from '@/config/envs';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@features/products/core/product';
import { Pagination } from '@features/products/application/ports/pagination';

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
      transformResponse: (response: Record<string, unknown>): Product[] => response.data as Product[],
      merge: (current, next) => {
        current.push(...next);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      }
    }),
    getProductById: builder.query({
      keepUnusedDataFor: 5,
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: Record<string, unknown>): Product => response.data as Product,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiService;
