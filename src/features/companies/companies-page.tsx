import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const companySchema = z.object({ name: z.string().min(2) });
type CompanyForm = z.infer<typeof companySchema>;

export const CompaniesPage = () => {
  const { register, handleSubmit, reset } = useForm<CompanyForm>({ resolver: zodResolver(companySchema) });
  const companies = [
    { id: 'c1', name: 'Acme Corp', ownerId: 'admin' },
    { id: 'c2', name: 'Globex', ownerId: 'admin' },
  ];

  const onSubmit = (values: CompanyForm) => {
    toast.success(`Empresa ${values.name} criada (mock).`);
    reset();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Empresas</CardTitle>
          <p className="text-sm text-muted-foreground">Somente super admins podem gerenciar empresas.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {companies.map((company) => (
            <div key={company.id} className="flex items-center justify-between rounded-md border px-4 py-3">
              <div>
                <p className="font-semibold">{company.name}</p>
                <p className="text-xs text-muted-foreground">Owner: {company.ownerId}</p>
              </div>
              <Button variant="ghost" size="sm">
                Editar
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Nova empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Nome</label>
              <Input placeholder="Digite o nome" {...register('name')} />
            </div>
            <Button type="submit" className="w-full">
              Criar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
