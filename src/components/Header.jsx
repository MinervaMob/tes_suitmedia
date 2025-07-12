import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setShow(currentScroll < lastScrollY || currentScroll < 50);
      setIsAtTop(currentScroll < 50);
      setLastScrollY(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Ideas', path: '/ideas' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        show ? 'translate-y-0' : '-translate-y-full'
      } ${isAtTop ? 'bg-orange-500' : 'bg-orange-500/90 backdrop-blur-md shadow-sm'}`}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4 text-sm text-white">
        <div className="font-bold text-xl flex items-center">
          <span className="text-white">Suitmedia</span>
        </div>

        <div className="space-x-6 font-medium">
          {navItems.map(({ name, path }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <Link
                key={name}
                to={path}
                className={`pb-1 transition-all ${
                  isActive
                    ? 'border-b-2 border-white text-white'
                    : 'hover:border-b-2 hover:border-white/70'
                }`}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
