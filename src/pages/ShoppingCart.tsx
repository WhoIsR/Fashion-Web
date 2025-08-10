import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ShoppingCart = () => {
  const { state, dispatch } = useCart();
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
  };
  
  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.success('Item removed from cart');
  };
  
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet
          </p>
          <Link to="/catalog" className="btn-primary inline-flex items-center">
            Continue Shopping
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
          Shopping Cart ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="bg-white rounded-lg shadow-sm p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        <Link to={`/product/${item.id}`} className="hover:text-gray-600 transition-colors">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Size: {item.selectedSize} • Color: {item.selectedColor}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg w-32">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="flex-1 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      {/* Price and Remove */}
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${state.total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {state.total >= 200 ? 'Free' : '$15.00'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(state.total * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    ${(state.total + (state.total >= 200 ? 0 : 15) + (state.total * 0.08)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            {state.total < 200 && (
              <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-800">
                  Add ${(200 - state.total).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}
            
            <button className="w-full mt-6 btn-primary">
              Proceed to Checkout
            </button>
            
            <Link
              to="/catalog"
              className="block w-full text-center mt-4 text-gray-600 hover:text-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;