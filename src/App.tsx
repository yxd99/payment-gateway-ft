import React from 'react';
import { ProductsPage } from './features/products/ui/pages/products.page';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ProductDetail } from './features/products/ui/components/product-detail.component';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
