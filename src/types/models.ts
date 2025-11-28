import { Timestamp } from 'firebase/firestore';
import { OrderStatus, PaymentStatus } from '../config/status';
import { UserRole } from '../config/roles';

export type UserDoc = {
  id: string;
  uid?: string;
  email: string;
  displayName: string;
  role: UserRole;
  companyId?: string | null;
  createdAt: Timestamp;
  isActive: boolean;
};

export type CompanyDoc = {
  id: string;
  name: string;
  cnpj?: string;
  createdAt: Timestamp;
  isActive: boolean;
};

export type OrderDoc = {
  id: string;
  companyId: string;
  createdBy: string;
  customerName: string;
  customerPhone?: string;
  description: string;
  type: 'immediate' | 'scheduled';
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
  paidAmount: number;
  createdAt: Timestamp;
  dueDate?: Timestamp;
  notes?: string;
};
