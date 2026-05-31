import React from 'react';
import { ChevronsRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface LandingPageProps {
  products: Product[];
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ products, onNavigate }) => {
  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Rainbow Striped Banner */}
      <div className="w-full h-64 relative bg-[#FFFDF6] flex items-center justify-center overflow-hidden border-b border-gray-100"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, #FAD02C 0px, #FAD02C 2px, transparent 2px, transparent 20px), repeating-linear-gradient(0deg, #FF9292 10px, #FF9292 12px, transparent 12px, transparent 20px)'
           }}>
        {/* Layer background corak garis-garis sesuai UI lo */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_50%,rgba(100,200,255,0.5)_50%)] bg-[length:40px_40px]"></div>
        
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-black tracking-[0.3em] bg-white/80 px-8 py-4 rounded-xl shadow-sm z-10 text-center">
          CHOOSE YOUR PRETTY CASE
        </h1>
      </div>

      {/* Catalog Preview Section */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-black mb-8">Catalog Design</h2>
        
        <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {products.slice(0, 7).map((product) => (
            <div key={product.id} className="min-w-[150px] text-center flex flex-col items-center">
              <div className="w-36 h-52 bg-gray-50 border border-gray-200 rounded-[2rem] p-2 shadow-sm hover:shadow-md transition flex items-center justify-center overflow-hidden mb-3">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <p className="text-sm font-medium text-gray-800">{product.name}</p>
              <p className="text-xs text-gray-500 mt-1">Rp {product.price.toLocaleString('id-ID')}</p>
            </div>
          ))}

          {/* Tombol Panah >> untuk ke halaman Full Katalog */}
          <button 
            onClick={() => onNavigate('catalog')}
            className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-800 shrink-0 shadow-sm"
          >
            <ChevronsRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};