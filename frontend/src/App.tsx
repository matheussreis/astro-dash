import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="grow min-h-[calc(100vh-3.75rem)] bg-primary p-6">
        <HeroSection />
      </main>
    </>
  );
}
