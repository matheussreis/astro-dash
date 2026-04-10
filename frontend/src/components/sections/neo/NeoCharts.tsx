import type { Neo, NeoItem } from '@/models';
import { getFastestNeos, groupNeosByHazard } from '@/lib/feed';
import ChartWrapper from '@/components/ChartWrapper';
import { type ChartConfig } from '@/components/ui/Chart';
import GenericBarChart from '@/components/GenericBarChart';
import GenericScatterChart from '@/components/GenericScatterChart';

export function FastestObjects({ neo }: { neo: Neo }) {
  const fastestConfig: ChartConfig = {
    velocity: {
      label: 'Velocity (km/h)',
      color: 'var(--chart-1)',
    },
  };

  const data = getFastestNeos(neo).map((item) => ({
    title: item.title,
    velocity: Math.round(item.velocity),
  }));

  return (
    <ChartWrapper title="Top 5 fastest objects" config={fastestConfig}>
      <GenericBarChart
        data={data}
        datasets={[{ key: 'velocity' }]}
        categoryKey="title"
        layout="vertical"
        valueFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
      />
    </ChartWrapper>
  );
}

export function VelocityVsMissDistance({ neo }: { neo: Neo }) {
  const config: ChartConfig = {};
  const { safe, hazardous } = groupNeosByHazard(neo);

  const toPoint = (item: NeoItem) => ({
    x: item.missDistance,
    y: Math.round(item.velocity),
    name: item.title,
  });

  const datasets = [
    { name: 'Safe', data: safe.map(toPoint) },
    {
      name: 'Hazardous',
      data: hazardous.map(toPoint),
      color: 'var(--destructive)',
    },
  ];

  return (
    <ChartWrapper title="Velocity vs Miss Distance" config={config}>
      <GenericScatterChart
        datasets={datasets}
        xLabel="Miss Distance (km)"
        yLabel="Velocity (km/h)"
        xTickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
        yTickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
        tooltipContent={({ name, x, y }) => (
          <div className="bg-background border border-border rounded px-3 py-2 text-xs text-foreground space-y-1">
            <p className="font-semibold">{name}</p>
            <p>Velocity: {(y / 1000).toFixed(0)}k km/h</p>
            <p>Miss Distance: {(x / 1_000_000).toFixed(2)}M km</p>
          </div>
        )}
      />
    </ChartWrapper>
  );
}
