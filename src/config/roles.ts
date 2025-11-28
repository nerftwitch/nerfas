export type UserRole = 'super_admin' | 'company_admin' | 'employee';

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  company_admin: 'Company Admin',
  employee: 'Employee',
};

export const roleHierarchy: UserRole[] = ['employee', 'company_admin', 'super_admin'];

export const hasRoleAccess = (userRole: UserRole | null, allowed: UserRole[]) => {
  if (!userRole) return false;
  return allowed.includes(userRole);
};
