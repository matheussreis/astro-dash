import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';

export interface ScatterDataPoint {
  x: number;
  y: number;
  name?: string;
}

export interface ScatterDataset {
  name: string;
  data: ScatterDataPoint[];
  color?: string;
}

const DEFAULT_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

interface GenericScatterChartProps {
  datasets: ScatterDataset[];
  xLabel?: string;
  yLabel?: string;
  xTickFormatter?: (value: number) => string;
  yTickFormatter?: (value: number) => string;
  tooltipContent?: (
    point: ScatterDataPoint & { datasetName: string },
  ) => React.ReactNode;
}

export default function GenericScatterChart({
  datasets,
  xLabel,
  yLabel,
  xTickFormatter,
  yTickFormatter,
  tooltipContent,
}: GenericScatterChartProps) {
  return (
    <ScatterChart>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
      <XAxis
        dataKey="x"
        type="number"
        tick={{ fontSize: 11, fill: 'var(--foreground)' }}
        stroke="var(--border)"
        tickFormatter={xTickFormatter}
      >
        {xLabel && (
          <Label
            value={xLabel}
            offset={-4}
            position="insideBottom"
            fontSize={11}
            fill="var(--foreground)"
          />
        )}
      </XAxis>
      <YAxis
        dataKey="y"
        type="number"
        tick={{ fontSize: 11, fill: 'var(--foreground)' }}
        stroke="var(--border)"
        tickFormatter={yTickFormatter}
      >
        {yLabel && (
          <Label
            value={yLabel}
            angle={-90}
            position="insideLeft"
            fontSize={11}
            fill="var(--foreground)"
          />
        )}
      </YAxis>
      <Tooltip
        content={({ payload }) => {
          if (!payload?.length) {
            return null;
          }

          const point = payload[0].payload as ScatterDataPoint;
          const datasetName = payload[0].name as string;

          if (tooltipContent) {
            return <>{tooltipContent({ ...point, datasetName })}</>;
          }

          return (
            <div className="bg-background border border-border rounded px-3 py-2 text-xs text-foreground space-y-1">
              {point.name && <p className="font-semibold">{point.name}</p>}
              <p className="text-muted-foreground">{datasetName}</p>
              <p>X: {xTickFormatter ? xTickFormatter(point.x) : point.x}</p>
              <p>Y: {yTickFormatter ? yTickFormatter(point.y) : point.y}</p>
            </div>
          );
        }}
      />
      <Legend
        wrapperStyle={{ fontSize: 12, paddingTop: '2rem' }}
        formatter={(value) => (
          <span style={{ color: 'var(--foreground)' }}>{value}</span>
        )}
      />
      {datasets.map((dataset, index) => (
        <Scatter
          key={dataset.name}
          name={dataset.name}
          data={dataset.data}
          fill={dataset.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
        />
      ))}
    </ScatterChart>
  );
}
