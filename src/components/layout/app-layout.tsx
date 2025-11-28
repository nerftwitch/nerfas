import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { Button } from '../ui/button';
import { ROLE_LABELS } from '../../config/roles';

export const AppLayout = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-primary">
            Nerfas
          </Link>
          <div className="flex items-center gap-3 text-sm">
            {profile && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">{profile.displayName}</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                  {ROLE_LABELS[profile.role]}
                </span>
              </div>
            )}
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
