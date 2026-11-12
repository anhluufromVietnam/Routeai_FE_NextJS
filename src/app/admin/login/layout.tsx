import { AdminProvider } from '@/contexts/AdminContext';

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
