import Navbar from './components/Navbar';
import { useFeed } from '@/hooks/use-feed';
import HeroSection from './components/sections/HeroSection';
import ApodSection from './components/sections/ApodSection';
import NeoSection from './components/sections/neo/NeoSection';

export default function App() {
  const { feed, load } = useFeed();

  return (
    <>
      <Navbar />
      <main className="grow min-h-[calc(100vh-3.75rem)] bg-primary p-6">
        <HeroSection loadFeed={load} />
        {feed.items?.apod && <ApodSection apodData={feed.items.apod} />}
        {feed.items?.neo && (
          <NeoSection neoData={feed.items.neo} date={new Date(feed.date)} />
        )}
      </main>
    </>
  );
}
