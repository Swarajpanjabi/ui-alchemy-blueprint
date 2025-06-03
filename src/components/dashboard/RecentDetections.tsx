
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const recentDetections = [
  {
    id: '1',
    timestamp: '2 minutes ago',
    result: 'live',
    confidence: 98.5,
    source: 'Camera 1',
  },
  {
    id: '2',
    timestamp: '5 minutes ago',
    result: 'spoof',
    confidence: 87.2,
    source: 'Upload',
  },
  {
    id: '3',
    timestamp: '8 minutes ago',
    result: 'live',
    confidence: 95.8,
    source: 'Camera 2',
  },
  {
    id: '4',
    timestamp: '12 minutes ago',
    result: 'live',
    confidence: 92.1,
    source: 'Upload',
  },
  {
    id: '5',
    timestamp: '15 minutes ago',
    result: 'spoof',
    confidence: 91.4,
    source: 'Camera 1',
  },
];

export function RecentDetections() {
  return (
    <ScrollArea className="h-[280px]">
      <div className="space-y-4">
        {recentDetections.map((detection) => (
          <div key={detection.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant={detection.result === 'live' ? 'default' : 'destructive'}>
                  {detection.result.toUpperCase()}
                </Badge>
                <span className="text-sm font-medium">{detection.confidence}%</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {detection.source} • {detection.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
