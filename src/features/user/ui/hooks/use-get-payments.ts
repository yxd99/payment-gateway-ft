import { useAppSelector } from "@/store";
import { getPayments } from "@features/user/application/use-cases/get-payments"
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
    let totalPayments: Payment[] = [];
    if (paymentQuery.length > 0) {
      totalPayments = [...payments, ...paymentQuery];
      setHasMore(true);
    } else {
      totalPayments = [...payments];
      setHasMore(false);
    }

    setPayments([...new Set(totalPayments)]);
  }, [isFetching, paymentQuery, payments]);

  return {
    hasMore,
    payments,
    isFetching,
    ...rest
  };
}