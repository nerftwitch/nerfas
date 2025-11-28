import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/card';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { ROLE_LABELS, UserRole } from '../../config/roles';
import { useState } from 'react';
import { toast } from 'sonner';

const mockUsers = [
  { id: 'u1', name: 'Alice', role: 'super_admin' as UserRole, email: 'alice@corp.com' },
  { id: 'u2', name: 'Bob', role: 'company_admin' as UserRole, email: 'bob@corp.com' },
  { id: 'u3', name: 'Carol', role: 'employee' as UserRole, email: 'carol@corp.com' },
];

export const UsersPage = () => {
  const [roleMap, setRoleMap] = useState<Record<string, UserRole>>({});

  const updateRole = (id: string, role: UserRole) => {
    setRoleMap((prev) => ({ ...prev, [id]: role }));
    toast.success(`Perfil de usuário atualizado para ${ROLE_LABELS[role]} (mock).`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuários da empresa</CardTitle>
        <p className="text-sm text-muted-foreground">Admins podem promover ou rebaixar colaboradores.</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between rounded-md border px-4 py-3">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={roleMap[user.id] ?? user.role}
                onChange={(e) => updateRole(user.id, e.target.value as UserRole)}
                className="w-36"
              >
                {Object.keys(ROLE_LABELS).map((role) => (
                  <option key={role} value={role}>
                    {ROLE_LABELS[role as UserRole]}
                  </option>
                ))}
              </Select>
              <Button variant="outline" size="sm">
                Resetar senha
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
