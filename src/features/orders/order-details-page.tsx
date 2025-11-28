import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/card';
import { Button } from '../../components/ui/button';
import { ORDER_STATUS, PAYMENT_STATUS } from '../../config/status';

export const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const order = useMemo(
    () => ({
      id: id ?? 'order',
      title: 'Pedido Demo',
      status: 'in_production' as (typeof ORDER_STATUS)[number],
      paymentStatus: 'unpaid' as (typeof PAYMENT_STATUS)[number],
      description: 'Pedido fictício para demonstração.',
    }),
    [id]
  );

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">#{order.id}</p>
          <CardTitle>{order.title}</CardTitle>
        </div>
        <Button asChild variant="outline">
          <Link to="/orders">Voltar</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">Status: {order.status}</span>
          <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
            Pagamento: {order.paymentStatus}
          </span>
        </div>
        <p>{order.description}</p>
      </CardContent>
    </Card>
  );
};
