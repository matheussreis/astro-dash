import type { Neo } from '@/models';
import { formatDate, formatVelocity } from '@/lib/formatters';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  getAverageVelocity,
  getClosestNeo,
  getHazardousNeos,
} from '@/lib/feed';

interface HeadingProps {
  title: string;
  description: string;
}

function Heading({ title, description }: HeadingProps) {
  return (
    <header className="flex-1 min-w-0 flex flex-col justify-center gap-4 md:gap-8 text-center md:text-left">
      <h1 className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-primary-foreground text-balance leading-tight">
        {title}
      </h1>
      <p className="text-base md:text-xl xl:text-2xl text-primary-foreground/80 text-pretty leading-relaxed">
        {description}
      </p>
    </header>
  );
}

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

interface NeoKpiItemProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof kpiItemVariants> {
  label: string;
  value: string | number;
}

function NeoKpiItem({
  label,
  value,
  size,
  variant,
  emphasis,
  className,
  ...props
}: NeoKpiItemProps) {
  return (
    <Card
      className={cn(kpiItemVariants({ size, emphasis, variant }), className)}
      {...props}
    >
      <CardHeader className="pb-1 pt-3 px-3 md:pb-2 md:pt-4 md:px-4">
        <CardTitle className="title text-xs md:text-sm font-normal leading-snug">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3 md:px-4 md:pb-4">
        <p>{value}</p>
      </CardContent>
    </Card>
  );
}

interface NeoSectionProps {
  date: Date;
  neoData: Neo;
}

export default function NeoSection({ neoData, date }: NeoSectionProps) {
  console.log(neoData, date);

  const formattedDate = formatDate(date);

  return (
    <section className="w-full flex flex-col justify-center px-4 md:px-12 xl:px-24 2xl:px-32 py-6 md:py-12 gap-4 md:gap-6">
      <Heading
        title={`The Spacial Objects Near Earth on ${formattedDate}`}
        description="Explore detailed information about asteroids and other objects that came close to Earth, including their size, velocity, and potential hazard status. These objects include asteroids (rocky bodies orbiting the Sun), comets (icy bodies that release gas and dust when near the Sun), and meteoroids (small fragments that can become meteors if they enter Earth's atmosphere)."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <NeoKpiItem label="Total" value={neoData.length} />
        <NeoKpiItem
          label="Hazardous"
          value={getHazardousNeos(neoData).length}
          variant="destructive"
          emphasis="bold"
        />
        <NeoKpiItem
          label="Average Velocity"
          value={formatVelocity(getAverageVelocity(neoData))}
        />
        <NeoKpiItem
          label="Closest to Earth"
          value={getClosestNeo(neoData)?.title || 'N/A'}
        />
      </div>
    </section>
  );
}
