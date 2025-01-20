import { useEffect, useRef, useState } from 'react';
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
import { useGetPayments } from '@features/user/ui/hooks/use-get-payments';

export default function PaymentsPage() {
  const [page, setPage] = useState(1);
  const { isLoading, payments, isFetching, hasMore } = useGetPayments({
    page,
    size: 15,
  });

  const lastRowRef = useRef<HTMLTableRowElement | null>(null);
  
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
      { threshold: 0.1 }
    );
  
    const currentRef = lastRowRef.current;
  
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoading, payments, hasMore, isFetching]);
  

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
