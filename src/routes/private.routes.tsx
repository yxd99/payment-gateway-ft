import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { useAppSelector } from '@/store';

const ProductsPage = lazy(() => import('@features/products/ui/pages/products.page'));
const ProductDetailPage = lazy(() => import('@features/products/ui/pages/product-detail.page'));
const CheckoutPage = lazy(() => import('@features/checkout/ui/pages/checkout.page'));
const SummaryPage = lazy(() => import('@features/checkout/ui/pages/sumary.page'));
const PaymentsPage = lazy(() => import('@features/user/ui/pages/payments.page'));

export default function PrivateRoutes() {
  const stageOfPayment = useAppSelector((state) => state.checkout.stageOfPayment);

  return (
    <Routes>
      <Route index element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/user/payments" element={<PaymentsPage />} />
      <Route path="/checkout" element={stageOfPayment === 1 ? <CheckoutPage /> : <Navigate to="/summary" replace />} />
      <Route path="/summary" element={stageOfPayment === 2 ? <SummaryPage /> : <Navigate to="/" replace />} />
      
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
