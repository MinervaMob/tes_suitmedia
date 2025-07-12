import { useEffect, useRef } from 'react';

export default function Banner() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const offset = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${offset * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const imageUrl =
    'https://assets.suitdev.com/storage/files/5819/conversions/shutterstock_1771500266-(1)-medium.jpg';

  return (
    <div className="relative h-[60vh] overflow-hidden">
      <img
        src={imageUrl}
        ref={parallaxRef}
        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-out"
        alt="Ideas Banner"
        loading="lazy"
        onError={(e) => {
          e.target.src = '/fallback.jpg'; 
        }}
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold drop-shadow">Ideas</h1>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-white [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
    </div>
  );
}
