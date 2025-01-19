import { useEffect, useState } from 'react';
import { getPayments } from '../../application/use-cases/get-payments';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { NavLink } from 'react-router';

export default function PaymentsPage() {
  const [page, setPage] = useState(1);
  const { isLoading, payments, isFetching } = getPayments(page, 15);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        setPage(page + 1);
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [page, isFetching]);

  return (
    <div className='flex flex-col p-5 w-full'>
      <h1 className='text-3xl font-bold text-center p-5 border-b-slate-600 border-b'>
        Payments
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='max-w-[10px]'>ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Product</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className='font-medium'>
                {payment.id}
              </TableCell>
              <TableCell>{formatCurrency(Number(payment.amount))}</TableCell>
              <TableCell>{payment.productQuantity}</TableCell>
              <TableCell>{payment.reference}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell>
                <NavLink to={`/products/${payment.product.id}`}>
                  {payment.product.name}
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isLoading && <p>Loading...</p>}
    </div>
  );
}
