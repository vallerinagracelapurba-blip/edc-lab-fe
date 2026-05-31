import React from 'react';
import { ShoppingBag, Star, UserCircle2, Search } from 'lucide-react'; // Bisa pake lucide-react atau FontAwesome

interface NavbarProps {
  cartCount?: number;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount = 0, onNavigate }) => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
     {/* Logo */}
<div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('landing')}>
  <img 
    src="/logo.jpg" 
    alt="Logo EDC" 
    className="h-8 w-auto object-contain rounded-md" 
  />
  <span className="text-xl font-extrabold text-[#4A1525] tracking-wide">EDC LAB</span>
</div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-12 relative">
        <input
          type="text"
          placeholder=""
          className="w-full border border-gray-400 rounded-full py-1.5 px-12 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-6 text-gray-800">
        {/* Cart Icon */}
        <button className="relative p-1 hover:text-[#A32246] transition" onClick={() => onNavigate?.('cart')}>
          <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1.5 bg-[#A32246] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* Rating/Star History Icon */}
        <button className="p-1 hover:text-[#A32246] transition" onClick={() => onNavigate?.('review')}>
          <Star className="w-7 h-7 stroke-[1.5]" />
        </button>

        {/* Profile Icon */}
        <button className="p-1 hover:text-[#A32246] transition" onClick={() => onNavigate?.('auth')}>
          <UserCircle2 className="w-7 h-7 stroke-[1.5]" />
        </button>
      </div>
    </nav>
  );
};