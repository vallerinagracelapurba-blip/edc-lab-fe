// src/types.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  material: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  phoneType: string;
}

export interface OrderHistory {
  id: string;
  date: string;
  name: string;
  price: number;
  image: string;
  status: string; // 'Menunggu Konfirmasi' | 'Lagi Dikemas' | 'Lagi di Jalan' | 'Sudah diterima' | 'Ditolak'
  rated: boolean;
  rating: number;
  comment: string;
  productId: string;
  customerName: string;
  phoneType: string;
  address: string;
  phone: string;
  paymentMethod: string;
}

export interface NotificationItem {
  id: string;
  text: string;
  date: string;
  type: 'promo' | 'order_update' | 'order_alert';
}