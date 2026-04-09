import { cn } from '@/lib/utils';
import { formatVelocity } from '@/lib/formatters';
import type { KpiDataFormat, KpiDataItem } from './types';
import { cva, type VariantProps } from 'class-variance-authority';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const kpiItemVariants = cva('', {
  variants: {
    variant: {
      default:
        'bg-white/5 border border-white/10 text-white [&_.title]:text-white',
      destructive:
        'bg-gradient-to-br from-red-500/90 to-rose-600 text-white [&_.title]:text-white',
    },
    size: {
      sm: 'px-2 py-3',
      md: 'px-3 py-4 md:px-2 md:py-6',
      lg: 'px-4 py-6 md:px-4 md:py-8',
    },
    emphasis: {
      default: '[&_p]:text-2xl md:[&_p]:text-3xl [&_p]:font-semibold',
      subtle: '[&_p]:text-xl  md:[&_p]:text-2xl [&_p]:font-medium',
      bold: '[&_p]:text-3xl md:[&_p]:text-4xl [&_p]:font-bold',
    },
  },
  defaultVariants: { size: 'md', emphasis: 'default', variant: 'default' },
});

type KpiDisplayVariants = VariantProps<typeof kpiItemVariants>;

function getKpiDisplayProps(
  value: string | number,
  format?: KpiDataFormat,
): { value: string | number } & KpiDisplayVariants {
  switch (format) {
    case 'velocityInKmH':
      return typeof value === 'number'
        ? { value: formatVelocity(value) }
        : { value: 'N/A' };
    case 'hazardousHighlight':
      return { value, variant: 'destructive', emphasis: 'bold' };
    default:
      return { value };
  }
}

interface NeoKpiItemProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    KpiDisplayVariants,
    KpiDataItem {}

export default function NeoKpiItem({
  label,
  value,
  format,
  size,
  variant,
  emphasis,
  className,
  ...props
}: NeoKpiItemProps) {
  const displayProps = getKpiDisplayProps(value, format);

  return (
    <Card
      className={cn(
        kpiItemVariants({
          size,
          emphasis: displayProps.emphasis ?? emphasis,
          variant: displayProps.variant ?? variant,
        }),
        className,
      )}
      {...props}
    >
      <CardHeader className="pb-1 pt-3 px-3 md:pb-2 md:pt-4 md:px-4">
        <CardTitle className="title text-xs md:text-sm font-normal leading-snug">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3 md:px-4 md:pb-4">
        <p>{displayProps.value}</p>
      </CardContent>
    </Card>
  );
}
