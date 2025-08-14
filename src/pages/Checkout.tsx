
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';

const paymentMethods = [
  {
    id: 'bank',
    label: 'Bank Transfer',
    icon: <Banknote className="w-6 h-6 text-brand-purple-dark" />, // ganti dengan logo bank jika ada
    desc: 'ATM, Mobile Banking, Internet Banking',
  },
  {
    id: 'ewallet',
    label: 'E-Wallet',
    icon: <Smartphone className="w-6 h-6 text-brand-pink" />, // ganti dengan logo e-wallet jika ada
    desc: 'OVO, GoPay, DANA, ShopeePay',
  },
  {
    id: 'credit',
    label: 'Credit Card',
    icon: <CreditCard className="w-6 h-6 text-brand-text" />, // ganti dengan logo kartu kredit jika ada
    desc: 'Visa, MasterCard, JCB',
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    postal: '',
    phone: '',
    payment: 'bank',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentSelect = (id: string) => {
    setForm((prev) => ({ ...prev, payment: id }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch({ type: 'CLEAR_CART' });
    setTimeout(() => navigate('/'), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 pt-32">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="mb-2">Your payment is being processed.</p>
          <p className="text-sm text-gray-500">You will be redirected shortly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-2 sm:px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* FORM */}
  <div className="bg-white rounded-xl shadow-xl p-8 md:p-10">
          <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Floating label input */}
            <div className="relative">
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="peer w-full border-2 border-gray-200 rounded-lg px-4 pt-6 pb-2 focus:border-brand-purple-dark outline-none transition" placeholder=" " />
              <label className="absolute left-4 top-2 text-xs text-gray-500 peer-focus:text-brand-purple-dark transition-all pointer-events-none">Full Name</label>
            </div>
            <div className="relative">
              <input type="text" name="address" value={form.address} onChange={handleChange} required className="peer w-full border-2 border-gray-200 rounded-lg px-4 pt-6 pb-2 focus:border-brand-purple-dark outline-none transition" placeholder=" " />
              <label className="absolute left-4 top-2 text-xs text-gray-500 peer-focus:text-brand-purple-dark transition-all pointer-events-none">Address</label>
            </div>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input type="text" name="city" value={form.city} onChange={handleChange} required className="peer w-full border-2 border-gray-200 rounded-lg px-4 pt-6 pb-2 focus:border-brand-purple-dark outline-none transition" placeholder=" " />
                <label className="absolute left-4 top-2 text-xs text-gray-500 peer-focus:text-brand-purple-dark transition-all pointer-events-none">City</label>
              </div>
              <div className="relative w-32">
                <input type="text" name="postal" value={form.postal} onChange={handleChange} required className="peer w-full border-2 border-gray-200 rounded-lg px-4 pt-6 pb-2 focus:border-brand-purple-dark outline-none transition" placeholder=" " />
                <label className="absolute left-4 top-2 text-xs text-gray-500 peer-focus:text-brand-purple-dark transition-all pointer-events-none">Postal Code</label>
              </div>
            </div>
            <div className="relative">
              <input type="text" name="phone" value={form.phone} onChange={handleChange} required className="peer w-full border-2 border-gray-200 rounded-lg px-4 pt-6 pb-2 focus:border-brand-purple-dark outline-none transition" placeholder=" " />
              <label className="absolute left-4 top-2 text-xs text-gray-500 peer-focus:text-brand-purple-dark transition-all pointer-events-none">Phone Number</label>
            </div>
            {/* Payment method cards */}
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">Payment Method</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {paymentMethods.map((pm) => (
                  <button
                    type="button"
                    key={pm.id}
                    onClick={() => handlePaymentSelect(pm.id)}
                    className={`flex flex-col items-center border-2 rounded-xl p-4 transition-all focus:outline-none ${form.payment === pm.id ? 'border-brand-purple-dark bg-brand-purple-dark/5 shadow-lg' : 'border-gray-200 bg-gray-50 hover:border-brand-purple-dark'}`}
                  >
                    {pm.icon}
                    <span className="mt-2 font-semibold text-sm">{pm.label}</span>
                    <span className="text-xs text-gray-500 mt-1">{pm.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full btn-primary mt-4 py-3 text-lg rounded-xl shadow-lg">Confirm & Pay</button>
          </form>
          <Link to="/cart" className="block text-center mt-4 text-gray-500 hover:text-black text-sm">Back to Cart</Link>
        </div>
        {/* ORDER SUMMARY */}
  <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="divide-y divide-gray-200 mb-4">
            {state.items.map((item) => (
              <div key={item.id + item.selectedSize + item.selectedColor} className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.selectedSize} • {item.selectedColor}</div>
                </div>
                <div className="text-sm font-semibold">x{item.quantity}</div>
                <div className="text-sm font-semibold text-right min-w-[60px]">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${state.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">{state.total >= 200 ? 'Free' : '$15.00'}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${(state.total * 0.08).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold">
            <span>Total</span>
            <span>${(state.total + (state.total >= 200 ? 0 : 15) + (state.total * 0.08)).toFixed(2)}</span>
          </div>
          {state.total < 200 && (
            <div className="mt-3 p-2 bg-amber-50 rounded-lg text-xs text-amber-800">
              Add ${(200 - state.total).toFixed(2)} more for free shipping!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
