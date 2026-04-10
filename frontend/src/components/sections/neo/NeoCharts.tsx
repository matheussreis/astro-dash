import type { Neo } from '@/models';
import { getFastestNeos } from '@/lib/feed';
import ChartWrapper from '@/components/ChartWrapper';
import { type ChartConfig } from '@/components/ui/Chart';
import GenericBarChart from '@/components/GenericBarChart';

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
