import { ModeToggle } from './ModeToggle';

export default function Navbar() {
  return (
    <header className="h-20 w-full sticky top-0 bg-background select-none">
      <nav className="flex h-20 items-center justify-between px-4 md:px-6">
        <span>
          <img src="/src/assets/images/logo.png" alt="Logo" className="h-15" />
        </span>
        <ModeToggle />
      </nav>
    </header>
  );
}
