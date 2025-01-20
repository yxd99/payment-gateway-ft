/* eslint-disable react-hooks/rules-of-hooks */
import { useGetPaymentsQuery } from '@/features/user/infrastructure/redux/api-service';
import { Pagination } from '../ports/pagination';

export const fetchPayments = (params: Pagination & { email: string }) => {
  const { data, ...rest } = useGetPaymentsQuery(params);

  const payments = data ?? [];
  return { payments, ...rest };
};
