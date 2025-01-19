import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store, useAppSelector } from './store';
import Loading from './components/loading';
import { AppSidebar } from './components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { ThemeProvider } from './components/theme-provider';
import PublicRoutes from './routes/public.routes';
import PrivateRoutes from './routes/private.routes';

const App: React.FC = () => {
  const email = useAppSelector((state: any) => state.user.email);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Provider store={store}>
        <SidebarProvider defaultOpen={false}>
          {email && (
            <>
              <AppSidebar />
              <SidebarTrigger />
            </>
          )}
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                {email ? (
                  <Route path='/*' element={<PrivateRoutes />} />
                ) : (
                  <Route path='/*' element={<PublicRoutes />} />
                )}
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SidebarProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
