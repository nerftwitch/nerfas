import { Navigate, Outlet } from 'react-router-dom';
import { hasRoleAccess, UserRole } from '../../config/roles';
import { useAuth } from '../../context/auth-context';

export const RoleGate: React.FC<{ allowed: UserRole[] }> = ({ allowed }) => {
  const { profile } = useAuth();

  if (!hasRoleAccess(profile?.role ?? null, allowed)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
