import AppLayout from '@/components/AppLayout';
import DashboardContent from './components/DashboardContent';

export default function UserDashboardPage() {
  return (
    <AppLayout userName="Soumyajit Koley" userLocation="Agarpara, Kolkata">
      <DashboardContent />
    </AppLayout>
  );
}