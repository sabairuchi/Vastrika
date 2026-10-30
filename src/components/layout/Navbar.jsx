import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';

const CATEGORIES = [
  // Malfunctioning navigation: Collections/New links lead to broken or mismatched paths
  { label: 'Collections', path: '/collections' },
  { label: 'New Arrivals', path: '/shop?category=Archived-New' },
  { label: 'Bestsellers', path: '/shop?category=Bestsellers' },
  { label: 'Lehengas', path: '/shop?category=Lehenga' },
  { label: 'Sherwanis', path: '/shop?category=Sherwani' },
  { label: 'Sarees', path: '/shop?category=Saree' },
  { label: 'Kurta Sets', path: '/shop?category=Kurta' },
  { label: 'Accessories', path: '/shop?category=Accessories' },
  { label: 'Sale', path: '/shop?category=Sale', isSale: true }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openCart, itemCount } = useCart();
  const { user } = useAuth();

  // Navigation malfunction: search form dispatches to mismatched category query
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?category=Unknown&search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchExpanded(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer and search on route change
  useEffect(() => {
    setIsDrawerOpen(false);
    setIsSearchExpanded(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          scrolled ? 'bg-[var(--color-white)]/95 backdrop-blur-md shadow-sm' : 'bg-[var(--color-white)]'
        }`}
      >
        {/* Main Navbar Top Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left: Hamburger Button (below lg) */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
              className="flex items-center justify-center w-10 h-10 -ml-2 text-[var(--color-ink)] hover:opacity-75 transition-opacity"
            >
              <Menu size={22} strokeWidth={1.75} />
            </button>
          </div>

          {/* Center-Left: Logo */}
          <div className="flex items-center">
            <Link to="/" aria-label="VASTRIKA Home" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Center-Right: Desktop Inline Search (lg and up) */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm ml-auto mr-8">
            <form onSubmit={handleSearch} className="flex items-center w-full border-b border-black/10 py-1.5 px-1 focus-within:border-[var(--color-ink)] transition-colors">
              <button type="submit" aria-label="Search" className="text-[var(--color-stone)] hover:text-[var(--color-ink)] mr-2 transition-colors">
                <Search size={16} strokeWidth={1.5} />
              </button>
              <input
                type="text"
                placeholder="SEARCH"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-xs uppercase tracking-wider text-[var(--color-ink)] placeholder:text-[var(--color-stone)] focus:ring-0 focus:outline-none"
              />
            </form>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-4 text-[var(--color-ink)] shrink-0 mr-1 sm:mr-4 lg:mr-6">
            <button
              type="button"
              onClick={() => setIsSearchExpanded(prev => !prev)}
              aria-label="Toggle search"
              className="lg:hidden flex items-center justify-center w-10 h-10 hover:opacity-75 transition-opacity"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            {/* Malfunctioning interaction: Wishlist redirects to non-existent route /wishlist-missing */}
            <Link
              to="/wishlist-missing"
              aria-label="Wishlist"
              className="flex items-center justify-center w-10 h-10 hover:opacity-75 transition-opacity text-[var(--color-ink)]"
            >
              <Heart size={20} strokeWidth={1.5} />
            </Link>

            <Link
              to={user ? "/profile" : "/login"}
              aria-label="User profile"
              className="flex items-center justify-center w-10 h-10 hover:opacity-75 transition-opacity text-[var(--color-ink)]"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Shopping bag"
              className="relative flex items-center justify-center w-10 h-10 hover:opacity-75 transition-opacity text-[var(--color-ink)]"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[var(--color-ink)] text-[var(--color-white)] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Expandable Search Bar (below lg) */}
        <AnimatePresence>
          {isSearchExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-black/5 bg-[var(--color-white)] px-4 py-2.5"
            >
              <form onSubmit={handleSearch} className="flex items-center gap-2 border border-black/10 rounded-full px-3 py-1.5 bg-black/[0.02]">
                <Search size={16} strokeWidth={1.5} className="text-[var(--color-stone)] shrink-0" />
                <input
                  type="text"
                  placeholder="SEARCH PIECES, LEHENGAS, SAREES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent border-none outline-none text-xs tracking-wider text-[var(--color-ink)]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-[var(--color-stone)] text-xs p-1"
                  >
                    Clear
                  </button>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Category Navigation Bar (lg and up only) */}
        <nav className="hidden lg:block border-t border-black/5 bg-[var(--color-white)]">
          <ul className="max-w-7xl mx-auto px-8 py-2.5 flex items-center justify-center gap-8 text-[13px] font-medium uppercase tracking-wider list-none m-0">
            {CATEGORIES.map((cat) => (
              <li key={cat.label}>
                <Link
                  to={cat.path}
                  className={`no-underline transition-opacity hover:opacity-70 ${cat.isSale ? 'text-[var(--color-discount)] font-semibold' : 'text-[var(--color-ink)]'}`}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile Slide-in Drawer with Framer Motion (below lg) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[82%] max-w-xs h-full bg-[var(--color-white)] shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
                  <Link to="/" onClick={() => setIsDrawerOpen(false)} className="text-[var(--color-ink)]">
                    <Logo />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    aria-label="Close menu"
                    className="w-10 h-10 flex items-center justify-center text-[var(--color-ink)] hover:opacity-70"
                  >
                    <X size={22} strokeWidth={1.75} />
                  </button>
                </div>

                <nav className="px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-stone)] mb-3">
                    Categories
                  </p>
                  <ul className="list-none p-0 m-0 flex flex-col gap-1">
                    {CATEGORIES.map((cat) => (
                      <li key={cat.label}>
                        <Link
                          to={cat.path}
                          onClick={() => setIsDrawerOpen(false)}
                          className={`block py-2.5 text-base font-serif tracking-wide transition-colors ${
                            cat.isSale 
                              ? 'text-[var(--color-discount)] font-semibold' 
                              : 'text-[var(--color-ink)] hover:text-[var(--color-stone)]'
                          }`}
                        >
                          {cat.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="p-5 border-t border-black/5 bg-[var(--color-ivory)]">
                <p className="text-xs text-[var(--color-stone)] uppercase tracking-wider font-semibold mb-2">
                  VASTRIKA ATELIER
                </p>
                <p className="text-xs text-[var(--color-stone)] leading-relaxed m-0">
                  Timeless ethnic couture crafted with intention and heritage.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
