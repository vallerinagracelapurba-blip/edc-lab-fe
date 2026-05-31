import React, { useState } from 'react';
import {
  ShoppingBag, Star, User, Search, ArrowLeft, X,
  Edit2, Package, Upload, Camera, Plus, Minus, Trash2, LogOut,
  ShieldCheck, ShoppingCart, MessageSquare, Download, Tag,
  Users, ClipboardList, Calendar, Check, AlertTriangle, Truck,
  ChevronsRight, UserPlus
} from 'lucide-react';

// ================= TYPESCRIPT INTERFACES =================
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  material: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
  phoneType: string;
}

interface OrderHistory {
  id: string;
  date: string;
  name: string;
  price: number;
  image: string;
  status: 'Menunggu Konfirmasi' | 'Lagi Dikemas' | 'Lagi di Jalan' | 'Sudah diterima' | 'Ditolak';
  rated: boolean;
  rating: number;
  comment: string;
  productId: string;
  customerName: string;
  phoneType: string;
  address?: string;
  phone?: string;
  paymentMethod?: string;
}

interface NotificationItem {
  id: string;
  text: string;
  date: string;
  type: 'promo' | 'order_update' | 'order_alert';
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  profilePic: string;
}

interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'Verified' | 'Unverified';
  pic?: string | null;
}

// ================= DATA MOCKUP =================
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Snoopy Case', price: 39000, image: 'https://i.ibb.co.com/JFbY5DY9/Screenshot-2026-04-11-190535.png', material: 'Premium Hardcase', description: 'Casing motif Snoopy yang lucu dengan bahan premium.' },
  { id: '2', name: 'Cute Dog Case', price: 39000, image: 'https://i.ibb.co.com/HfrPSpWj/Screenshot-2026-04-11-190610.png', material: 'Premium Hardcase', description: 'Desain anjing peliharaan yang menggemaskan dengan kualitas cetak tajam.' },
  { id: '3', name: 'Kiddo Case', price: 39000, image: 'https://i.ibb.co.com/Jj5R3sGb/Screenshot-2026-04-11-190628.png', material: 'Premium Hardcase', description: 'Casing warna-warni ceria cocok untuk nuansa playful.' },
  { id: '4', name: 'Random Retro', price: 39000, image: 'https://i.ibb.co.com/YB7Yy08Z/Screenshot-2026-04-11-190708.png', material: 'Premium Hardcase 3D Fullprint', description: 'Desain retro estetik dengan material polikarbonat anti gores.' },
  { id: '5', name: 'Duckie Case', price: 39000, image: 'https://i.ibb.co.com/fLh5jn3/Screenshot-2026-04-11-190725.png', material: 'Premium Hardcase', description: 'Karakter bebek kuning imut yang siap menemani hari-hari ceria.' },
  { id: '6', name: 'Aesthetic Cat', price: 39000, image: 'https://i.ibb.co.com/N2729Bbj/Screenshot-2026-04-11-190743.png', material: 'Premium Hardcase', description: 'Sentuhan estetik gambar kucing minimalis modern.' },
  { id: '7', name: 'Ocean Blue', price: 39000, image: 'https://i.ibb.co.com/S7s2k6tL/Screenshot-2026-04-11-191115.png', material: 'Premium Hardcase', description: 'Nuansa warna biru laut yang menenangkan pikiran.' },
  { id: '8', name: 'Cutie Pie', price: 39000, image: 'https://i.ibb.co.com/N2zKb1PH/Screenshot-2026-04-11-190814.png', material: 'Premium Hardcase', description: 'Perpaduan ilustrasi imut nan manis.' },
  { id: '9', name: 'Rockstar', price: 42000, image: 'https://i.ibb.co.com/84Q1kHZX/Screenshot-2026-04-11-190824.png', material: 'Premium Softcase Glossy', description: 'Edisi terbatas rockstar dengan efek glossy mewah.' },
  { id: '10', name: 'Pizza Cat', price: 45000, image: 'https://i.ibb.co.com/mVNHgVWD/Screenshot-2026-04-11-191034.png', material: 'Premium Hybrid Case', description: 'Desain pizza dengan kucing di atasnya.' }
];

const AVAILABLE_PHONE_TYPES: string[] = [
  'iPhone 11', 'iPhone 12 / 12 Pro', 'iPhone 13 / 13 Pro', 'iPhone 14 / Pro Max', 'iPhone 15 / 15 Pro'
];

export default function App() {
  // ================= STATES =================
  const [currentView, setCurrentView] = useState<string>('homepage');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Auth & Role
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); 
  const [userRole, setUserRole] = useState<'guest' | 'customer' | 'admin'>('customer'); 
  const [emailInput, setEmailInput] = useState<string>('pasutri@gmail.com');
  const [passwordInput, setPasswordInput] = useState<string>('');

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 'n-1', text: 'Gunakan kode voucher EDCPROMO untuk diskon spesial Rp15.000!', date: '29 Mei 2026', type: 'promo' }
  ]);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  
  // Profile Data
  const [profileData, setProfileData] = useState<UserProfile>({
    name: 'Pasutri Team', 
    email: 'pasutri@gmail.com', 
    phone: '081234567890', 
    dob: '2007-05-31', 
    address: 'Jl. Melati No. 12, Lowokwaru, Malang', 
    profilePic: 'https://i.ibb.co.com/yrZhwTv/Whats-App-Image-2026-05-31-at-02-29-57.jpg' 
  });
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [tempProfileData, setTempProfileData] = useState<UserProfile>({ ...profileData });

  // Banner State
  const [bannerTitle, setBannerTitle] = useState<string>('CHOOSE YOUR PRETTY CASE');
  const [bannerBgImage, setBannerBgImage] = useState<string>(''); 

  // Admin Products State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // HAPUS 'cust_edit' DARI STATE ADMIN MODAL KARENA SEKARANG ADMIN CUMA BISA DELETE CUSTOMER
  const [adminModal, setAdminModal] = useState<'none' | 'add' | 'edit' | 'delete' | 'banner' | 'cust_add' | 'cust_delete'>('none');
  const [activeItem, setActiveItem] = useState<Product | null>(null);

  const [formName, setFormName] = useState<string>('');
  const [formPrice, setFormPrice] = useState<number>(39000);
  const [formMaterial, setFormMaterial] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formImage, setFormImage] = useState<string>('');
  const [formBannerText, setFormBannerText] = useState<string>('');
  const [formBannerBg, setFormBannerBg] = useState<string>('');

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPhoneType, setSelectedPhoneType] = useState<string>(''); 
  const [detailQuantity, setDetailQuantity] = useState<number>(1);
  const [showTypeError, setShowTypeError] = useState<boolean>(false);
  
  const [selectedPayment, setSelectedPayment] = useState<string>('qris');
  const [voucherInput, setVoucherInput] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [isVoucherApplied, setIsVoucherApplied] = useState<boolean>(false);

  const [adminDateFilter, setAdminDateFilter] = useState<string>('');
  
  // ================= DATA TRANSAKSI FULL MEI =================
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([
    { id: 'ORD-5001', date: '2026-05-01', name: 'Snoopy Case', price: 54000, image: INITIAL_PRODUCTS[0].image, status: 'Sudah diterima', rated: true, rating: 5, comment: 'Suka banget!', productId: '1', customerName: 'Pasutri', phoneType: 'iPhone 13', address: 'Jl. Melati No. 12, Malang', phone: '081234567890', paymentMethod: 'qris' },
    { id: 'ORD-5002', date: '2026-05-01', name: 'Cute dog Case', price: 54000, image: INITIAL_PRODUCTS[1].image, status: 'Sudah diterima', rated: false, rating: 0, comment: '', productId: '2', customerName: 'Apis Maul', phoneType: 'iPhone 11', address: 'Jl. Sigura-gura, Malang', phone: '081987654321', paymentMethod: 'cod' },
    { id: 'ORD-5003', date: '2026-05-02', name: 'Kiddo Case', price: 54000, image: INITIAL_PRODUCTS[2].image, status: 'Sudah diterima', rated: true, rating: 4, comment: 'Bagus tapi pengiriman lama', productId: '3', customerName: 'Vallerina', phoneType: 'iPhone 11', address: 'Jl. Sigura-gura, Malang', phone: '085612345678', paymentMethod: 'qris' },
    { id: 'ORD-5004', date: '2026-05-03', name: 'Random retro', price: 54000, image: INITIAL_PRODUCTS[3].image, status: 'Sudah diterima', rated: false, rating: 0, comment: '', productId: '4', customerName: 'Cantika', phoneType: 'iPhone 13', address: 'Komp. Ruko Kav. 5, Malang', phone: '081299887766', paymentMethod: 'cod' },
    { id: 'ORD-5005', date: '2026-05-04', name: 'Duckie Case', price: 54000, image: INITIAL_PRODUCTS[4].image, status: 'Ditolak', rated: false, rating: 0, comment: '', productId: '5', customerName: 'Khansa', phoneType: 'iPhone 14', address: 'Jl. Sigura-gura, Malang', phone: '087811223344', paymentMethod: 'qris' },
    { id: 'ORD-5006', date: '2026-05-05', name: 'Aesthetic cat', price: 54000, image: INITIAL_PRODUCTS[5].image, status: 'Sudah diterima', rated: true, rating: 5, comment: 'Lucu banget casingnya!', productId: '6', customerName: 'Sabila Rahma', phoneType: 'iPhone 11', address: 'Jl. Melati No. 12, Malang', phone: '081234567890', paymentMethod: 'qris' },
    { id: 'ORD-5007', date: '2026-05-06', name: 'Ocean blue', price: 54000, image: INITIAL_PRODUCTS[6].image, status: 'Sudah diterima', rated: false, rating: 0, comment: '', productId: '7', customerName: 'Bilqis M', phoneType: 'iPhone 11', address: 'Jl. Sigura-gura, Malang', phone: '081987654321', paymentMethod: 'qris' },
    { id: 'ORD-5008', date: '2026-05-08', name: 'Cutie pie', price: 54000, image: INITIAL_PRODUCTS[7].image, status: 'Sudah diterima', rated: false, rating: 0, comment: '', productId: '8', customerName: 'Indra Jegel', phoneType: 'iPhone 15 Pro', address: 'Komp. Ruko Kav. 5, Malang', phone: '081299887766', paymentMethod: 'cod' },
    { id: 'ORD-5009', date: '2026-05-09', name: 'Rockstar', price: 57000, image: INITIAL_PRODUCTS[8].image, status: 'Sudah diterima', rated: false, rating: 0, comment: '', productId: '9', customerName: 'Satrio Wira', phoneType: 'iPhone 12', address: 'Jl. Sigura-gura, Malang', phone: '085612345678', paymentMethod: 'qris' },
    { id: 'ORD-5010', date: '2026-05-11', name: 'Pizza Cat', price: 60000, image: INITIAL_PRODUCTS[9].image, status: 'Sudah diterima', rated: true, rating: 5, comment: 'Hologramnya keren parah', productId: '10', customerName: 'Damar', phoneType: 'iPhone 11', address: 'Jl. Sigura-gura, Malang', phone: '087811223344', paymentMethod: 'qris' },
    { id: 'ORD-5011', date: '2026-05-12', name: 'Snoopy Case', price: 54000, image: INITIAL_PRODUCTS[0].image, status: 'Sudah diterima', rated: false, rating: 0, comment: '', productId: '1', customerName: 'Bilqis M', phoneType: 'iPhone 13', address: 'Jl. Melati No. 12, Malang', phone: '081234567890', paymentMethod: 'cod' },
    { id: 'ORD-5012', date: '2026-05-14', name: 'Cute dog Case', price: 54000, image: INITIAL_PRODUCTS[1].image, status: 'Sudah diterima', rated: false, rating: 0, comment: '', productId: '2', customerName: 'Pasutri', phoneType: 'iPhone 11', address: 'Jl. Sigura-gura, Malang', phone: '081987654321', paymentMethod: 'qris' },
    { id: 'ORD-5013', date: '2026-05-14', name: 'Kiddo Case', price: 54000, image: INITIAL_PRODUCTS[2].image, status: 'Sudah diterima', rated: true, rating: 4, comment: 'Bagus', productId: '3', customerName: 'Ikhsan Arlatin', phoneType: 'iPhone 12', address: 'Komp. Ruko Kav. 5, Malang', phone: '081299887766', paymentMethod: 'qris' },
    { id: 'ORD-5014', date: '2026-05-15', name: 'Random retro', price: 54000, image: INITIAL_PRODUCTS[3].image, status: 'Sudah diterima', rated: false, rating: 0, comment: '', productId: '4', customerName: 'Memet Fahri', phoneType: 'iPhone 11', address: 'Jl. Sigura-gura, Malang', phone: '085612345678', paymentMethod: 'cod' },
    { id: 'ORD-5015', date: '2026-05-16', name: 'Duckie Case', price: 54000, image: INITIAL_PRODUCTS[4].image, status: 'Sudah diterima', rated: false, rating: 0, comment: '', productId: '5', customerName: 'Damar', phoneType: 'iPhone 12', address: 'Jl. Sigura-gura, Malang', phone: '087811223344', paymentMethod: 'qris' },
    { id: 'ORD-5016', date: '2026-05-17', name: 'Aesthetic cat', price: 54000, image: INITIAL_PRODUCTS[5].image, status: 'Sudah diterima', rated: false, rating: 0, comment: '', productId: '6', customerName: 'Cantika', phoneType: 'iPhone 14', address: 'Jl. Melati No. 12, Malang', phone: '081234567890', paymentMethod: 'qris' },
    { id: 'ORD-5017', date: '2026-05-19', name: 'Ocean blue', price: 54000, image: INITIAL_PRODUCTS[6].image, status: 'Ditolak', rated: false, rating: 0, comment: '', productId: '7', customerName: 'Vallerina.', phoneType: 'iPhone 11', address: 'Komp. Ruko Kav. 5, Malang', phone: '081299887766', paymentMethod: 'cod' },
    { id: 'ORD-5018', date: '2026-05-20', name: 'Cutie pie', price: 54000, image: INITIAL_PRODUCTS[7].image, status: 'Sudah diterima', rated: true, rating: 5, comment: 'Bahannya tebel, aman buat hp', productId: '8', customerName: 'Apis Maul', phoneType: 'iPhone 15', address: 'Jl. Sigura-gura, Malang', phone: '081987654321', paymentMethod: 'qris' },
    { id: 'ORD-5019', date: '2026-05-21', name: 'Pizza Cat', price: 57000, image: INITIAL_PRODUCTS[8].image, status: 'Lagi di Jalan', rated: false, rating: 0, comment: '', productId: '9', customerName: 'Indra Jegel', phoneType: 'iPhone 12 Pro', address: 'Jl. Sigura-gura, Malang', phone: '085612345678', paymentMethod: 'qris' },
    { id: 'ORD-5020', date: '2026-05-22', name: 'Rockstar', price: 60000, image: INITIAL_PRODUCTS[9].image, status: 'Lagi di Jalan', rated: false, rating: 0, comment: '', productId: '10', customerName: 'Hafiz Fajar', phoneType: 'iPhone 11', address: 'Jl. Sigura-gura, Malang', phone: '087811223344', paymentMethod: 'cod' },
    { id: 'ORD-5021', date: '2026-05-23', name: 'Snoopy Case', price: 54000, image: INITIAL_PRODUCTS[0].image, status: 'Lagi Dikemas', rated: false, rating: 0, comment: '', productId: '1', customerName: 'Khansa', phoneType: 'iPhone 13 Pro', address: 'Jl. Melati No. 12, Malang', phone: '081234567890', paymentMethod: 'qris' },
    { id: 'ORD-5022', date: '2026-05-24', name: 'Cute dog Case', price: 54000, image: INITIAL_PRODUCTS[1].image, status: 'Lagi Dikemas', rated: false, rating: 0, comment: '', productId: '2', customerName: 'Gabriel Theo', phoneType: 'iPhone 14', address: 'Komp. Ruko Kav. 5, Malang', phone: '081299887766', paymentMethod: 'qris' },
    { id: 'ORD-5023', date: '2026-05-25', name: 'Kiddo Case', price: 54000, image: INITIAL_PRODUCTS[2].image, status: 'Menunggu Konfirmasi', rated: false, rating: 0, comment: '', productId: '3', customerName: 'Cantika', phoneType: 'iPhone 13', address: 'Jl. Sigura-gura, Malang', phone: '081987654321', paymentMethod: 'cod' },
    { id: 'ORD-5024', date: '2026-05-26', name: 'Random retro', price: 54000, image: INITIAL_PRODUCTS[3].image, status: 'Menunggu Konfirmasi', rated: false, rating: 0, comment: '', productId: '4', customerName: 'Vallerina', phoneType: 'iPhone 11', address: 'Jl. Sigura-gura, Malang', phone: '085612345678', paymentMethod: 'qris' },
    { id: 'ORD-5025', date: '2026-05-27', name: 'Duckie Case', price: 54000, image: INITIAL_PRODUCTS[4].image, status: 'Menunggu Konfirmasi', rated: false, rating: 0, comment: '', productId: '5', customerName: 'Damar', phoneType: 'iPhone 11', address: 'Jl. Melati No. 12, Malang', phone: '081234567890', paymentMethod: 'qris' },
    { id: 'ORD-5026', date: '2026-05-28', name: 'Aesthetic cat', price: 54000, image: INITIAL_PRODUCTS[5].image, status: 'Menunggu Konfirmasi', rated: false, rating: 0, comment: '', productId: '6', customerName: 'Bilqis M.', phoneType: 'iPhone 15', address: 'Komp. Ruko Kav. 5, Malang', phone: '081299887766', paymentMethod: 'cod' },
    { id: 'ORD-5027', date: '2026-05-28', name: 'Ocean blue', price: 54000, image: INITIAL_PRODUCTS[6].image, status: 'Menunggu Konfirmasi', rated: false, rating: 0, comment: '', productId: '7', customerName: 'Sabila Rahma', phoneType: 'iPhone 14 Pro Max', address: 'Jl. Sigura-gura, Malang', phone: '081987654321', paymentMethod: 'qris' },
    { id: 'ORD-5028', date: '2026-05-29', name: 'Cutie pie', price: 54000, image: INITIAL_PRODUCTS[7].image, status: 'Menunggu Konfirmasi', rated: false, rating: 0, comment: '', productId: '8', customerName: 'Indra Jegel', phoneType: 'iPhone 11', address: 'Jl. Sigura-gura, Malang', phone: '085612345678', paymentMethod: 'qris' },
    { id: 'ORD-5029', date: '2026-05-30', name: 'Rockstar', price: 57000, image: INITIAL_PRODUCTS[8].image, status: 'Menunggu Konfirmasi', rated: false, rating: 0, comment: '', productId: '9', customerName: 'Pasutri', phoneType: 'iPhone 12', address: 'Jl. Melati No. 12, Malang', phone: '081234567890', paymentMethod: 'qris' },
    { id: 'ORD-5030', date: '2026-05-31', name: 'Pizza Cat', price: 60000, image: INITIAL_PRODUCTS[9].image, status: 'Menunggu Konfirmasi', rated: false, rating: 0, comment: '', productId: '10', customerName: 'Gabriel Theo', phoneType: 'iPhone 15 Pro', address: 'Komp. Ruko Kav. 5, Malang', phone: '081299887766', paymentMethod: 'cod' },
  ]);

  const [selectedReviewOrder, setSelectedReviewOrder] = useState<OrderHistory | null>(null);
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');

  // Customer State
  const [customers, setCustomers] = useState<CustomerItem[]>([
    { id: 'CST-01', name: 'Pasutri Team', email: 'pasutri@gmail.com', phone: '081234567890', address: 'Jl. Melati No. 12, Malang', status: 'Verified', pic: 'https://i.ibb.co.com/yrZhwTv/Whats-App-Image-2026-05-31-at-02-29-57.jpg' },
    { id: 'CST-02', name: 'Indra Jegel', email: 'indrajegel@gmail.com', phone: '085612345678', address: 'Jl. Mawar No. 4, Surabaya', status: 'Verified', pic: null },
    { id: 'CST-03', name: 'Bilqis M.', email: 'bilqis@gmail.com', phone: '081299887766', address: 'Komp. Ruko Kav. 5, Malang', status: 'Verified', pic: null },
    { id: 'CST-04', name: 'Gabriel Theo', email: 'gabriel.theo@gmail.com', phone: '081987654321', address: 'Gg. Kelinci No. 90, Jakarta', status: 'Verified', pic: null },
    { id: 'CST-05', name: 'Apis Maulana', email: 'apissmaull@gmail.com', phone: '087811223344', address: 'Perum Indah Blok C, Bandung', status: 'Verified', pic: null },
    { id: 'CST-04', name: 'Satrio Wira', email: 'satrioo@gmail.com', phone: '081987654329', address: 'Gg. Kelinci No. 90, Jakarta', status: 'Verified', pic: null },
    { id: 'CST-05', name: 'Damar', email: 'damarputra@gmail.com', phone: '087811223340', address: 'Perum Indah Blok C, Bandung', status: 'Verified', pic: null },
    { id: 'CST-05', name: 'Vallerina', email: 'vallerina@gmail.com', phone: '087811223347', address: 'Perum Indah Blok C, Bandung', status: 'Verified', pic: null },
    { id: 'CST-04', name: 'Cantika', email: 'cantikaa@gmail.com', phone: '081987654328', address: 'Gg. Kelinci No. 90, Jakarta', status: 'Verified', pic: null },
    { id: 'CST-05', name: 'Khansa', email: 'khansa@gmail.com', phone: '087811223342', address: 'Perum Indah Blok C, Bandung', status: 'Verified', pic: null },
    { id: 'CST-04', name: 'Sabila Rahma', email: 'sabilarahma@gmail.com', phone: '081987654329', address: 'Gg. Kelinci No. 90, Jakarta', status: 'Verified', pic: null },
    { id: 'CST-05', name: 'Ikhsan Arlatin', email: 'ikhsanarlatin@gmail.com', phone: '087811223340', address: 'Perum Indah Blok C, Bandung', status: 'Verified', pic: null },
    { id: 'CST-05', name: 'Memet Fahri', email: 'memet@gmail.com', phone: '087811223347', address: 'Perum Indah Blok C, Bandung', status: 'Verified', pic: null },
    { id: 'CST-04', name: 'Hafiz Fajar', email: 'hafizfajar@gmail.com', phone: '081987654328', address: 'Gg. Kelinci No. 90, Jakarta', status: 'Verified', pic: null }
  ]);

  const [activeCustomer, setActiveCustomer] = useState<CustomerItem | null>(null);
  
  const [formCustName, setFormCustName] = useState<string>('');
  const [formCustEmail, setFormCustEmail] = useState<string>('');
  const [formCustPhone, setFormCustPhone] = useState<string>('');
  const [formCustAddress, setFormCustAddress] = useState<string>('');
  const [formCustStatus, setFormCustStatus] = useState<'Verified' | 'Unverified'>('Verified');

  // ================= COMPUTED VALUES =================
  const filteredProducts = products.filter((product: Product) => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrdersAdmin = adminDateFilter 
    ? orderHistory.filter((order: OrderHistory) => order.date === adminDateFilter)
    : orderHistory;

  const calculatedCartTotal = cartItems.reduce((sum: number, item: CartItem) => sum + (item.quantity * item.price), 0);
  const ongkosKirim = 15000;
  const totalFinalTagihan = (calculatedCartTotal + ongkosKirim) - appliedDiscount;

  // ================= FUNCTIONS =================
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordInput === 'ADMIN123') {
      setIsLoggedIn(true); setUserRole('admin'); setCurrentView('homepage'); alert("Berhasil masuk sebagai ADMIN!");
    } else if (emailInput && passwordInput) {
      setIsLoggedIn(true); setUserRole('customer'); setCurrentView('homepage'); alert("Berhasil masuk sebagai Customer!");
    } else {
      alert("Isi email dan password terlebih dahulu!");
    }
  };

  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setCurrentView('verify');
  };

  const handleVerifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); alert("Verifikasi OTP Berhasil! Silakan masuk ke akun baru kamu."); setCurrentView('login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setUserRole('guest'); setCartItems([]); setEmailInput(''); setPasswordInput(''); setCurrentView('homepage'); alert("Anda telah berhasil logout.");
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product); setSelectedPhoneType(''); setDetailQuantity(1); setShowTypeError(false);
  };

  const handleAddToCartFromDetail = () => {
    if (!isLoggedIn) { alert("Akses Ditolak! Sign Up atau Login dulu."); setSelectedProduct(null); setCurrentView('login'); return; }
    if (!selectedPhoneType) { setShowTypeError(true); return; }
    if (!selectedProduct) return;

    setCartItems(prev => {
      const existing = prev.find((item: CartItem) => item.id === selectedProduct.id && item.phoneType === selectedPhoneType);
      if (existing) {
        return prev.map((item: CartItem) => (item.id === selectedProduct.id && item.phoneType === selectedPhoneType) ? { ...item, quantity: item.quantity + detailQuantity } : item);
      }
      return [...prev, { ...selectedProduct, quantity: detailQuantity, phoneType: selectedPhoneType }];
    });
    alert(`Sukses! ${detailQuantity} pcs masuk ke keranjang.`); setSelectedProduct(null); 
  };

  const handleDirectCheckoutFromDetail = () => {
    if (!isLoggedIn) { alert("Login dulu ya!"); setCurrentView('login'); return; }
    if (!selectedPhoneType) { setShowTypeError(true); return; }
    if (!selectedProduct) return;

    setCartItems([{ ...selectedProduct, quantity: detailQuantity, phoneType: selectedPhoneType }]);
    setSelectedProduct(null); setCurrentView('checkout'); 
  };

  const adjustCartItemQuantity = (id: string, phoneType: string, type: 'inc' | 'dec') => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === id && item.phoneType === phoneType) {
        const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter((item): item is CartItem => item !== null));
  };

  const handleApplyVoucher = () => {
    if (voucherInput.toUpperCase() === 'EDCPROMO') {
      setAppliedDiscount(15000); setIsVoucherApplied(true); alert("Horee! Voucher diskon Rp 15.000 berhasil digunakan.");
    } else {
      setAppliedDiscount(0); setIsVoucherApplied(false); alert("Maaf, kode voucher tidak valid atau kedaluarsa.");
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; const imageUrl = URL.createObjectURL(file); setTempProfileData({ ...tempProfileData, profilePic: imageUrl });
    }
  };

  const handleAdminProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; const localUrl = URL.createObjectURL(file); setFormImage(localUrl);
    }
  };

  const handleBannerBgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; const localUrl = URL.createObjectURL(file); setFormBannerBg(localUrl);
    }
  };

  const openAddModal = () => {
    setFormName(''); setFormPrice(39000); setFormMaterial('Premium Hardcase 3D'); setFormDescription(''); setFormImage(''); setActiveItem(null); setAdminModal('add');
  };

  const openEditModal = (product: Product) => {
    setActiveItem(product);
    setFormName(product.name); setFormPrice(product.price); setFormMaterial(product.material); setFormDescription(product.description); setFormImage(product.image);
    setAdminModal('edit');
  };

  const handleSaveProduct = () => {
    if (!formName || !formPrice || !formImage) { alert("Mohon lengkapi Nama, Harga, dan File Gambar casing!"); return; }
    if (adminModal === 'add') {
      const newProduct: Product = { id: String(products.length + 1), name: formName, price: Number(formPrice), material: formMaterial, description: formDescription, image: formImage };
      setProducts([...products, newProduct]); alert("Item casing baru berhasil ditambahkan!");
    } else if (adminModal === 'edit' && activeItem) {
      setProducts(products.map((p: Product) => p.id === activeItem.id ? { ...p, name: formName, price: Number(formPrice), material: formMaterial, description: formDescription, image: formImage } : p));
      alert("Perubahan spesifikasi casing berhasil disimpan!");
    }
    setAdminModal('none'); setActiveItem(null);
  };

  const handleUpdateBanner = () => {
    if (!formBannerText.trim()) { alert("Teks banner tidak boleh kosong!"); return; }
    setBannerTitle(formBannerText); setBannerBgImage(formBannerBg); 
    setAdminModal('none'); alert("Banner utama (Teks & Background Image) berhasil diperbarui!");
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderHistory['status']) => {
    setOrderHistory(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    let statusMessage = '';
    let notifType: 'order_update' | 'order_alert' = 'order_update';

    if (newStatus === 'Lagi Dikemas') statusMessage = `Pesanan kamu (${orderId}) telah disetujui admin dan sedang dikemas. 📦`;
    if (newStatus === 'Lagi di Jalan') statusMessage = `Kabar baik! Paket (${orderId}) sedang diserahkan ke kurir & lagi di jalan. 🚚`;
    if (newStatus === 'Sudah diterima') statusMessage = `Paket (${orderId}) tercatat sudah sampai. Selamat belanja! ✨`;
    if (newStatus === 'Ditolak') { statusMessage = `Maaf, pesanan kamu (${orderId}) ditolak/dicancel oleh admin. ⚠️`; notifType = 'order_alert'; }

    const newNotif: NotificationItem = { id: `notif-${Date.now()}`, text: statusMessage, date: 'Hari Ini', type: notifType };
    setNotifications([newNotif, ...notifications]); alert(`Status Order ${orderId} diubah ke: ${newStatus}. Notif telah dikirim ke customer.`);
  };

  const saveProfile = () => {
    setProfileData({ ...tempProfileData }); setIsEditingProfile(false); alert('Profil Anda berhasil diperbarui!');
  };

  // ADMIN CUSTOMER HANYA ADD & DELETE (EDIT DIHAPUS)
  const openAddCustModal = () => {
    setFormCustName(''); setFormCustEmail(''); setFormCustPhone(''); setFormCustAddress(''); setFormCustStatus('Verified'); setActiveCustomer(null); setAdminModal('cust_add');
  };

  const handleSaveCustomer = () => {
    if (!formCustName || !formCustEmail || !formCustPhone) { alert("Nama, Email, dan No HP wajib diisi!"); return; }
    if (adminModal === 'cust_add') {
      const newCust: CustomerItem = { id: `CST-${Math.floor(10 + Math.random() * 90)}`, name: formCustName, email: formCustEmail, phone: formCustPhone, address: formCustAddress, status: formCustStatus, pic: null };
      setCustomers([...customers, newCust]); alert("Data Customer Baru Berhasil Ditambahkan!");
    }
    setAdminModal('none'); setActiveCustomer(null);
  };

  const handleDeleteCustomer = () => {
    if (activeCustomer) {
      setCustomers(customers.filter((c: CustomerItem) => c.id !== activeCustomer.id)); alert("Data Customer berhasil dihapus dari sistem!");
      setAdminModal('none'); setActiveCustomer(null);
    }
  };

  const getSearchPlaceholder = () => {
  switch (currentView) {
    case 'admin_customers':
      return 'Cari data customer...';

    case 'admin_orders':
      return 'Cari data orderan...';

    case 'homepage':
      return 'Cari casing kesukaanmu di sini...';

    case 'review':
      return 'Cari ulasan produk...';

    case 'cart':
      return 'Cari item di keranjang...';

    case 'profile':
      return 'Cari data profil...';

    default:
      return 'Cari data...';
  }
};

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-black antialiased relative w-full">
      
      {/* ================= NAVBAR ================= */}
      <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-12 py-3.5 flex justify-between items-center fixed top-0 left-0 z-50 shadow-sm">
        <div onClick={() => { setCurrentView('homepage'); searchQuery && setSearchQuery(''); setSelectedProduct(null); }} className="flex items-center gap-2 cursor-pointer select-none">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <span className="absolute text-pink-500 font-bold text-xl animate-pulse" style={{ transform: 'translate(-5px, -5px)' }}>✦</span>
            <span className="absolute text-emerald-400 font-bold text-lg" style={{ transform: 'translate(6px, -4px)' }}>✦</span>
            <span className="absolute text-purple-500 font-bold text-xl" style={{ transform: 'translate(1px, 6px)' }}>✦</span>
          </div>
          <span className="text-xl font-black text-[#42040D] tracking-tight ml-1">EDC LAB</span>
        </div>

        <div className="flex-1 max-w-xl mx-8 relative">
          <input 
            type="text" 
            placeholder={getSearchPlaceholder()}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 pl-12 pr-4 bg-gray-50/50 focus:outline-none focus:border-gray-400 text-xs text-black" 
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-xs font-bold">✕</button>
          )}
        </div>

        <div className="flex items-center gap-6 text-gray-700 relative">
          
          {userRole !== 'admin' && (
            <div className="relative">
              <button type="button" onClick={() => setShowNotifications(!showNotifications)} className="p-1 hover:text-black transition relative">
                <MessageSquare className="w-5 h-5 stroke-[1.5]" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{notifications.length}</span>
              </button>
              
              {showNotifications && (
                <div className="absolute top-10 right-0 w-80 bg-white shadow-xl rounded-2xl border border-gray-100 p-4 z-50 max-h-[350px] overflow-y-auto">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <h4 className="text-sm font-bold text-gray-900">Pemberitahuan Kamu</h4>
                    <button type="button" onClick={() => setShowNotifications(false)}><X className="w-4 h-4 text-gray-400 hover:text-black" /></button>
                  </div>
                  <div className="space-y-2 text-left">
                    {notifications.map((notif: NotificationItem) => (
                      <div key={notif.id} className={`p-2.5 border rounded-xl text-[11px] font-medium text-slate-700 flex gap-2 items-start ${notif.type === 'order_alert' ? 'bg-red-50 border-red-100' : notif.type === 'order_update' ? 'bg-blue-50 border-blue-100' : 'bg-pink-50 border-pink-100'}`}>
                        {notif.type === 'order_alert' ? <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" /> : notif.type === 'order_update' ? <Package className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> : <Tag className="w-4 h-4 text-[#A32246] shrink-0 mt-0.5" />}
                        <div><span>{notif.text}</span><span className="block text-[9px] text-gray-400 mt-1 font-normal">{notif.date}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {userRole === 'admin' ? (
            <>
              <button type="button" onClick={() => setCurrentView('admin_customers')} className={`p-1 hover:text-black transition relative ${currentView === 'admin_customers' ? 'text-[#A32246]' : ''}`} title="Data Customer"><Users className="w-5 h-5 stroke-[1.5]" /></button>
              <button type="button" onClick={() => setCurrentView('admin_orders')} className={`p-1 hover:text-black transition relative ${currentView === 'admin_orders' ? 'text-[#A32246]' : ''}`} title="Data Orderan"><ClipboardList className="w-5 h-5 stroke-[1.5]" /></button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => { if(isLoggedIn) setCurrentView('cart'); else setCurrentView('login'); }} className={`p-1 hover:text-black transition relative ${currentView === 'cart' || currentView === 'checkout' ? 'text-[#A32246]' : ''}`}>
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {isLoggedIn && cartItems.length > 0 && <span className="absolute -top-1 -right-1.5 bg-[#A32246] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{cartItems.reduce((acc: number, curr: CartItem) => acc + curr.quantity, 0)}</span>}
              </button>
              <button type="button" onClick={() => { if(isLoggedIn) { setSelectedReviewOrder(null); setCurrentView('review'); } else setCurrentView('login'); }} className={`p-1 hover:text-black transition ${currentView === 'review' ? 'text-[#A32246]' : ''}`}><Star className="w-5 h-5 stroke-[1.5]" /></button>
            </>
          )}

          <button type="button" onClick={() => { if (isLoggedIn) { setTempProfileData({ ...profileData }); setIsEditingProfile(false); setCurrentView('profile'); } else { setCurrentView('login'); } }} className={`p-1 hover:text-black transition flex items-center gap-1 ${currentView === 'profile' ? 'text-[#A32246]' : ''}`}>
            <User className="w-5 h-5 stroke-[1.5]" />
            {isLoggedIn ? <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${userRole === 'admin' ? 'bg-slate-800 text-white' : 'bg-pink-100 text-[#A32246]'}`}>{userRole === 'admin' ? 'Admin' : 'Profile'}</span> : <span className="text-[10px] font-bold bg-gray-200 px-1.5 py-0.5 rounded-md text-gray-700">Login</span>}
          </button>
        </div>
      </nav>
      <div className="h-16"></div>

      {/* ================= MODAL ADMIN PRODUCT CRUD & BANNER BG ================= */}
      {(adminModal === 'add' || adminModal === 'edit') && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl p-6 text-left">
            <div className="flex justify-between items-center mb-5 border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">{adminModal === 'add' ? 'Tambah Desain Baru' : 'Ubah Spesifikasi Casing'}</h3>
              <button type="button" onClick={() => { setAdminModal('none'); setActiveItem(null); }} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <label className="w-full h-36 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition overflow-hidden relative group shadow-inner">
                  {formImage ? (
                    <>
                      <img src={formImage} alt="Katalog Explorer Preview" className="w-full h-full object-cover"/>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><Camera className="w-6 h-6 text-white" /><span className="text-white text-xs font-bold ml-2">Ganti dari PC Explorer</span></div>
                    </>
                  ) : (
                    <><Upload className="w-7 h-7 text-gray-400 mb-1" /><span className="text-xs text-gray-600 font-bold">Klik untuk Ambil dari File Explorer PC</span></>
                  )}
                  <input type="file" accept="image/*" onChange={handleAdminProductFileChange} className="hidden" />
                </label>
              </div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Nama Casing</label><input type="text" value={formName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246]" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-bold text-gray-700 mb-1">Harga (Rp)</label><input type="number" value={formPrice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormPrice(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246]" /></div>
                <div><label className="block text-xs font-bold text-gray-700 mb-1">Bahan Material</label><input type="text" value={formMaterial} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormMaterial(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246]" /></div>
              </div>
              <div><label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Produk</label><textarea rows={3} value={formDescription} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormDescription(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] resize-none" /></div>
              <div className="pt-2"><button type="button" onClick={handleSaveProduct} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md">Simpan Data Item</button></div>
            </div>
          </div>
        </div>
      )}

      {adminModal === 'delete' && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100"><Trash2 className="w-8 h-8"/></div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Item Ini?</h3>
            <p className="text-xs text-gray-500 mb-6">Kamu yakin ingin menghapus <b>{activeItem?.name}</b> dari katalog?</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => { setAdminModal('none'); setActiveItem(null); }} className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition">Batal</button>
              <button type="button" onClick={() => { setProducts(products.filter((p: Product) => p.id !== activeItem?.id)); alert('Item dihapus!'); setAdminModal('none'); setActiveItem(null); }} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition shadow-md">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {adminModal === 'banner' && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 text-left shadow-2xl">
            <div className="flex justify-between items-center mb-5 border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">Ubah Teks & Background Banner</h3>
              <button type="button" onClick={() => setAdminModal('none')} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Judul Teks Banner</label>
                <input type="text" value={formBannerText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormBannerText(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-blue-500" placeholder="CHOOSE YOUR PRETTY CASE" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Upload Gambar Background Banner</label>
                <label className="w-full h-28 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group shadow-inner">
                  {formBannerBg ? (
                    <>
                      <img src={formBannerBg} alt="Banner Background Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><Camera className="w-5 h-5 text-white" /><span className="text-white text-[10px] font-bold ml-1.5">Ganti Gambar PC</span></div>
                    </>
                  ) : (
                    <><Upload className="w-6 h-6 text-gray-400 mb-1" /><span className="text-xs text-gray-500 font-bold">Klik untuk Ambil File Gambar dari PC</span></>
                  )}
                  <input type="file" accept="image/*" onChange={handleBannerBgFileChange} className="hidden" />
                </label>
                {formBannerBg && (
                  <button type="button" onClick={() => setFormBannerBg('')} className="text-red-500 text-[10px] font-bold mt-1.5 underline hover:text-red-700">Hapus Gambar (Gunakan warna default)</button>
                )}
              </div>

              <button type="button" onClick={handleUpdateBanner} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md">Simpan Perubahan Banner Luar</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL CRUD DATA MANAGEMENT CUSTOMER (HANYA ADD & DELETE) ================= */}
      {(adminModal === 'cust_add') && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 text-left shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-sm font-bold text-gray-900">Tambah Data Customer Baru</h3>
              <button type="button" onClick={() => { setAdminModal('none'); setActiveCustomer(null); }} className="text-gray-400 hover:text-black"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" value={formCustName} onChange={(e) => setFormCustName(e.target.value)} className="w-full border rounded-xl p-2 bg-gray-50 focus:outline-none" placeholder="Masukkan nama..." />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                <input type="email" value={formCustEmail} onChange={(e) => setFormCustEmail(e.target.value)} className="w-full border rounded-xl p-2 bg-gray-50 focus:outline-none" placeholder="customer@email.com" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nomor Handphone</label>
                <input type="text" value={formCustPhone} onChange={(e) => setFormCustPhone(e.target.value)} className="w-full border rounded-xl p-2 bg-gray-50 focus:outline-none" placeholder="08xxxxxxxx" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Alamat Utama Pengiriman</label>
                <textarea rows={2} value={formCustAddress} onChange={(e) => setFormCustAddress(e.target.value)} className="w-full border rounded-xl p-2 bg-gray-50 focus:outline-none resize-none" placeholder="Alamat rumah konsumen..." />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Status Verifikasi</label>
                <select value={formCustStatus} onChange={(e) => setFormCustStatus(e.target.value as any)} className="w-full border rounded-xl p-2 bg-gray-50 focus:outline-none font-medium">
                  <option value="Verified">Verified Account</option>
                  <option value="Unverified">Unverified Account</option>
                </select>
              </div>
              <button type="button" onClick={handleSaveCustomer} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition mt-2">Simpan Customer Baru</button>
            </div>
          </div>
        </div>
      )}

      {adminModal === 'cust_delete' && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3"><AlertTriangle className="w-6 h-6" /></div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Hapus Data Pelanggan?</h3>
            <p className="text-xs text-gray-500 mb-4">Apakah anda yakin ingin menghapus data member dari <b>{activeCustomer?.name}</b>?</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => { setAdminModal('none'); setActiveCustomer(null); }} className="flex-1 py-2 border rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50">Batal</button>
              <button type="button" onClick={handleDeleteCustomer} className="flex-1 py-2 bg-red-500 text-white rounded-xl text-xs font-bold shadow-md hover:bg-red-600">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL DETAIL PRODUK ================= */}
  {selectedProduct && (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible relative">
        
        {/* KOLOM KIRI: TEMPAT GAMBAR CASING */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex justify-center items-center relative min-h-[380px] md:min-h-[460px]">
          <button 
            type="button" 
            onClick={() => setSelectedProduct(null)} 
            className="absolute top-4 left-4 md:hidden bg-white/80 p-2 rounded-full z-10 font-bold text-gray-700 shadow"
          >
            ✕
          </button>
          
          {/* Frame Putih dibikin fix ukurannya biar proporsional */}
          <div className="bg-white w-[260px] h-[360px] border border-gray-200 rounded-[2rem] flex items-center justify-center p-3 shadow-sm">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl" 
            />
          </div>
        </div>
        {/* KOLOM KANAN: DETAIL TEKS PRODUK */}
        <div className="w-full md:w-1/2 p-6 flex flex-col text-left justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">{selectedProduct.name}</h3>
                <p className="text-base font-black text-[#A32246] mt-0.5">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
              </div>
              <button type="button" onClick={() => setSelectedProduct(null)} className="hidden md:flex p-1.5 border rounded-full hover:bg-gray-100 text-gray-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-pink-50/30 border border-pink-100/50 p-3 rounded-xl space-y-1 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                <ShieldCheck className="w-4 h-4 text-[#A32246]" />
                <span>Spesifikasi Bahan:</span>
              </div>
              <p className="text-[11px] font-extrabold text-gray-800 bg-white px-2 py-0.5 w-fit rounded border border-pink-100">{selectedProduct.material}</p>
              <p className="text-[11px] text-gray-600 font-medium leading-relaxed pt-0.5">{selectedProduct.description}</p>
            </div>

            <div className="space-y-2 border-t pt-3 mb-6">
              <label className="block text-xs font-bold text-gray-800">Pilih Tipe HP Kamu <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-2 max-h-[110px] overflow-y-auto p-1">
                {AVAILABLE_PHONE_TYPES.map((type: string) => (
                  <button key={type} type="button" onClick={() => { setSelectedPhoneType(type); setShowTypeError(false); }} className={`py-1.5 px-3 text-[10px] font-bold rounded-lg border text-center transition ${selectedPhoneType === type ? 'border-[#A32246] bg-pink-50 text-[#A32246]' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'}`}>{type}</button>
                ))}
              </div>
              {showTypeError && <p className="text-[11px] font-bold text-red-500 bg-red-50 p-2 rounded-lg border border-red-200 mt-1">⚠️ Wajib memilih Tipe HP terlebih dahulu!</p>}
            </div>
          </div>

          <div className="border-t pt-4 mt-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-700">Jumlah Pesanan:</span>
              <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg overflow-hidden font-bold text-xs shadow-inner">
                <button type="button" onClick={() => setDetailQuantity(prev => Math.max(1, prev - 1))} className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition">-</button>
                <span className="px-3 text-black text-center min-w-[24px] bg-white py-1.5">{detailQuantity}</span>
                <button type="button" onClick={() => setDetailQuantity(prev => prev + 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 transition">+</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={handleAddToCartFromDetail} className="py-2.5 border-2 border-[#A32246] text-[#A32246] bg-white hover:bg-pink-50 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>+ Keranjang</span>
              </button>
              <button type="button" onClick={handleDirectCheckoutFromDetail} className="py-2.5 bg-[#A32246] hover:bg-[#851B38] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95">
                <ShoppingCart className="w-3.5 h-3.5 fill-white" />
                <span>Beli Sekarang</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )}
      {/* ================= HOMEPAGE ================= */}
      {currentView === 'homepage' && (
        <main className="w-full px-4 md:px-12 py-6">
          
          <div 
            className="w-full rounded-2xl border border-gray-200 overflow-hidden relative h-40 flex items-center justify-center bg-white my-4 group shadow-xs bg-cover bg-center"
            style={{ backgroundImage: bannerBgImage ? `url(${bannerBgImage})` : 'none' }}
          >
            {!bannerBgImage && (
              <div className="absolute inset-0 flex flex-col justify-between opacity-80 pointer-events-none py-2">
                <div className="w-full h-[3px] bg-red-300"></div><div className="w-full h-[3px] bg-yellow-300"></div><div className="w-full h-[3px] bg-blue-300"></div>
              </div>
            )}
            
            {bannerBgImage && <div className="absolute inset-0 bg-black/30 z-0"></div>}

            <h1 className={`relative text-3xl font-black tracking-[0.25em] z-10 text-center uppercase font-mono px-4 ${bannerBgImage ? 'text-white drop-shadow-md' : 'text-black'}`}>
              {bannerTitle}
            </h1>
            
            {userRole === 'admin' && (
              <button type="button" onClick={() => { setFormBannerText(bannerTitle); setFormBannerBg(bannerBgImage); setAdminModal('banner'); }} className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md hover:bg-blue-600 flex items-center gap-1 transition active:scale-95">
                <Edit2 className="w-3 h-3" /> Edit Banner Luar
              </button>
            )}
          </div>

          <div className="mt-10 text-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 'Katalog Desain Utama'}</h2>
            </div>

            {/* BARIS PRODUK HOMEPAGE (GRID 6 KOLOM SEJAJAR, FIX TIDAK TURUN KE BAWAH, TIDAK BISA DI SCROLL GESER) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5 pb-6 pt-2">
              
              {userRole === 'admin' && (
                <div onClick={openAddModal} className="flex flex-col items-center justify-center w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-[1.4rem] cursor-pointer hover:bg-gray-100 transition min-h-[240px] shadow-inner">
                  <Plus className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-xs font-bold text-gray-500">Explorer Add</span>
                </div>
              )}

              {filteredProducts.length === 0 && userRole !== 'admin' ? (
                <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium col-span-full">Desain casing handphone tidak ditemukan.</div>
              ) : (
                /* Menampilkan 5 produk (kalau admin 4 biar pas 6 slot termasuk tombol Add & Grid All) */
                filteredProducts.slice(0, userRole === 'admin' ? 4 : 5).map((product: Product) => (
                  <div key={product.id} className="flex flex-col items-center w-full bg-white p-3 border border-gray-100 rounded-2xl shadow-sm relative group transition hover:shadow-md hover:border-gray-200">
                    <div onClick={() => { if(userRole !== 'admin') openProductDetail(product) }} className={`w-full h-40 xl:h-48 bg-white border border-gray-200 rounded-[1.4rem] p-2 flex items-center justify-center relative overflow-hidden ${userRole !== 'admin' ? 'cursor-pointer' : ''}`}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-[1rem] group-hover:scale-105 transition duration-300" />
                      {userRole !== 'admin' && (
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                          <span className="bg-white/90 text-black font-bold text-[9px] px-2 py-1 rounded-full shadow-sm">Lihat Detail ✨</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-bold text-gray-800 mt-2.5 text-center line-clamp-1 w-full px-1 hover:text-[#A32246]">{product.name}</p>
                    <p className="text-[11px] text-gray-500 font-medium mt-1">Rp {product.price.toLocaleString('id-ID')}</p>

                    {userRole === 'admin' && (
                      <div className="absolute top-4 right-4 flex gap-1 z-20">
                        <button type="button" onClick={(e: React.MouseEvent) => { e.stopPropagation(); openEditModal(product); }} className="p-1.5 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition scale-90"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button type="button" onClick={(e: React.MouseEvent) => { e.stopPropagation(); setActiveItem(product); setAdminModal('delete'); }} className="p-1.5 bg-red-500 text-white rounded shadow hover:bg-red-600 transition scale-90"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* KARTU GRID ALL SEJAJAR DI SAMPING KANAN PRODUK (TIDAK BISA DIGESER) */}
              {(!searchQuery) && (
                <div 
                  onClick={() => setCurrentView('catalog')}
                  className="flex flex-col items-center justify-center w-full bg-pink-50 border border-pink-200 rounded-2xl cursor-pointer hover:bg-pink-100 transition min-h-[240px] text-[#A32246] font-black group shadow-xs px-4 text-center"
                  title="Lihat Semua Katalog"
                >
                  <ChevronsRight className="w-8 h-8 mb-1.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  <span className="text-[13px] tracking-tight uppercase block font-bold">GRID ALL</span>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ================= CATALOG VIEW ================= */}
      {currentView === 'catalog' && (
        <main className="w-full px-4 md:px-12 py-6 pb-28 text-left animate-fadeIn">
          <div className="flex items-center gap-2 mb-6">
            <button type="button" onClick={() => setCurrentView('homepage')} className="text-gray-600 hover:text-black transition"><ArrowLeft className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-gray-900">{searchQuery ? `Catalog Design - Filtered ("${searchQuery}")` : 'Semua Katalog Premium (Grid 10 Items)'}</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {userRole === 'admin' && (
              <div onClick={openAddModal} className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-100 min-h-[250px] shadow-inner">
                <Plus className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-sm font-bold text-gray-500">Explorer Add</span>
              </div>
            )}
            {filteredProducts.map((product: Product) => (
              <div key={product.id} className="flex flex-col items-center bg-white p-3.5 border border-gray-200 rounded-2xl shadow-sm relative group transition hover:shadow-md hover:border-gray-200">
                <div onClick={() => { if(userRole !== 'admin') openProductDetail(product) }} className={`w-full h-48 bg-white border border-gray-200 rounded-[1.8rem] p-2.5 flex items-center justify-center relative overflow-hidden ${userRole !== 'admin' ? 'cursor-pointer' : ''}`}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-[1.4rem] group-hover:scale-105 transition" />
                  {userRole !== 'admin' && (
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <span className="bg-white/95 text-black font-bold text-[10px] px-2.5 py-1 rounded-full shadow">Buka Detail ✨</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-bold text-gray-800 mt-3 text-center line-clamp-1">{product.name}</p>
                <p className="text-[11px] text-gray-500 font-medium mb-3.5 text-center">Rp {product.price.toLocaleString('id-ID')}</p>
                
                {userRole === 'admin' && (
                  <div className="absolute top-5 right-5 flex gap-1.5 z-20">
                    <button type="button" onClick={(e: React.MouseEvent) => { e.stopPropagation(); openEditModal(product); }} className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition scale-90 shadow"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button type="button" onClick={(e: React.MouseEvent) => { e.stopPropagation(); setActiveItem(product); setAdminModal('delete'); }} className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition scale-90 shadow"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ================= LOGIN & AUTH ================= */}
      {currentView === 'login' && (
        <main className="max-w-md mx-auto px-6 py-16 text-left animate-fadeIn">
          <form onSubmit={handleLoginSubmit} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md space-y-4">
            <h3 className="text-xl font-bold text-black text-center mb-1">Masuk Akun</h3>
            <p className="text-[11px] text-slate-400 text-center pb-2">Gunakan akses di bawah untuk mencoba Role Admin / Customer</p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-600 space-y-1 mb-2">
              <p>👤 <b>Customer:</b> pasutri@gmail.com | password123</p>
              <p>🛡️ <b>Admin:</b> Masukkan password <b>ADMIN123</b></p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <input type="email" value={emailInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] text-black" placeholder="nama@email.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <input type="password" required value={passwordInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] text-black" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-[#A32246] hover:bg-[#851B38] text-white text-xs font-bold rounded-full mt-2 transition shadow-sm active:scale-95">Masuk Aplikasi</button>
            <p className="text-center text-xs text-gray-500 mt-4">Belum punya akun? <span onClick={() => setCurrentView('signup')} className="text-[#A32246] font-bold cursor-pointer hover:underline">Daftar di sini</span></p>
          </form>
        </main>
      )}

      {currentView === 'signup' && (
        <main className="max-w-md mx-auto px-6 py-10 text-left animate-fadeIn">
          <form onSubmit={handleSignupSubmit} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md space-y-4">
            <h3 className="text-xl font-bold text-black text-center mb-1">Daftar Akun Baru</h3>
            <p className="text-[11px] text-slate-400 text-center pb-2">Lengkapi data diri kamu di bawah ini</p>
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label><input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] text-black" placeholder="Nama Kamu" /></div>
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label><input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] text-black" placeholder="nama@email.com" /></div>
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Password</label><input type="password" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] text-black" placeholder="••••••••" /></div>
            <div><label className="block text-xs font-semibold text-gray-700 mb-1">Konfirmasi Password</label><input type="password" required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] text-black" placeholder="••••••••" /></div>
            <button type="submit" className="w-full py-2.5 bg-[#A32246] hover:bg-[#851B38] text-white text-xs font-bold rounded-full mt-2 transition shadow-sm active:scale-95">Daftar Sekarang</button>
            <p className="text-center text-xs text-gray-500 mt-4">Sudah punya akun? <span onClick={() => setCurrentView('login')} className="text-[#A32246] font-bold cursor-pointer hover:underline">Masuk di sini</span></p>
          </form>
        </main>
      )}

      {currentView === 'verify' && (
        <main className="max-w-md mx-auto px-6 py-16 text-left animate-fadeIn">
          <form onSubmit={handleVerifyOTP} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md space-y-6">
            <div>
              <h3 className="text-xl font-bold text-black text-center mb-1">Verifikasi Email</h3>
              <p className="text-[11px] text-slate-400 text-center">Masukkan 4 digit kode OTP yang telah dikirim ke email kamu</p>
            </div>
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4].map((i: number) => (
                <input key={i} type="text" maxLength={1} required className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-[#A32246] focus:bg-pink-50 transition" />
              ))}
            </div>
            <p className="text-center text-[10px] text-gray-500">Belum menerima kode? <span className="font-bold text-[#A32246] cursor-pointer hover:underline">Kirim ulang</span></p>
            <button type="submit" className="w-full py-2.5 bg-[#A32246] hover:bg-[#851B38] text-white text-xs font-bold rounded-full transition shadow-sm active:scale-95">Verifikasi OTP</button>
          </form>
        </main>
      )}

      {/* ================= CUSTOMER CART & CHECKOUT ================= */}
      {currentView === 'cart' && userRole !== 'admin' && (
        <main className="w-full px-4 md:px-12 py-6 text-left">
          <div className="flex items-center gap-2 mb-6">
            <button type="button" onClick={() => setCurrentView('catalog')} className="text-gray-600 hover:text-black transition"><ArrowLeft className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          </div>
          {cartItems.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-400 font-medium mb-4">Keranjang belanja kamu masih kosong nih.</p>
              <button type="button" onClick={() => setCurrentView('catalog')} className="px-6 py-2 bg-[#A32246] text-white text-xs font-bold rounded-full active:scale-95 transition shadow-md">Belanja Sekarang</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item: CartItem, index: number) => (
                  <div key={index} className="border border-gray-100 rounded-2xl p-4 flex items-center justify-between bg-white shadow-sm">
                    <div className="flex items-center gap-4">
                      <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover rounded-xl" 
          />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-0.5">{item.name}</h4>
                        <p className="text-[10px] bg-pink-100 text-[#A32246] font-bold px-2 py-0.5 w-fit rounded-md mb-1 border border-pink-200">Tipe: {item.phoneType}</p>
                        <p className="text-xs text-gray-400 font-medium">Rp {item.price.toLocaleString('id-ID')} / pcs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-gray-100 border rounded-lg overflow-hidden text-xs font-bold shadow-inner">
                        <button type="button" onClick={() => adjustCartItemQuantity(item.id, item.phoneType, 'dec')} className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-200">{item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3.5 h-3.5" />}</button>
                        <span className="px-3 bg-white py-1.5 text-gray-900 min-w-[24px] text-center">{item.quantity}</span>
                        <button type="button" onClick={() => adjustCartItemQuantity(item.id, item.phoneType, 'inc')} className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-200"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4 sticky top-24">
                <h3 className="text-sm font-bold text-black border-b pb-2">Ringkasan Belanja</h3>
                <div className="flex justify-between text-xs font-medium text-gray-600"><span>Total Produk</span><span className="text-gray-900 font-bold">Rp {calculatedCartTotal.toLocaleString('id-ID')}</span></div>
                <div className="border-t border-dashed pt-3 flex justify-between items-center text-sm font-black text-gray-900"><span>Subtotal</span><span className="text-[#A32246]">Rp {calculatedCartTotal.toLocaleString('id-ID')}</span></div>
                <button type="button" onClick={() => setCurrentView('checkout')} className="w-full py-2.5 bg-[#A32246] hover:bg-[#851B38] text-white text-xs font-bold rounded-full shadow-md active:scale-95 transition">Lanjut ke Checkout</button>
              </div>
            </div>
          )}
        </main>
      )}

      {currentView === 'checkout' && userRole !== 'admin' && (
        <main className="w-full px-4 md:px-12 py-6 text-left animate-fadeIn">
          <div className="flex items-center gap-2 mb-6 border-b pb-3">
            <button type="button" onClick={() => setCurrentView('cart')} className="text-gray-600 hover:text-black transition"><ArrowLeft className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-gray-900">Konfirmasi Pembayaran</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-7/12 space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-black mb-4 border-b pb-2">Alamat Pengiriman</h3>
                <div className="space-y-3 text-xs text-black">
                  <div><label className="font-semibold text-gray-600">Nama Penerima</label><input type="text" defaultValue={profileData.name} className="w-full border rounded-lg py-2 px-3 mt-1 bg-gray-50" /></div>
                  <div><label className="font-semibold text-gray-600">Nomor HP</label><input type="text" defaultValue={profileData.phone} className="w-full border rounded-lg py-2 px-3 mt-1 bg-gray-50" /></div>
                  <div><label className="font-semibold text-gray-600">Alamat Lengkap</label><textarea rows={3} defaultValue={profileData.address} className="w-full border rounded-lg py-2 px-3 mt-1 bg-gray-50 resize-none" /></div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-black mb-4 border-b pb-2">Metode Pembayaran</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <label className={`flex items-center gap-2 p-3.5 border rounded-xl cursor-pointer ${selectedPayment === 'qris' ? 'border-[#A32246] bg-pink-50/20' : 'border-gray-200'}`}>
                    <input type="radio" checked={selectedPayment === 'qris'} onChange={() => setSelectedPayment('qris')} className="accent-[#A32246]" />
                    <span className="text-xs font-bold text-gray-800">QRIS E-Wallet</span>
                  </label>
                  <label className={`flex items-center gap-2 p-3.5 border rounded-xl cursor-pointer ${selectedPayment === 'cod' ? 'border-[#A32246] bg-pink-50/20' : 'border-gray-200'}`}>
                    <input type="radio" checked={selectedPayment === 'cod'} onChange={() => setSelectedPayment('cod')} className="accent-[#A32246]" />
                    <span className="text-xs font-bold text-gray-800">COD (Bayar di Tempat)</span>
                  </label>
                </div>
                {selectedPayment === 'qris' && (
                  <div className="border-t border-dashed mt-4 pt-4 flex flex-col items-center bg-gray-50 p-4 rounded-xl border">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QRIS" className="w-32 h-32 mb-2 p-1 border bg-white rounded-lg shadow" />
                    <button type="button" onClick={() => alert("Barcode Terdownload!")} className="text-[11px] font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1.5"><Download className="w-3 h-3" /> Unduh Barcode</button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-5/12 bg-white border rounded-2xl p-5 shadow-sm sticky top-24 space-y-4">
              <h3 className="text-sm font-bold text-black border-b pb-2">Ringkasan Tagihan</h3>
              <div className="flex gap-2">
                <input type="text" value={voucherInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVoucherInput(e.target.value)} placeholder="KODE VOUCHER" className="flex-1 border rounded-xl px-3 text-xs uppercase text-black" />
                <button type="button" onClick={handleApplyVoucher} className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-xl active:scale-95 transition">Pakai</button>
              </div>
              <div className="text-xs space-y-2 border-t pt-3 text-gray-600">
                <div className="flex justify-between"><span>Subtotal Produk</span><span className="font-bold text-gray-900">Rp {calculatedCartTotal.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span>Ongkos Kirim</span><span className="font-bold text-gray-900">Rp {ongkosKirim.toLocaleString('id-ID')}</span></div>
                {isVoucherApplied && <div className="flex justify-between text-emerald-600 font-bold"><span>Potongan Diskon</span><span>-Rp {appliedDiscount.toLocaleString('id-ID')}</span></div>}
                <div className="flex justify-between text-sm font-black border-t border-dashed pt-2 text-gray-900"><span>Total Bayar</span><span className="text-[#A32246] text-base">Rp {totalFinalTagihan.toLocaleString('id-ID')}</span></div>
              </div>
              <button
  type="button"
  onClick={() => {
    const newOrder: OrderHistory = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      name: cartItems[0]?.name || "Premium Case",
      price: totalFinalTagihan,
      image: cartItems[0]?.image || INITIAL_PRODUCTS[0].image,
      status: "Menunggu Konfirmasi",
      rated: false,
      rating: 0,
      comment: "",
      productId: cartItems[0]?.id || "1",
      customerName: profileData.name,
      phoneType: cartItems[0]?.phoneType || "iPhone 13",
      address: profileData.address,
      phone: profileData.phone,
      paymentMethod: selectedPayment,
    };

    setOrderHistory([newOrder, ...orderHistory]);

    const phoneNumber = "081367934473";

    const orderList = cartItems
      .map(
        (item) =>
          `• ${item.name} (${item.phoneType}) x${item.quantity}`
      )
      .join("\n");

    const message = encodeURIComponent(
`Halo Admin EDC LAB,

Saya ingin memesan:

${orderList}

Nama : ${profileData.name}
No HP : ${profileData.phone}
Alamat : ${profileData.address}

Metode Pembayaran : ${selectedPayment.toUpperCase()}

Total Tagihan : Rp ${totalFinalTagihan.toLocaleString("id-ID")}

Saya akan mengirimkan bukti pembayaran melalui chat ini setelah pesan terkirim.

Terima kasih.`
    );

    window.location.href =
  `https://wa.me/${phoneNumber}?text=${message}`;

    setCartItems([]);
    setCurrentView("review");
  }}
  className="w-full py-3 bg-[#A32246] hover:bg-[#851B38] text-white text-xs font-bold rounded-full flex justify-center items-center gap-2 active:scale-95 transition shadow-md"
>
  Kirim via WhatsApp
  <MessageSquare className="w-4 h-4" />
</button>
            </div>
          </div>
        </main>
      )}

      {/* ================= HISTORY & REVIEW ================= */}
      {currentView === 'review' && userRole !== 'admin' && (
        <main className="w-full px-4 md:px-12 py-6 text-left animate-fadeIn">
          {!selectedReviewOrder ? (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Riwayat Pembelian Kamu</h2>
              <div className="space-y-4">
                {orderHistory.map((item: OrderHistory) => (
                  <div key={item.id} className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between text-xs border-b pb-2 text-gray-600">
                      <span>Tanggal: {item.date} (<span className="font-mono text-gray-400">{item.id}</span>)</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Sudah diterima' ? 'bg-emerald-50 text-emerald-700' : 
                        item.status === 'Ditolak' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                      }`}>{item.status}</span>
                    </div>
                    <div className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover border rounded-xl" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-950">{item.name} <span className="text-[11px] font-medium text-gray-500">({item.phoneType})</span></h4>
                        <p className="text-xs text-[#A32246] font-bold mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    {item.status === 'Sudah diterima' && !item.rated && (
                      <button type="button" onClick={() => setSelectedReviewOrder(item)} className="px-4 py-1.5 bg-[#A32246] text-white text-xs font-bold rounded-full">Beri Penilaian</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border rounded-3xl p-6 shadow-sm max-w-xl mx-auto space-y-4 animate-fadeIn">
              <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-3">Tulis Review Kepuasan</h3>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s: number) => (
                  <Star key={s} onClick={() => setRatingStars(s)} className={`w-6 h-6 cursor-pointer ${s <= ratingStars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <textarea rows={3} value={reviewComment} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReviewComment(e.target.value)} placeholder="Tulis masukan tentang casing yang kamu terima..." className="w-full border rounded-xl p-3 text-xs bg-gray-50 resize-none text-black" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setSelectedReviewOrder(null)} className="px-4 py-1.5 border rounded-full text-xs text-gray-500">Batal</button>
                <button type="button" onClick={() => {
                  setOrderHistory(orderHistory.map((o: OrderHistory) => o.id === selectedReviewOrder.id ? { ...o, rated: true, rating: ratingStars, comment: reviewComment } : o));
                  alert("Ulasan terkirim!"); setSelectedReviewOrder(null);
                }} className="px-5 py-1.5 bg-[#A32246] text-white text-xs font-bold rounded-full">Kirim</button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ================= PROFILE VIEW ================= */}
      {currentView === 'profile' && (
        <main className="w-full px-4 md:px-12 py-8 animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setCurrentView('homepage')} className="text-gray-600 hover:text-black transition">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">{userRole === 'admin' ? 'Profil Admin' : 'Profil Saya'}</h2>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm max-w-4xl mx-auto space-y-6 text-left">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
              <div className="relative group">
                <div className={`w-24 h-24 rounded-full overflow-hidden border-2 bg-gray-50 flex items-center justify-center shadow-md ${userRole === 'admin' ? 'border-slate-800' : 'border-[#A32246]'}`}>
                  {userRole === 'admin' ? (
                    <span className="text-2xl font-black text-slate-800">ADM</span>
                  ) : (
                    <img src={isEditingProfile ? tempProfileData.profilePic : profileData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  )}
                </div>
                {isEditingProfile && userRole !== 'admin' && (
                  <label className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center text-white cursor-pointer opacity-100 transition duration-200 text-center">
                    <Camera className="w-5 h-5 mb-0.5" />
                    <span className="text-[9px] font-bold">Ganti Foto</span>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>
                )}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">{userRole === 'admin' ? 'Administrator EDC' : profileData.name}</h3>
                <p className="text-xs text-gray-500">{userRole === 'admin' ? 'admin@edclab.com' : profileData.email}</p>
                <div className="mt-1.5 flex justify-center sm:justify-start">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${userRole === 'admin' ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-pink-50 text-[#A32246] border-pink-100'}`}>
                    {userRole === 'admin' ? 'Super Admin ✦' : 'Premium Member ✦'}
                  </span>
                </div>
              </div>
              {!isEditingProfile && userRole !== 'admin' && (
                <button type="button" onClick={() => { setIsEditingProfile(true); setTempProfileData({ ...profileData }); }} className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-black transition shadow-sm">
                  <Edit2 className="w-3.5 h-3.5" /> Ubah Profil
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  disabled={!isEditingProfile} 
                  value={userRole === 'admin' ? 'Administrator EDC' : (isEditingProfile ? tempProfileData.name : profileData.name)} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempProfileData({ ...tempProfileData, name: e.target.value })} 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] focus:bg-white transition disabled:opacity-70 disabled:cursor-not-allowed font-medium text-black" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Email</label>
                <input 
                  type="email" 
                  disabled={!isEditingProfile} 
                  value={userRole === 'admin' ? 'admin@edclab.com' : (isEditingProfile ? tempProfileData.email : profileData.email)} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempProfileData({ ...tempProfileData, email: e.target.value })} 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] focus:bg-white transition disabled:opacity-70 disabled:cursor-not-allowed font-medium text-black" 
                />
              </div>
              {userRole !== 'admin' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nomor Handphone</label>
                    <input 
                      type="text" 
                      disabled={!isEditingProfile} 
                      value={isEditingProfile ? tempProfileData.phone : profileData.phone} 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempProfileData({ ...tempProfileData, phone: e.target.value })} 
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] focus:bg-white transition disabled:opacity-70 disabled:cursor-not-allowed font-medium text-black" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Tanggal Lahir</label>
                    <input 
                      type="date" 
                      disabled={!isEditingProfile} 
                      value={isEditingProfile ? tempProfileData.dob : profileData.dob} 
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempProfileData({ ...tempProfileData, dob: e.target.value })} 
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246] focus:bg-white transition disabled:opacity-70 disabled:cursor-not-allowed font-medium text-black" 
                    />
                  </div>
                </>
              )}
            </div>

            {isEditingProfile && (
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsEditingProfile(false)} className="px-5 py-2 border border-gray-300 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-50 transition">
                  Batal
                </button>
                <button type="button" onClick={saveProfile} className="px-6 py-2 bg-[#A32246] hover:bg-[#851B38] text-white text-xs font-bold rounded-full shadow-md transition">
                  Simpan Perubahan
                </button>
              </div>
            )}

            <div className="border-t border-gray-100 pt-5 mt-2">
              <h4 className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600"/> Keamanan Akun (Ganti Password)
              </h4>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  placeholder="Masukkan Password Baru..." 
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-[#A32246]" 
                />
                <button type="button" onClick={() => alert('Password berhasil diperbarui dengan aman!')} className="px-5 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-black transition">
                  Update Sandi
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-start">
              <button type="button" onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 border border-red-200 text-red-600 bg-red-50/40 hover:bg-red-50 text-xs font-bold rounded-xl transition">
                <LogOut className="w-4 h-4" /><span>Keluar dari Akun (Log Out)</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ================= ADMIN DATA MANAGEMENT CUSTOMER (HANYA ADD DAN DELETE) ================= */}
      {currentView === 'admin_customers' && userRole === 'admin' && (
        <main className="w-full px-4 md:px-12 py-6 text-left animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setCurrentView('homepage')} className="text-gray-600 hover:text-black transition"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Data Management Customer ({customers.length} Member)</h2>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Kelola penuh otorisasi member pelanggan toko EDC Lab premium case</p>
            </div>
            
            <button type="button" onClick={openAddCustModal} className="px-4 py-2 bg-[#A32246] hover:bg-[#851B38] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition active:scale-95">
              <UserPlus className="w-4 h-4" /> Tambah Customer Baru
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b bg-gray-50 text-gray-500 font-bold uppercase text-[10px]">
                    <th className="p-4">Foto</th>
                    <th className="p-4">Nama Lengkap</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">No. HP</th>
                    <th className="p-4">Alamat Rumah</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Aksi Kontrol</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {customers.map((cust: CustomerItem) => (
                    <tr key={cust.id} className="border-b hover:bg-gray-50/50 transition">
                      <td className="p-4">{cust.pic ? <img src={cust.pic} alt="P" className="w-8 h-8 rounded-full object-cover border" /> : <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center font-bold text-[#A32246] text-[10px] border">{cust.name.substring(0,1)}</div>}</td>
                      <td className="p-4 font-bold text-gray-950">{cust.name}</td>
                      <td className="p-4 text-slate-500">{cust.email}</td>
                      <td className="p-4 font-mono text-xs">{cust.phone}</td>
                      <td className="p-4 text-gray-600 max-w-xs truncate">{cust.address || 'Belum mengisi alamat'}</td>
                      <td className="p-4"><span className={`px-2.5 py-0.5 font-bold text-[9px] rounded-full ${cust.status === 'Verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>{cust.status}</span></td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* TOMBOL EDIT DIHAPUS, HANYA ADA TOMBOL HAPUS AKUN */}
                          <button type="button" onClick={() => { setActiveCustomer(cust); setAdminModal('cust_delete'); }} className="p-1.5 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition" title="Hapus Akun"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* ================= KELOLA TRANSAKSI BULAN MEI FULL ================= */}
      {currentView === 'admin_orders' && userRole === 'admin' && (
        <main className="w-full px-4 md:px-12 py-6 text-left animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 border-b pb-4">
            <div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setCurrentView('homepage')} className="text-gray-600 hover:text-black transition"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Kelola Transaksi & Konfirmasi Orderan (Full Bulan Mei 2026)</h2>
              </div>
              <p className="text-xs text-gray-400 mt-1">Gunakan picker tanggal di sebelah kanan untuk menyaring orderan harian secara spesifik</p>
            </div>
            
            <div className="flex items-center gap-1.5 bg-white border p-1.5 rounded-lg shadow-sm text-xs">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span className="font-bold text-gray-500">Filter Tanggal Mei:</span>
              <input type="date" min="2026-05-01" max="2026-05-31" value={adminDateFilter} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdminDateFilter(e.target.value)} className="bg-gray-50 border p-0.5 rounded font-medium text-xs text-gray-800 focus:outline-none" />
              {adminDateFilter && <button type="button" onClick={() => setAdminDateFilter('')} className="text-[10px] bg-red-50 text-red-500 font-bold px-1.5 py-0.5 rounded">Reset Filter</button>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 w-full">
            {filteredOrdersAdmin.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border text-gray-400 text-xs w-full font-medium">
                Tidak ada pesanan masuk pada tanggal ({adminDateFilter}). Coba ganti filter tanggal lainnya di bulan Mei.
              </div>
            ) : (
              filteredOrdersAdmin.map((order: OrderHistory) => (
                <div key={order.id} className="bg-white border rounded-xl p-4 shadow-sm space-y-3 w-full transition hover:border-gray-300">
                  <div className="flex justify-between items-center text-xs border-b pb-2">
                    <div>
                      <span className="text-gray-400">ID Order:</span> <span className="font-mono font-bold text-[#A32246]">{order.id}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">📅 Tanggal: {order.date}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'Sudah diterima' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                        order.status === 'Ditolak' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>{order.status}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="flex gap-2.5 bg-gray-50 p-2.5 rounded border">
                      <img src={order.image} className="w-10 h-12 object-cover rounded border bg-white shadow-xs shrink-0" alt="" />
                      <div>
                        <h4 className="font-bold text-gray-800 line-clamp-1">{order.name}</h4>
                        <p className="text-[10px] text-gray-500 font-medium">Tipe: {order.phoneType}</p>
                        <p className="font-bold text-[#A32246] mt-0.5">Rp {order.price.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                    <div className="p-2.5 bg-gray-50 rounded border">
                      <p className="text-gray-400 text-[9px] font-bold">DATA PELANGGAN:</p>
                      <p className="font-bold text-gray-950 mt-0.5">{order.customerName}</p>
                      <p className="text-gray-500 text-[11px] font-mono">{order.phone || '08123456xxx'}</p>
                    </div>
                    <div className="p-2.5 bg-gray-50 rounded border md:col-span-2">
                      <p className="text-gray-400 text-[9px] font-bold">ALAMAT PENGIRIMAN & PEMBAYARAN:</p>
                      <p className="text-gray-600 text-[11px] mt-0.5 line-clamp-1">{order.address || 'Alamat Utama Pelanggan'}</p>
                      <p className="text-[10px] mt-1 font-semibold text-slate-700">Metode: <span className="uppercase text-blue-600 font-bold">{order.paymentMethod || 'qris'}</span></p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs border-t border-dashed">
                    <div>
                      {order.rated ? (
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 p-1 px-2 rounded text-[10px] font-medium border border-amber-100">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>Rating {order.rating}/5: "{order.comment}"</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-[10px] italic">Belum ada review bintang dari customer</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {order.status === 'Menunggu Konfirmasi' && (
                        <>
                          <button type="button" onClick={() => updateOrderStatus(order.id, 'Ditolak')} className="px-2.5 py-1 text-[10px] font-bold border border-red-200 bg-red-50 text-red-600 rounded-md transition hover:bg-red-100">Tolak</button>
                          <button type="button" onClick={() => updateOrderStatus(order.id, 'Lagi Dikemas')} className="px-3 py-1 text-[10px] font-bold bg-emerald-600 text-white rounded-md shadow transition hover:bg-emerald-700">Terima Orderan</button>
                        </>
                      )}
                      {order.status === 'Lagi Dikemas' && (
                        <button type="button" onClick={() => updateOrderStatus(order.id, 'Lagi di Jalan')} className="px-3 py-1 bg-blue-600 text-white font-bold text-[10px] rounded-md shadow flex items-center gap-1 transition hover:bg-blue-700"><Truck className="w-3 h-3" /> Serahkan ke Kurir</button>
                      )}
                      {order.status === 'Lagi di Jalan' && (
                        <button type="button" onClick={() => updateOrderStatus(order.id, 'Sudah diterima')} className="px-3 py-1 bg-purple-600 text-white font-bold text-[10px] rounded-md shadow flex items-center gap-1 transition hover:bg-purple-700"><Check className="w-3 h-3" /> Tandai Sampai</button>
                      )}
                      {(order.status === 'Sudah diterima' || order.status === 'Ditolak') && <span className="text-[11px] text-gray-400 italic font-medium pr-1">Selesai ✓</span>}
                    </div>
                  </div>
                </div>
              ))
            )}
            </div>
          </main>
        )}

        {/* FOOTER */}
        {currentView !== 'login' && currentView !== 'signup' && currentView !== 'verify' && (
            <footer className="w-full text-center py-6 text-[10px] text-gray-400 border-t mt-12 bg-white border-gray-100">
                © 2026 EDC LAB Premium Case Shop. Designed with precision by Pasutri Team.
            </footer>
        )}

    </div>
  );
}