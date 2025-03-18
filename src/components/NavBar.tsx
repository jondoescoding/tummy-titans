
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Flask } from 'lucide-react';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300',
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Flask className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
            nutriLab
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={isActive('/')}>
            Home
          </NavLink>
          <NavLink to="/patient" active={isActive('/patient')}>
            Patients
          </NavLink>
          <NavLink to="/dietitian" active={isActive('/dietitian')}>
            Dietitians
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          <Link 
            to={isActive('/patient') ? '/dietitian' : '/patient'}
            className="relative px-4 py-2 overflow-hidden rounded-full group"
          >
            <span className="relative z-10 text-sm font-medium transition duration-300 text-primary group-hover:text-white">
              {isActive('/patient') ? 'Go to Dietitian' : 'Go to Patient'}
            </span>
            <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary transition-all duration-300 rounded-full"></span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      'relative font-medium text-sm transition-colors',
      active ? 'text-primary' : 'text-gray-600 hover:text-gray-900'
    )}
  >
    {children}
    {active && (
      <motion.span
        layoutId="navbar-indicator"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    )}
  </Link>
);

export default NavBar;
