import AppLayout from '@/components/AppLayout';
import MapPageContent from './components/MapPageContent';

export default function LiveWeatherMapPage() {
  return (
    <AppLayout userName="Soumyajit Koley" userLocation="Agarpara, Kolkata">
      <MapPageContent />
    </AppLayout>
  );
}