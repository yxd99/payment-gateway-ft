import React from 'react';
import { ProductsPage } from './features/products/ui/pages/products.page';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ProductDetailPage } from './features/products/ui/pages/product-detail.page';
import { Provider } from 'react-redux';
import { store } from './store';
import { CheckoutPage } from './features/checkout/ui/pages/checkout.page';
import { SummaryPage } from './features/checkout/ui/pages/sumary.page';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductsPage />} />
          <Route path='/products/:id' element={<ProductDetailPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/summary' element={<SummaryPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
