import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CatalogPageProps {
  products: Product[];
  onNavigate: (page: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ products, onNavigate }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQtyChange = (id: string, type: 'inc' | 'dec') => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      if (type === 'dec' && current === 0) return prev;
      return { ...prev, [id]: type === 'inc' ? current + 1 : current - 1 };
    });
  };

  // Hitung total item & harga buat bottom bar
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = products.reduce((sum, p) => sum + (quantities[p.id] || 0) * p.price, 0);

  return (
    <div className="pt-24 bg-white min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => onNavigate('landing')} className="text-2xl font-bold hover:text-gray-600">←</button>
          <h1 className="text-3xl font-bold text-black">Catalog Design</h1>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6">
          {products.map((product) => {
            const qty = quantities[product.id] || 0;
            const isSelected = qty > 0;
            
            return (
              <div key={product.id} className={`p-4 rounded-3xl flex flex-col items-center transition ${isSelected ? 'bg-pink-50/50 ring-1 ring-pink-100' : 'bg-white'}`}>
                <div className="w-40 h-56 bg-white border border-gray-200 rounded-[2.2rem] p-2 shadow-sm overflow-hidden flex items-center justify-center mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 text-center">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1 mb-3">Rp {product.price.toLocaleString('id-ID')}</p>
                
                {/* Counter & Cart Button Layout */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#D2E6FF] rounded-md overflow-hidden text-xs font-bold shadow-sm">
                    <button onClick={() => handleQtyChange(product.id, 'dec')} className="p-1.5 hover:bg-blue-200 text-blue-700">
                      <Minus className="w-3 h-3 stroke-[3]" />
                    </button>
                    <span className="px-3 text-gray-800">{qty}</span>
                    <button onClick={() => handleQtyChange(product.id, 'inc')} className="p-1.5 hover:bg-blue-200 text-blue-700">
                      <Plus className="w-3 h-3 stroke-[3]" />
                    </button>
                  </div>
                  <button className="p-1.5 bg-[#E05297] text-white rounded-md hover:bg-pink-600 transition shadow-sm">
                    <ShoppingCart className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Checkout Bar (Muncul kalau ada item > 0) */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] px-12 py-5 flex justify-between items-center z-50 animate-slide-up">
          <div className="space-y-1">
            <p className="text-sm text-gray-700 font-medium">Total item : <span className="ml-4 font-bold text-lg">{totalItems}</span></p>
            <p className="text-sm text-gray-700 font-medium">Total Price : <span className="ml-3 font-bold text-lg text-black">Rp {totalPrice.toLocaleString('id-ID')}</span></p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setQuantities({})}
              className="px-8 py-2.5 border border-[#A32246] text-[#A32246] font-semibold rounded-full hover:bg-pink-50 transition"
            >
              Cancel
            </button>
            <button 
              onClick={() => onNavigate('cart')}
              className="px-8 py-2.5 bg-[#A32246] text-white font-semibold rounded-full hover:bg-[#8A1B3A] transition shadow-md"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};