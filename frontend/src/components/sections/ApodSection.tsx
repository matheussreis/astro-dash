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
    <div className="w-full md:w-[45%] md:shrink-0 self-stretch">
      {isVideo ? (
        <video
          src={mediaSrc}
          controls
          className="w-full h-full object-cover rounded-xl"
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={mediaSrc}
          alt="Media for Astronomy Picture of the Day"
          className="w-full h-full object-cover rounded-xl"
        />
      )}
    </div>
  );
}

interface HeadingProps {
  title: string;
  description: string;
}

function Heading({ title, description }: HeadingProps) {
  return (
    <header className="flex-1 min-w-0 flex flex-col justify-center gap-4 text-center md:text-left">
      <h1 className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-primary-foreground text-balance">
        {title}
      </h1>
      <p className="text-sm md:text-base xl:text-xl text-primary-foreground/80 text-pretty leading-loose">
        {description}
      </p>
    </header>
  );
}

interface ApoodSectionProps {
  apodData: Apod;
}

export default function ApodSection({ apodData }: ApoodSectionProps) {
  return (
    <section className="w-full flex justify-center px-6 md:px-12 xl:px-24 2xl:px-32 py-8 md:py-12">
      <div className="w-full flex flex-col items-center md:items-stretch md:flex-row gap-6 md:gap-8">
        <MediaDisplay mediaSrc={apodData.cover} />
        <Heading title={apodData.title} description={apodData.description} />
      </div>
    </section>
  );
}
