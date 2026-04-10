import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { cn } from '@/lib/utils';
import type { Neo } from '@/models';
import { Badge } from '@/components/ui/Badge';
import { formatVelocity } from '@/lib/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface NeoTableProps {
  neo: Neo;
}

type NeoItem = Neo[number];

const HEADERS = [
  'Name',
  'Status',
  'Magnitude',
  'Velocity',
  'Miss Distance',
  'Diameter (km)',
  'Orbiting',
];

function getCells(
  item: NeoItem,
): { className?: string; content: React.ReactNode }[] {
  const statusContent = item.isHazardous ? (
    <Badge variant="destructive">Hazardous</Badge>
  ) : (
    <Badge variant="outline">Safe</Badge>
  );

  return [
    { className: 'font-medium text-foreground', content: item.title },
    { content: statusContent },
    { content: item.magnitude.toFixed(1) },
    { content: formatVelocity(item.velocity) },
    { content: `${(item.missDistance / 1_000_000).toFixed(2)}M km` },
    {
      content: `${item.diameter.min.toFixed(2)} - ${item.diameter.max.toFixed(2)}`,
    },
    { content: item.orbitingBody },
  ];
}

export default function NeoTable({ neo }: NeoTableProps) {
  return (
    <Card className="dark bg-foreground/5 border border-border text-foreground px-3 py-4 md:px-2 md:py-6">
      <CardHeader className="pb-1 pt-3 px-3 md:pb-2 md:pt-4 md:px-4">
        <CardTitle className="text-md font-semibold">
          All Near Earth Objects
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3 md:px-4 md:pb-4">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {HEADERS.map((header) => (
                <TableHead key={header} className="text-muted-foreground">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {neo.map((item) => (
              <TableRow
                key={item.title}
                className={cn(
                  'border-border',
                  item.isHazardous
                    ? 'bg-destructive/10 hover:bg-destructive/20'
                    : 'hover:bg-foreground/10',
                )}
              >
                {getCells(item).map(({ className, content }, i) => (
                  <TableCell
                    key={i}
                    className={cn('text-foreground/80', className)}
                  >
                    {content}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
