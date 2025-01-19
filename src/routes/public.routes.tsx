import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';

const UserPage = lazy(() => import('@features/user/ui/pages/user.page'));

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path='login' element={<UserPage />} />
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
}
