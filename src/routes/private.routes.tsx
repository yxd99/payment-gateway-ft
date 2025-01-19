import { useAppSelector } from '@/store';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';

const ProductsPage = lazy(
  () => import('@features/products/ui/pages/products.page')
);
const ProductDetailPage = lazy(
  () => import('@features/products/ui/pages/product-detail.page')
);
const CheckoutPage = lazy(
  () => import('@features/checkout/ui/pages/checkout.page')
);
const SummaryPage = lazy(
  () => import('@features/checkout/ui/pages/sumary.page')
);

const PaymentsPage = lazy(
  () => import('@features/user/ui/pages/payments.page')
);

export default function PrivateRoutes() {
  const stageOfPayment = useAppSelector((state) => state.checkout.stageOfPayment);

  return (
    <Routes>
      <Route path='/' element={<ProductsPage />} />
      <Route path='/products/:id' element={<ProductDetailPage />} />
      <Route path='/user/payments' element={<PaymentsPage />} />
      {
        stageOfPayment === 1 ? <Route path='/checkout' element={<CheckoutPage />} /> : <Route path='/checkout' element={<Navigate to='/summary' replace />} />
      }
      {
        stageOfPayment === 2 ? <Route path='/summary' element={<SummaryPage />} /> : <Route path='/summary' element={<Navigate to='/' replace />} /> 
      }
      <Route path='/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
