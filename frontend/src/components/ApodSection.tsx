import type { Apod } from '@/models';

interface MediaDisplayProps {
  mediaSrc: string;
}

function MediaDisplay({ mediaSrc }: MediaDisplayProps) {
  const isVideoUrl = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    const lowercaseUrl = url.toLowerCase();
    return videoExtensions.some((ext) => lowercaseUrl.endsWith(ext));
  };

  const isVideo = isVideoUrl(mediaSrc);

  return (
    <>
      {isVideo ? (
        <video
          src={mediaSrc}
          controls
          className="max-width: 1024px"
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={mediaSrc}
          alt="Media for Astronomy Picture of the Day"
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}
    </>
  );
}

interface HeadingProps {
  title: string;
  description: string;
}

function Heading({ title, description }: HeadingProps) {
  return (
    <header className="max-w-3xl text-center flex flex-col gap-8 items-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground text-balance">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/80 text-pretty">
          {description}
        </p>
      </div>
    </header>
  );
}

interface ApoodSectionProps {
  apodData: Apod;
}

export default function ApodSection({ apodData }: ApoodSectionProps) {
  return (
    <section className="flex-1 flex flex-col items-center justify-center md:px-3 md:py-6 gap-6">
      <MediaDisplay mediaSrc={apodData.cover} />
      <Heading title={apodData.title} description={apodData.description} />
    </section>
  );
}
