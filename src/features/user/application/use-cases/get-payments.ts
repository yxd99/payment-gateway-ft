import { useAppSelector } from '@/store';
import { fetchPayments } from '../services/fetch-payments';
import { useEffect, useState } from 'react';
import { Payment } from '../../core/payment';

export const getPayments = (page: number, size: number) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const email = useAppSelector((state) => state.user.email);
  const { payments: paymentQuery, isFetching, ...rest } = fetchPayments({
    email,
    page,
    size,
  });

  useEffect(() => {
    let totalPayments: Payment[] = [];
    if (paymentQuery.length > 0) {
      totalPayments = [...payments, ...paymentQuery];
      setHasMore(true);
    } else {
      totalPayments = [...payments];
      setHasMore(false);
    }

    setPayments([...new Set(totalPayments)]);
  }, [isFetching]);

  return {
    hasMore,
    payments,
    isFetching,
    ...rest,
  };
};
