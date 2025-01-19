import { useGetPaymentsQuery } from "@/features/user/infrastructure/redux/api-service";

interface fetchPaymentsParams {
  email: string;
  page: number;
  size: number;
}

export const fetchPayments = (params: fetchPaymentsParams) => {
  const {
    data,
    ...rest
  } = useGetPaymentsQuery(params);

  const payments = data ?? [];
  return { payments, ...rest };
}
