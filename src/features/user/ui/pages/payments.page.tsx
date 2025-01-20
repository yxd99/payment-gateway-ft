import { useEffect, useRef, useState } from 'react';
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
  const { isLoading, payments, isFetching, hasMore } = getPayments({
    page,
    size: 15,
  });

  const lastRowRef = useRef(null);
  
  useEffect(() => {
    if (isFetching) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: .1 }
    );

    if (lastRowRef.current) {
      observer.observe(lastRowRef.current);
    }

    return () => {
      if (lastRowRef.current) {
        observer.unobserve(lastRowRef.current);
      }
    };
  }, [isLoading, payments]);

  return (
    <div className='flex flex-col p-5 w-full'>
      <h1 className='text-3xl font-bold text-center p-5 border-b-slate-600 border-b'>
        Payments
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Product</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment, index) => (
            <TableRow ref={index === payments.length - 1 ? lastRowRef : null} key={payment.id}>
              <TableCell className='font-medium'>
                {payment.id}
              </TableCell>
              <TableCell>{formatCurrency(Number(payment.amount))}</TableCell>
              <TableCell className='text-center'>{payment.productQuantity}</TableCell>
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
