
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: '1', live: 380, spoof: 24 },
  { day: '2', live: 420, spoof: 31 },
  { day: '3', live: 390, spoof: 28 },
  { day: '4', live: 450, spoof: 35 },
  { day: '5', live: 410, spoof: 29 },
  { day: '6', live: 480, spoof: 42 },
  { day: '7', live: 520, spoof: 38 },
  { day: '8', live: 490, spoof: 33 },
  { day: '9', live: 530, spoof: 41 },
  { day: '10', live: 510, spoof: 36 },
  { day: '11', live: 470, spoof: 32 },
  { day: '12', live: 500, spoof: 39 },
  { day: '13', live: 460, spoof: 31 },
  { day: '14', live: 520, spoof: 44 },
];

export function ActivityChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="day" 
            className="text-xs"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            className="text-xs"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="live" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
            name="Live Detections"
          />
          <Line 
            type="monotone" 
            dataKey="spoof" 
            stroke="hsl(var(--destructive))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 0, r: 4 }}
            name="Spoof Attempts"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
