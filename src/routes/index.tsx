import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/app-layout';
import { ProtectedRoute } from '../components/layout/protected-route';
import { RoleGate } from '../components/layout/role-gate';
import { LoginPage } from '../features/auth/login-page';
import { OrdersPage } from '../features/orders/orders-page';
import { OrderDetailsPage } from '../features/orders/order-details-page';
import { CompaniesPage } from '../features/companies/companies-page';
import { UsersPage } from '../features/users/users-page';
import { RoleBasedDashboard } from '../features/auth/role-dashboard';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <RoleBasedDashboard /> },
          {
            path: 'orders',
            children: [
              { index: true, element: <OrdersPage /> },
              { path: ':id', element: <OrderDetailsPage /> },
            ],
          },
          {
            path: 'companies',
            element: <RoleGate allowed={['super_admin']} />,
            children: [{ index: true, element: <CompaniesPage /> }],
          },
          {
            path: 'users',
            element: <RoleGate allowed={['super_admin', 'company_admin']} />,
            children: [{ index: true, element: <UsersPage /> }],
          },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ],
  },
]);
