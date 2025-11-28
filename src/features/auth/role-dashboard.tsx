import { Link } from 'react-router-dom';
import { ROLE_LABELS } from '../../config/roles';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/card';
import { useAuth } from '../../context/auth-context';
import { Button } from '../../components/ui/button';

export const RoleBasedDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo{profile ? `, ${profile.displayName}` : ''}!</CardTitle>
          <p className="text-sm text-muted-foreground">
            Use os atalhos abaixo para navegar pelas áreas principais.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground">Papel atual: {ROLE_LABELS[profile?.role ?? 'employee']}</div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/orders">Pedidos</Link>
            </Button>
            {(profile?.role === 'super_admin' || profile?.role === 'company_admin') && (
              <Button asChild variant="outline">
                <Link to="/users">Usuários</Link>
              </Button>
            )}
            {profile?.role === 'super_admin' && (
              <Button asChild variant="outline">
                <Link to="/companies">Empresas</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Restrições por perfil</CardTitle>
          <p className="text-sm text-muted-foreground">
            A proteção é aplicada no cliente por rotas e nos dados pelo Firestore.
          </p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Super admins controlam todas as empresas, usuários e pedidos.</p>
          <p>Admins de empresa controlam apenas usuários e pedidos da própria empresa.</p>
          <p>Funcionários criam e atualizam os próprios pedidos.</p>
        </CardContent>
      </Card>
    </div>
  );
};
