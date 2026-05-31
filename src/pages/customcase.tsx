import React from 'react';

const CustomCase: React.FC = () => {
  return (
    <div className="w-full min-h-[85vh] bg-[#FFFDF9] p-10 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row overflow-hidden min-h-[580px]">
        
        {/* SISI KIRI: Canvas Preview HP Realistis */}
        <div className="flex-[1.2] bg-gray-50 flex items-center justify-center p-10 border-r border-gray-100 relative">
          <div className="w-[230px] h-[460px] bg-gray-900 rounded-[3.2rem] shadow-2xl p-3 relative border-[6px] border-gray-800 flex items-center justify-center">
            {/* Dynamic Dynamic Island / Notch */}
            <div className="absolute top-5 w-16 h-4 bg-gray-900 rounded-full z-20 border border-gray-700"></div>
            {/* Kanvas Gambar */}
            <div className="w-full h-full bg-white rounded-[2.6rem] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
              <span className="text-2xl mb-2">📱</span>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Kanvas Desain Casing</p>
            </div>
          </div>
        </div>

        {/* SISI KANAN: Panel Kontrol Kustomisasi */}
        <div className="flex-1 p-10 flex flex-col justify-between bg-white">
          <div>
            <span className="text-xs font-bold text-[#901C3A] tracking-widest uppercase">Studio Desain</span>
            <h1 className="text-2xl font-extrabold text-gray-900 mt-1 mb-8 tracking-tight">Kustomisasi Case Anda</h1>
            
            <div className="space-y-6">
              {/* Dropdown Device */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tipe Smartphone</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#901C3A] focus:bg-white transition-all">
                  <option>iPhone 15 Pro Max</option>
                  <option>iPhone 14 Pro</option>
                  <option>Samsung Galaxy S24 Ultra</option>
                  <option>Xiaomi 14</option>
                </select>
              </div>

              {/* Tools Element */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tambah Elemen</label>
                <div className="grid grid-cols-2 gap-4">
                  <button className="border border-gray-200 py-3.5 rounded-xl text-xs font-semibold hover:border-[#901C3A] hover:bg-red-50/30 transition-all bg-gray-50 text-gray-800">🖼️ Unggah Foto</button>
                  <button className="border border-gray-200 py-3.5 rounded-xl text-xs font-semibold hover:border-[#901C3A] hover:bg-red-50/30 transition-all bg-gray-50 text-gray-800">✍️ Ketik Teks</button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-black text-white py-4 rounded-2xl text-sm font-semibold hover:bg-gray-900 active:scale-[0.99] transition-all shadow-md mt-8">
            Masukkan ke Keranjang
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomCase;