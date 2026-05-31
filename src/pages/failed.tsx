import React from 'react';

export const Failed: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* KIRI */}
      <div className="w-[45%] bg-[#d2ebff] rounded-br-[4rem] rounded-tr-[4rem] shadow-lg flex flex-col items-center justify-center border-r border-blue-200">
        <div className="w-48 h-48 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-300 shadow-xl mb-6 rounded-3xl" />
        <h1 className="text-2xl font-bold text-[#8b0000] tracking-widest">EDC LAB</h1>
      </div>

      {/* KANAN */}
      <div className="w-[55%] flex flex-col justify-center px-16 lg:px-32 bg-gray-50">
        <h2 className="text-2xl font-bold text-black mb-6">Verifikasi</h2>
        
        <div className="w-full max-w-sm flex flex-col gap-5">
          <div>
            <label className="block text-sm text-black mb-1.5">Input kode</label>
            <input 
              type="text" 
              defaultValue="123456"
              className="w-full bg-[#fae8e8] text-black border border-red-500 rounded-lg px-4 py-2.5 outline-none shadow-inner tracking-widest font-bold" 
            />
            {/* Teks Error Muncul Di Sini */}
            <p className="text-xs text-red-600 font-medium mt-2">Kode yang anda masukkan salah</p>
          </div>
          
          <div className="mt-1 flex gap-4">
            <button className="flex-1 bg-white border border-[#b53154] text-[#b53154] font-medium rounded-full py-2 hover:bg-red-50 transition-colors">
              Kirim ulang
            </button>
            <button className="flex-1 bg-[#b53154] text-white font-medium rounded-full py-2 hover:bg-[#8f2541] transition-colors">
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};