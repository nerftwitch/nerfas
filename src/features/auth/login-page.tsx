import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/card';
import { useAuth } from '../../context/auth-context';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginForm = z.infer<typeof schema>;

export const LoginPage = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (user) {
      navigate((location.state as any)?.from?.pathname || '/', { replace: true });
    }
  }, [location.state, navigate, user]);

  const onSubmit = async (values: LoginForm) => {
    try {
      await login(values.email, values.password);
      toast.success('Login realizado com sucesso');
    } catch (err) {
      console.error(err);
      toast.error('Não foi possível entrar. Confira suas credenciais.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <p className="text-sm text-muted-foreground">Acesse para gerenciar pedidos e empresas.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="seu@email.com" {...register('email')} />
              {formState.errors.email && (
                <p className="text-sm text-destructive">{formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input type="password" placeholder="••••••••" {...register('password')} />
              {formState.errors.password && (
                <p className="text-sm text-destructive">{formState.errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
