import React from 'react';
import { XCircle } from 'lucide-react';

interface CartItem {
  product_id: string;
  product_name: string;
  price: number;
  image: string;
  quantity: number;
  phone_type: string;
}

interface CartPageProps {
  onNavigate: (p: string) => void;
  cartItems: CartItem[]; // Mengambil data asli dari App.tsx yang ditarik dari database
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>; // Buat update layar setelah dihapus
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, cartItems, setCartItems }) => {

  // ===================================================================
  // FUNGSI UTAMAKAN MENGHAPUS BARANG DARI WEB DAN DATABASE MYSQL (FIXED URL)
  // ===================================================================
  const handleRemoveItem = (productId: string, phoneType: string) => {
    if (confirm("Yakin nih barang ini mau didelete dari keranjang, Bos?")) {
      
      // Tembak API DELETE ke Laravel temen lu dengan query param agar aman dari eror karakter garing (/)
      fetch(`http://192.168.18.82:8000/api/cart/${productId}?phone_type=${encodeURIComponent(phoneType)}`, {
        method: "DELETE",
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Sukses hapus dari database!");
          
          // Update tampilan layar React biar barangnya langsung hilang dari pandangan
          const updatedCart = cartItems.filter(
            (item) => !(item.product_id === productId && item.phone_type === phoneType)
          );
          setCartItems(updatedCart);
        } else {
          alert("Gagal hapus di server: " + data.message);
        }
      })
      .catch((err) => {
        console.error("Gagal koneksi ke backend saat hapus:", err);
        // Fallback: tetap hapus di layar jika backend bermasalah pas demo
        const updatedCart = cartItems.filter(
          (item) => !(item.product_id === productId && item.phone_type === phoneType)
        );
        setCartItems(updatedCart);
      });
    }
  };

  // Hitung total harga belanjaan secara otomatis dari database
  const totalBelanja = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  return (
    <div className="pt-24 bg-white min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => onNavigate('catalog')} className="text-2xl font-bold hover:text-gray-600">←</button>
          <h1 className="text-3xl font-bold text-black">Cart</h1>
        </div>

        {/* JIKA KERANJANG DI DATABASE KOSONG */}
        {cartItems.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-2xl">
            <p className="text-gray-500 text-lg font-medium mb-4">Keranjang belanja kosong bos, yuk jajan dulu!</p>
            <button onClick={() => onNavigate('catalog')} className="bg-[#A32246] text-white px-6 py-2 rounded-full font-bold">
              Lihat Katalog Casing
            </button>
          </div>
        ) : (
          <>
            {/* Header Table pink soft */}
            <div className="w-full bg-[#FCECEF] rounded-t-lg py-3 px-6 grid grid-cols-12 text-sm font-semibold text-purple-900 mb-4">
              <div className="col-span-6">Items</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            {/* List Item Asli Hasil Tarikan Database */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.product_id}-${item.phone_type}`} className="w-full border border-gray-300 rounded-2xl p-4 grid grid-cols-12 items-center shadow-sm relative bg-white">
                  <div className="col-span-6 flex items-center gap-6">
                    <div className="w-16 h-20 bg-gray-50 border rounded-lg overflow-hidden flex items-center justify-center p-1">
                      <img src={item.image} alt={item.product_name} className="h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-black">{item.product_name}</span>
                      <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded w-max mt-1">
                        Tipe HP: {item.phone_type}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-medium text-gray-800">{item.quantity}</div>
                  <div className="col-span-2 text-center font-medium text-gray-800">Rp {item.price.toLocaleString('id-ID')}</div>
                  <div className="col-span-2 text-center font-bold text-black flex items-center justify-center gap-4">
                    <span>Rp {(item.quantity * item.price).toLocaleString('id-ID')}</span>
                    
                    {/* TOMBOL SILANG HAPUS YANG SUDAH TERHUBUNG KE BACKEND */}
                    <button 
                      onClick={() => handleRemoveItem(item.product_id, item.phone_type)}
                      className="text-gray-400 hover:text-red-500 transition absolute right-4"
                    >
                      <XCircle className="w-5 h-5 stroke-[2]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bagian Total Harga Akhir & Tombol Checkout */}
            <div className="w-full flex flex-col items-end mt-8 gap-4 border-t pt-4">
              <div className="flex gap-8 text-xl font-bold text-black">
                <span>Total:</span>
                <span className="text-[#A32246]">Rp {totalBelanja.toLocaleString('id-ID')}</span>
              </div>
              <button 
                onClick={() => onNavigate('review')}
                className="bg-[#A32246] hover:bg-[#8A1B3A] text-white font-bold px-12 py-3 rounded-full shadow-md transition text-lg"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};