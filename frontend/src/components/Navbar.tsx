import { Button } from './ui/Button';
import { ModeToggle } from './ModeToggle';

export default function Navbar() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <header className="h-15 w-full sticky top-0 z-50 bg-primary-foreground select-none">
      <nav className="flex h-15 items-center justify-between px-4 md:px-6">
        <Button variant="ghost" onClick={scrollToTop} className="p-0 m-0">
          <img src="/src/assets/images/logo.png" alt="Logo" className="h-12" />
        </Button>
        <span className="flex flex-row items-center justify-center gap-2">
          <Button variant="outline" onClick={scrollToTop}>
            Scroll to Top
          </Button>
          <ModeToggle />
        </span>
      </nav>
    </header>
  );
}
