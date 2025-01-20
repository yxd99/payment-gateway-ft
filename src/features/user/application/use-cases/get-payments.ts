import { fetchPayments } from '@features/user/application/services/fetch-payments';
import { Pagination } from '@features/user/application/ports/pagination';

export const getPayments = (props: Pagination & { email: string }) => {
  return fetchPayments(props);
};
