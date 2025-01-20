import { fetchPayments } from '../services/fetch-payments';
import { Pagination } from '../ports/pagination';

export const getPayments = (props: Pagination & { email: string }) => {
  return fetchPayments(props);
};
