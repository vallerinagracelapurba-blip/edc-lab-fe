import React from 'react';
import { XCircle } from 'lucide-react';

export const CartPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  // Dummy data keranjang persis kayak UI lo
  const cartItems = [
    { id: '1', name: 'Snoopy', qty: 2, price: 39000, img: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Aesthetic cat', qty: 1, price: 39000, img: 'https://via.placeholder.com/150' }
  ];

  return (
    <div className="pt-24 bg-white min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => onNavigate('catalog')} className="text-2xl font-bold hover:text-gray-600">←</button>
          <h1 className="text-3xl font-bold text-black">Cart</h1>
        </div>

        {/* Header Table pink soft */}
        <div className="w-full bg-[#FCECEF] rounded-t-lg py-3 px-6 grid grid-cols-12 text-sm font-semibold text-purple-900 mb-4">
          <div className="col-span-6">Items</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Total</div>
        </div>

        {/* List Item Cards */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="w-full border border-gray-300 rounded-2xl p-4 grid grid-cols-12 items-center shadow-sm relative bg-white">
              <div className="col-span-6 flex items-center gap-6">
                <div className="w-16 h-20 bg-gray-50 border rounded-lg overflow-hidden flex items-center justify-center p-1">
                  <img src={item.img} alt={item.name} className="h-full object-contain" />
                </div>
                <span className="text-lg font-semibold text-black">{item.name}</span>
              </div>
              <div className="col-span-2 text-center font-medium text-gray-800">{item.qty}</div>
              <div className="col-span-2 text-center font-medium text-gray-800">Rp {item.price.toLocaleString('id-ID')}</div>
              <div className="col-span-2 text-center font-bold text-black flex items-center justify-center gap-4">
                <span>Rp {(item.qty * item.price).toLocaleString('id-ID')}</span>
                <button className="text-gray-400 hover:text-red-500 transition absolute right-4">
                  <XCircle className="w-5 h-5 stroke-[2]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Checkout Aksi Akhir */}
        <div className="w-full flex justify-end mt-8">
          <button 
            onClick={() => onNavigate('review')}
            className="bg-[#A32246] hover:bg-[#8A1B3A] text-white font-bold px-12 py-3 rounded-full shadow-md transition text-lg"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};