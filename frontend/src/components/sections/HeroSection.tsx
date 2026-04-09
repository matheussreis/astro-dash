import { toast } from 'sonner';
import { useRef, useState } from 'react';
import DatePicker from '../DatePicker';
import { Button } from '../ui/Button';
import { Rocket } from 'lucide-react';
import { Toaster } from '../ui/Sonner';
import type { LoadFeedFunction } from '@/context/feed/types';
import { useScroll } from '@/hooks/use-scroll';

function Heading() {
  return (
    <header className="max-w-3xl text-center flex flex-col gap-8 items-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground text-balance">
          This Day in the Cosmos
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/80 text-pretty">
          Pick a date to see the cosmic image of the day and discover objects
          passing near Earth at that moment.
        </p>
      </div>
    </header>
  );
}

interface ExploreButtonProps {
  onClick: () => void;
  disabled: boolean;
}

function ExploreButton({ onClick, disabled }: ExploreButtonProps) {
  return (
    <Button
      size="lg"
      variant="secondary"
      className="gap-2 p-6"
      disabled={disabled}
      onClick={onClick}
    >
      <Rocket className="text-amber-600" fontWeight="extrabold" />
      Explore This Date
    </Button>
  );
}

interface HeroSectionProps {
  loadFeed: LoadFeedFunction;
}

export default function HeroSection({ loadFeed }: HeroSectionProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [exploreButtonDisabled, setExploreButtonDisabled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrolltoSection = useScroll({ ref: sectionRef });

  const handleExploreButtonClick = async () => {
    toast.promise(
      async () => {
        setExploreButtonDisabled(true);
        await loadFeed(date);
        scrolltoSection();
        setExploreButtonDisabled(false);
      },
      {
        loading: 'Loading feed data...',
        success: 'Feed data loaded successfully!',
        error: (err) => `Error: ${err.message}`,
      },
    );
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[50vh] md:min-h-[82vh] xl:min-h-screen flex-1 flex flex-col items-center justify-center px-6 py-12 gap-6"
    >
      <Toaster />
      <Heading />
      <DatePicker value={date} onChange={(value: Date) => setDate(value)} />
      <ExploreButton
        onClick={handleExploreButtonClick}
        disabled={exploreButtonDisabled}
      />
    </section>
  );
}
