import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Settings, Package, Heart } from 'lucide-react';
import { mockProducts } from '../data/products';

const Profile = () => {
  const wishlist = mockProducts.slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-brand-bg-light dark:bg-dark-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-pink to-brand-purple-light flex items-center justify-center text-white text-2xl font-bold shadow-md">
              A
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-brand-text dark:text-dark-text">Your Profile</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your account, orders, and wishlist</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary">Edit Profile</button>
            <button className="btn-primary">Sign Out</button>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account details */}
          <div className="lg:col-span-1 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-brand-text dark:text-dark-text">Account</h2>
              <Settings size={18} className="text-gray-400" />
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-gray-700 dark:text-gray-300"><Mail size={16} className="mr-3 text-brand-pink" /> guest@arve.style</li>
              <li className="flex items-center text-gray-700 dark:text-gray-300"><Phone size={16} className="mr-3 text-brand-pink" /> +62 812 0000 0000</li>
              <li className="flex items-center text-gray-700 dark:text-gray-300"><MapPin size={16} className="mr-3 text-brand-pink" /> Jakarta, Indonesia</li>
            </ul>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-brand-text dark:text-dark-text">Recent Orders</h2>
              <Link to="/" className="text-sm text-brand-purple-dark dark:text-dark-primary hover:underline">View all</Link>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border border-dashed border-gray-300 dark:border-dark-border rounded-lg text-gray-600 dark:text-gray-400">
              <Package size={18} className="mt-0.5 sm:mt-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-brand-text dark:text-dark-text">No orders yet</p>
                <p className="text-sm">Start shopping to see your orders here.</p>
              </div>
              <div className="w-full sm:w-auto sm:ml-auto">
                <Link to="/catalog" className="btn-secondary w-full sm:w-auto whitespace-nowrap text-center">Shop Now</Link>
              </div>
            </div>
          </div>

          {/* Wishlist */}
          <div className="lg:col-span-3 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-brand-text dark:text-dark-text flex items-center"><Heart size={18} className="mr-2 text-brand-pink" /> Wishlist</h2>
              <Link to="/catalog" className="text-sm text-brand-purple-dark dark:text-dark-primary hover:underline">Add more</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlist.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition">
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-brand-text dark:text-dark-text truncate group-hover:underline">{p.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
