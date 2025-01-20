import { useAppSelector } from "@/store";
import { getPayments } from "@features/user/application/use-cases/get-payments";
import { Pagination } from "@features/user/application/ports/pagination";
import { useEffect, useState } from "react";
import { Payment } from "@features/user/core/payment";

export const useGetPayments = (pagination: Pagination) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const email = useAppSelector((state) => state.user.email);
  const {
    payments: paymentQuery,
    isFetching,
    ...rest
  } = getPayments({
    email,
    ...pagination,
  });

  useEffect(() => {
    if (paymentQuery.length > 0) {
      const updatedPayments = Array.from(new Set([...payments, ...paymentQuery].map(a => a.id)))
        .map(id => [...payments, ...paymentQuery].find(a => a.id === id))
        .filter((payment): payment is Payment => payment !== undefined);

      setPayments(updatedPayments);
    }
  }, [paymentQuery]);

  useEffect(() => {
    setHasMore(payments.length === pagination.size * pagination.page);
  }, [payments, pagination.size, pagination.page]);

  return {
    hasMore,
    payments,
    isFetching,
    ...rest
  };
};
