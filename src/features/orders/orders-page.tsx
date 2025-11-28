import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { ORDER_STATUS, PAYMENT_STATUS } from '../../config/status';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';

const orderSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  status: z.enum(ORDER_STATUS),
  paymentStatus: z.enum(PAYMENT_STATUS),
});

type OrderForm = z.infer<typeof orderSchema>;

export const OrdersPage = () => {
  const { register, handleSubmit, reset } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: { status: 'pending', paymentStatus: 'unpaid' },
  });
  const { profile } = useAuth();

  const demoOrders = useMemo(
    () => [
      {
        id: 'order-1',
        title: 'Instalação de rede',
        status: 'pending',
        paymentStatus: 'unpaid',
        companyId: profile?.companyId ?? 'acme',
      },
      {
        id: 'order-2',
        title: 'Atualização de software',
        status: 'in_production',
        paymentStatus: 'paid',
        companyId: profile?.companyId ?? 'acme',
      },
    ],
    [profile?.companyId]
  );

  const onSubmit = (values: OrderForm) => {
    toast.success(`Pedido "${values.title}" cadastrado (mock).`);
    reset();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Pedidos</CardTitle>
          <Button asChild variant="outline">
            <Link to="/orders?filter=meus">Filtrar meus pedidos</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {demoOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-md border bg-muted/40 px-4 py-3"
            >
              <div>
                <p className="font-semibold">{order.title}</p>
                <p className="text-xs text-muted-foreground">Empresa: {order.companyId}</p>
                <p className="text-xs text-muted-foreground">Status: {order.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                  Pagamento: {order.paymentStatus}
                </span>
                <Button asChild size="sm" variant="ghost">
                  <Link to={`/orders/${order.id}`}>Detalhes</Link>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Novo pedido</CardTitle>
          <p className="text-sm text-muted-foreground">Crie rapidamente um pedido para sua empresa.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Título</label>
              <Input placeholder="ex: Instalação de rede" {...register('title')} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea placeholder="Contextualize o pedido" {...register('description')} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <Select {...register('status')}>
                {ORDER_STATUS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Pagamento</label>
              <Select {...register('paymentStatus')}>
                {PAYMENT_STATUS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Salvar pedido
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
