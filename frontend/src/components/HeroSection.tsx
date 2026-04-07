import { toast } from 'sonner';
import { useState } from 'react';
import DatePicker from './DatePicker';
import { Button } from './ui/Button';
import { Rocket } from 'lucide-react';
import { Toaster } from './ui/Sonner';

const apiUrl = import.meta.env.VITE_SERVER_URL;

function Heading() {
  return (
    <header className="max-w-3xl text-center flex flex-col gap-8 items-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground text-balance">
          Explore the Universe on Any Day
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/80 text-pretty">
          Pick a date to see the cosmic image of the day and discover objects
          passing near Earth at that moment.
        </p>
      </div>
    </header>
  );
}

function ExploreButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      size="lg"
      variant="secondary"
      className="gap-2 p-6"
      onClick={onClick}
    >
      <Rocket className="text-amber-600" fontWeight="extrabold" />
      Explore This Date
    </Button>
  );
}

export default function HeroSection() {
  const [date, setDate] = useState<Date>(new Date());

  const handleExploreButtonClick = async () => {
    const parsedDate = date.toISOString().substring(0, 10);
    const url = apiUrl + '/api/feed?date=' + parsedDate;

    toast.promise(
      fetch(url).then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch feed data');
        }
        return await res.json();
      }),
      {
        loading: 'Loading feed data...',
        success: (data) => {
          console.log(data);
          return 'Feed data loaded successfully!';
        },
        error: (err) => `Error: ${err.message}`,
      },
    );
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-6">
      <Toaster />
      <Heading />
      <DatePicker value={date} onChange={(value: Date) => setDate(value)} />
      <ExploreButton onClick={handleExploreButtonClick} />
    </section>
  );
}
