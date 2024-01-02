import { SettingsForm } from '../_components/settings-form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <Card className="w-[95%] max-w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <SettingsForm />
      </CardContent>
    </Card>
  );
}
