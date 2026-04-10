import { ChartContainer, type ChartConfig } from '@/components/ui/Chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface ChartWrapperProps {
  title: string;
  config: ChartConfig;
  children: React.ReactNode;
}

export default function ChartWrapper({
  title,
  config,
  children,
}: ChartWrapperProps) {
  return (
    <Card className="bg-card border border-border text-card-foreground px-3 py-4 md:px-2 md:py-6">
      <CardHeader className="pb-1 pt-3 px-3 md:pb-2 md:pt-4 md:px-4">
        <CardTitle className="text-md font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3 md:px-4 md:pb-4">
        <ChartContainer
          config={config}
          className="w-full h-64 md:h-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted"
        >
          {children}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
