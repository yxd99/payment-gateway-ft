import { useAppSelector } from '@/store';
import { fetchPayments } from '../services/fetch-payments';

export const getPayments = (page: number, size: number) => {
  const email = useAppSelector((state) => state.user.email);
  return fetchPayments({ email, page, size });
};
