import Navbar from './components/Navbar';
import { useFeed } from '@/hooks/use-feed';
import HeroSection from './components/HeroSection';
import ApodSection from './components/ApodSection';

export default function App() {
  const { feed, load } = useFeed();

  return (
    <>
      <Navbar />
      <main className="grow min-h-[calc(100vh-3.75rem)] bg-primary p-6">
        <HeroSection loadFeed={load} />
        {feed.items?.apod && <ApodSection apodData={feed.items.apod} />}
      </main>
    </>
  );
}
