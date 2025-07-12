import { useEffect, useRef } from 'react';

export default function Banner({ imageUrl, title = 'Ideas' }) {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${offset * 0.3}px)`; // parallax lebih slow
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${offset * 0.1}px)`; // teks bergerak lebih pelan
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[60vh] overflow-hidden">
      {/* Background Image */}
      <img
        ref={imageRef}
        src={imageUrl}
        alt={title}
        loading="lazy"
        onError={(e) => (e.target.src = '/fallback.jpg')}
        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-out"
      />

      {/* Overlay Title */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="text-white text-4xl font-bold drop-shadow-lg">{title}</h1>
      </div>

      {/* Bottom angled shape */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
    </div>
  );
}
