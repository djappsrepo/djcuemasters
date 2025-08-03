import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/auth/use-auth";
import { useUserManagement } from '@/hooks/admin/use-user-management';
import { useAdminStats } from '@/hooks/admin/use-admin-stats';
import StatCards from '@/components/admin/StatCards';
import UserTable from '@/components/admin/UserTable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const AdminDashboard = () => {
  const { user: adminUser } = useAuth();
  const { users, loading: usersLoading, actionLoading, handleRoleChange, handleDeleteUser } = useUserManagement();

    return (
    <div className="container mx-auto py-8">
            <Card className="bg-card/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <StatCards />
          <UserTable adminUserId={adminUser?.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;