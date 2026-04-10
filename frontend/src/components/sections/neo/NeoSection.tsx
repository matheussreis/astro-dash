import {
  getClosestNeo,
  getHazardousNeos,
  getAverageVelocity,
} from '@/lib/feed';
import NeoTable from './NeoTable';
import type { Neo } from '@/models';
import NeoKpiItem from './NeoKpiItem';
import type { KpiDataItem } from './types';
import { formatDate } from '@/lib/formatters';
import { FastestObjects, VelocityVsMissDistance } from './NeoCharts';

const getKpiItems = (neoData: Neo): KpiDataItem[] => {
  return [
    {
      label: 'Total objects',
      value: neoData.length,
    },
    {
      label: 'Potentially hazardous',
      value: getHazardousNeos(neoData).length,
      format: 'hazardousHighlight',
    },
    {
      label: 'Average Velocity',
      value: getAverageVelocity(neoData),
      format: 'velocityInKmH',
    },
    {
      label: 'Closest Object to Approach',
      value: getClosestNeo(neoData)?.title || 'N/A',
    },
  ];
};

interface HeadingProps {
  title: string;
  description: string;
}

function Heading({ title, description }: HeadingProps) {
  return (
    <header className="flex-1 min-w-0 flex flex-col justify-center gap-4 md:gap-8 text-center md:text-left">
      <h1 className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-primary-foreground text-balance">
        {title}
      </h1>
      <p className="text-sm md:text-base xl:text-xl text-primary-foreground/80 text-pretty leading-loose">
        {description}
      </p>
    </header>
  );
}

interface NeoSectionProps {
  date: Date;
  neoData: Neo;
}

export default function NeoSection({ neoData, date }: NeoSectionProps) {
  return (
    <section className="w-full flex flex-col justify-center px-4 md:px-12 xl:px-24 2xl:px-32 py-6 md:py-12 gap-4 md:gap-6">
      <Heading
        title={`The Spacial Objects Near Earth on ${formatDate(date)}`}
        description="Explore detailed information about asteroids and other objects that came close to Earth, including their size, velocity, and potential hazard status. These objects include asteroids (rocky bodies orbiting the Sun), comets (icy bodies that release gas and dust when near the Sun), and meteoroids (small fragments that can become meteors if they enter Earth's atmosphere)."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {getKpiItems(neoData).map((item, index) => (
          <NeoKpiItem
            key={`${index}_${item.label}`}
            label={item.label}
            value={item.value}
            format={item.format}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FastestObjects neo={neoData} />
        <VelocityVsMissDistance neo={neoData} />
      </div>
      <div>
        <NeoTable neo={neoData} />
      </div>
    </section>
  );
}
