import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="grow min-h-[calc(100vh-5rem)] bg-primary p-6">
        <div>Hello World!</div>
      </main>
    </>
  );
}
