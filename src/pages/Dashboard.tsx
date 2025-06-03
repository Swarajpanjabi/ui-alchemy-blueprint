
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { RecentDetections } from '@/components/dashboard/RecentDetections';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor iris liveness detection system performance and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Detections"
          value="12,847"
          change="+12.5%"
          trend="up"
          icon={Eye}
        />
        <MetricCard
          title="Live Detections"
          value="11,234"
          change="+8.2%"
          trend="up"
          icon={Shield}
        />
        <MetricCard
          title="Spoof Attempts"
          value="1,613"
          change="+24.1%"
          trend="up"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Accuracy Rate"
          value="97.4%"
          change="+0.8%"
          trend="up"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Detection Activity</CardTitle>
            <CardDescription>
              Daily detection volume over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Detections</CardTitle>
            <CardDescription>
              Latest detection attempts and results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentDetections />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
