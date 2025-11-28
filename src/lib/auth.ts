import { UserRole } from '../config/roles';
import { User } from 'firebase/auth';
import { UserDoc } from '../types/models';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export type SessionUser = User & { role?: UserRole; companyId?: string | null };

export const getUserProfile = async (uid: string): Promise<UserDoc | null> => {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<UserDoc, 'id'>) };
};
