import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import Loading from './components/loading';
import { AppSidebar } from './components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { ThemeProvider } from './components/theme-provider';

const ProductsPage = lazy(
  () => import('./features/products/ui/pages/products.page')
);
const ProductDetailPage = lazy(
  () => import('./features/products/ui/pages/product-detail.page')
);
const CheckoutPage = lazy(
  () => import('./features/checkout/ui/pages/checkout.page')
);
const SummaryPage = lazy(
  () => import('./features/checkout/ui/pages/sumary.page')
);

const UserPage = lazy(
  () => import('./features/user/ui/pages/user.page')
);

const PaymentsPage = lazy(
  () => import('./features/user/ui/pages/payments.page')
);

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Provider store={store}>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarTrigger />
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path='/' element={<ProductsPage />} />
                <Route path='/products/:id' element={<ProductDetailPage />} />
                <Route path='/checkout' element={<CheckoutPage />} />
                <Route path='/summary' element={<SummaryPage />} />
                <Route path='/user' >
                  <Route path='' element={<UserPage />} />
                  <Route path='payments' element={<PaymentsPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SidebarProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
