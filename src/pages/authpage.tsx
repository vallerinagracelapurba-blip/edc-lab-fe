import React, { useState } from 'react';

export const AuthPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(false); // Toggle Login/Sign Up state

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Container Utama Box */}
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 min-h-[550px]">
        
        {/* Sisi Kiri - Panel Biru Melengkung Bulat Cantik */}
        <div className="flex-1 bg-[#D2E6FF] rounded-br-[8rem] md:rounded-tr-[8rem] md:rounded-br-[0px] flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="w-40 h-40 bg-gradient-to-tr from-pink-400 via-purple-400 to-cyan-400 rounded-full shadow-lg flex items-center justify-center animate-bounce duration-1000" />
          <h1 className="text-3xl font-black text-[#4A1525] tracking-widest mt-4">EDC LAB</h1>
        </div>

        {/* Sisi Kanan - Form Area */}
        <div className="flex-1 flex flex-col justify-center p-12 relative">
          <button onClick={() => onNavigate('landing')} className="absolute top-6 left-6 text-xl font-bold hover:text-gray-600">←</button>
          
          <h2 className="text-3xl font-bold text-black mb-8">{isLogin ? 'Log in' : 'Sign up'}</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Email address</label>
              <input 
                type="email" 
                className="w-full bg-[#FCECEF] border-none rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A32246] transition shadow-inner"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-[#FCECEF] border-none rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A32246] transition shadow-inner"
              />
            </div>

            {!isLogin && <p className="text-xs text-red-500 font-medium">You will receive a code</p>}

            <button 
              onClick={() => onNavigate('catalog')}
              className="w-full bg-[#A32246] text-white font-bold py-3 rounded-full hover:bg-[#8A1B3A] transition shadow-md mt-4 text-center block"
            >
              {isLogin ? 'Log in' : 'Next'}
            </button>
            
            <div className="text-right mt-4">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-gray-600 hover:underline font-medium"
              >
                {isLogin ? "don't have an account?" : 'already have an account?'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};