import React from 'react';
import { ProductsPage } from './features/products/ui/pages/products.page';
import { BrowserRouter } from 'react-router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ProductsPage />
    </BrowserRouter>
  );
};

export default App;
