import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const ReviewPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="pt-24 bg-white min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Sisi Kiri - Review Form (Mengambil 2/3 Space) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('cart')} className="text-2xl font-bold hover:text-gray-600">←</button>
            <h1 className="text-3xl font-bold text-black">Review</h1>
          </div>

          {/* 1. Track Order Status */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-800">1. Track order</h3>
            <div className="w-full border border-gray-300 rounded-xl p-4 bg-white shadow-sm text-gray-700 font-medium">
              Sudah diterima
            </div>
          </div>

          {/* 2. Star Rating Selector */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-800">2. Rating</h3>
            <div className="inline-flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 shadow-sm bg-white">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className="transition"
                >
                  <Star 
                    className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 3. Review Text Area */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-800">3. Review</h3>
            <textarea 
              rows={5}
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-1 focus:ring-gray-400 shadow-sm"
              placeholder=""
            />
          </div>

          {/* Bottom Actions */}
          <div className="flex gap-4 pt-4">
            <button className="px-8 py-2 border border-gray-300 rounded-full font-medium text-gray-400 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button className="px-8 py-2 bg-[#A32246] hover:bg-[#8A1B3A] text-white font-semibold rounded-full shadow-md transition">
              Submit
            </button>
          </div>
        </div>

        {/* Sisi Kanan - Order Invoice Card (Mengambil 1/3 Space) */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl h-fit space-y-6">
          <h2 className="text-2xl font-bold text-black">Order</h2>
          
          {/* Item Thumbnail */}
          <div className="flex flex-col items-center py-4 bg-gray-50 rounded-2xl border">
            <div className="w-24 h-32 flex items-center justify-center mb-2">
              <img src="https://via.placeholder.com/150" alt="Product" className="h-full object-contain" />
            </div>
            <span className="text-sm font-medium text-gray-800">Cutie Snoopy</span>
          </div>

          {/* Pricing Details */}
          <div className="space-y-3 text-sm font-medium text-gray-600 border-t pt-4">
            <div className="flex justify-between">
              <span>Price</span>
              <span>Rp 39.000</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>Rp 10.000</span>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <span>Shipping cost</span>
              <span>Rp 15.000</span>
            </div>
            <div className="flex justify-between text-black font-bold text-base pt-1">
              <span>Total</span>
              <span>Rp 44.000</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};