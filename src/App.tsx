import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';

const ProductsPage = lazy(() => import('./features/products/ui/pages/products.page'));
const ProductDetailPage = lazy(() => import('./features/products/ui/pages/product-detail.page'));
const CheckoutPage = lazy(() => import('./features/checkout/ui/pages/checkout.page'));
const SummaryPage = lazy(() => import('./features/checkout/ui/pages/sumary.page'));


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<ProductsPage />} />
            <Route path='/products/:id' element={<ProductDetailPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/summary' element={<SummaryPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
