import {
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/Chart';
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from 'recharts';

export interface BarDataset {
  key: string;
}

interface GenericBarChartProps {
  data: Record<string, string | number>[];
  datasets: BarDataset[];
  categoryKey: string;
  layout?: 'horizontal' | 'vertical';
  valueFormatter?: (value: number) => string;
  xLabel?: string;
  yLabel?: string;
}

export default function GenericBarChart({
  data,
  datasets,
  categoryKey,
  layout = 'horizontal',
  valueFormatter = String,
  xLabel,
  yLabel,
}: GenericBarChartProps) {
  const isVertical = layout === 'vertical';

  return (
    <BarChart data={data} layout={isVertical ? 'vertical' : 'horizontal'}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
      <XAxis
        dataKey={isVertical ? undefined : categoryKey}
        type={isVertical ? 'number' : 'category'}
        tickFormatter={isVertical ? valueFormatter : undefined}
        tick={{ fontSize: 11, fill: 'var(--foreground)' }}
        stroke="var(--border)"
      >
        {xLabel && (
          <Label
            value={xLabel}
            offset={-4}
            position="insideBottom"
            fontSize={11}
            fill="var(--muted-foreground)"
          />
        )}
      </XAxis>
      <YAxis
        dataKey={isVertical ? categoryKey : undefined}
        type={isVertical ? 'category' : 'number'}
        tickFormatter={isVertical ? undefined : valueFormatter}
        width={isVertical ? 80 : undefined}
        tick={{ fontSize: 11, fill: 'var(--foreground)' }}
        stroke="var(--border)"
      >
        {yLabel && (
          <Label
            value={yLabel}
            angle={-90}
            position="insideLeft"
            fontSize={11}
            fill="var(--muted-foreground)"
          />
        )}
      </YAxis>
      <ChartTooltip content={<ChartTooltipContent />} />
      <ChartLegend content={<ChartLegendContent />} />
      {datasets.map((dataset) => (
        <Bar
          key={dataset.key}
          dataKey={dataset.key}
          fill="var(--chart-1)"
          radius={3}
        />
      ))}
    </BarChart>
  );
}
