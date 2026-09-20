import { AppShell } from '@/components/app-shell';
import { LearningDashboard } from '@/components/learning-dashboard';

export default function HomePage() {
  return (
    <AppShell>
      <LearningDashboard />
    </AppShell>
  );
}
