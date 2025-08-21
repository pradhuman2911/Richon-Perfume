import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit3, MapPin } from 'lucide-react';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, addAddress, addOrder } = useAuth();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phone: ''
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Set default address if available
    if (user.addresses && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
      setSelectedAddressId(defaultAddress.id);
    } else {
      setShowNewAddressForm(true);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    const newAddress = {
      ...formData,
      isDefault: user.addresses.length === 0 // Make it default if it's the first address
    };
    addAddress(newAddress);
    setShowNewAddressForm(false);
    setFormData({
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      phone: ''
    });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddressId && !showNewAddressForm) {
      alert('Please select a shipping address');
      return;
    }
    
    const selectedAddress = getSelectedAddress();
    if (!selectedAddress) {
      alert('Please select a valid shipping address');
      return;
    }

    // Create order data
    const orderData = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
      subtotal: getCartTotal(),
      shipping: 4.99,
      total: getCartTotal() + 4.99,
      shippingAddress: selectedAddress,
      customerInfo: {
        name: user.name,
        email: user.email
      }
    };

    // Add order to user's order history
    const newOrder = addOrder(orderData);
    
    alert(`Order #${newOrder.orderNumber} placed successfully!`);
    clearCart();
    navigate('/account?tab=orders');
  };

  const getSelectedAddress = () => {
    return user?.addresses?.find(addr => addr.id === selectedAddressId);
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <section className="min-h-screen bg-[#F9F3E5] text-[#3B2F2F] py-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Shipping Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.06)] border border-[#ECD5B2]"
        >
          <h2 className="text-3xl font-serif font-bold mb-6">Shipping Details</h2>
          
          {/* User Info */}
          <div className="mb-6 p-4 bg-[#FDF8EF] rounded-lg">
            <p className="text-sm text-[#6D5C4D] mb-1">Shipping to:</p>
            <p className="font-medium text-[#3B2F2F]">{user.name}</p>
            <p className="text-sm text-[#6D5C4D]">{user.email}</p>
          </div>

          {/* Address Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Select Shipping Address</h3>
            
            {/* Existing Addresses */}
            {user.addresses && user.addresses.length > 0 && (
              <div className="space-y-3 mb-4">
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedAddressId === address.id
                        ? 'border-[#D2A679] bg-[#FDF8EF] shadow-sm'
                        : 'border-[#ECD5B2] hover:border-[#D2A679]'
                    }`}
                    onClick={() => {
                      setSelectedAddressId(address.id);
                      setShowNewAddressForm(false);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddressId === address.id}
                            onChange={() => {}}
                            className="text-[#D2A679] focus:ring-[#D2A679]"
                          />
                          <span className="font-medium">
                            {address.firstName} {address.lastName}
                          </span>
                          {address.isDefault && (
                            <span className="text-xs bg-[#D2A679] text-white px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-[#6D5C4D] ml-6">
                          <p>{address.streetAddress}</p>
                          <p>{address.city}, {address.state} {address.postalCode}</p>
                          {address.phone && <p>Phone: {address.phone}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Address Option */}
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                showNewAddressForm
                  ? 'border-[#D2A679] bg-[#FDF8EF] shadow-sm'
                  : 'border-[#ECD5B2] hover:border-[#D2A679]'
              }`}
              onClick={() => {
                setShowNewAddressForm(true);
                setSelectedAddressId(null);
              }}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="address"
                  checked={showNewAddressForm}
                  onChange={() => {}}
                  className="text-[#D2A679] focus:ring-[#D2A679]"
                />
                <Plus size={16} className="text-[#D2A679]" />
                <span className="font-medium text-[#D2A679]">Add New Address</span>
              </div>
            </div>
          </div>

          {/* New Address Form */}
          {showNewAddressForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#ECD5B2] pt-6"
            >
              <form onSubmit={handleAddNewAddress} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border border-[#D2A679] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#fff9f3]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border border-[#D2A679] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#fff9f3]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className="w-full border border-[#D2A679] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#fff9f3]"
                    required
                  />
                </div>


                <div>
                  <label className="block mb-1 text-sm font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-[#D2A679] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#fff9f3]"
                    required
                  />
                </div>
              

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full border border-[#D2A679] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#fff9f3]"
                      required
                    >
                      <option value="">Select State</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Postal Code / ZIP code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full border border-[#D2A679] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#fff9f3]"
                      required
                    />
                  </div>
                </div>

                  <div>
                  <label className="block mb-1 text-sm font-medium">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-[#D2A679] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#fff9f3]"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-[#D2A679] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#fff9f3]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5D3754] text-white py-3 rounded-lg font-medium hover:bg-[#4A2B43] transition-colors"
                >
                  Save Address
                </button>
              </form>
            </motion.div>
          )}

          {/* Selected Address Summary */}
          {selectedAddressId && !showNewAddressForm && (
            <div className="mt-6 p-4 bg-[#FDF8EF] rounded-lg">
              <h4 className="font-semibold text-[#3B2F2F] mb-2">Selected Address:</h4>
              {(() => {
                const address = getSelectedAddress();
                return address ? (
                  <div className="text-sm text-[#6D5C4D]">
                    <p className="font-medium">{address.firstName} {address.lastName}</p>
                    <p>{address.streetAddress}</p>
                    <p>{address.city}, {address.state} {address.postalCode}</p>
                    {address.phone && <p>Phone: {address.phone}</p>}
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.06)] border border-[#ECD5B2]"
        >
          <h2 className="text-3xl font-serif font-bold mb-6">Order Summary</h2>
          <div className="divide-y divide-[#f1e2cc] max-h-80 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-3">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-[#6D5C4D]">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-base">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$4.99</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4 border-t">
              <span>Total</span>
              <span>${(getCartTotal() + 4.99).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full bg-gradient-to-r from-[#D2A679] to-[#ECD5B2] hover:from-[#c59c68] hover:to-[#e1c8a2] text-white font-bold py-4 rounded-full transition-all shadow-lg text-lg"
          >
            Place Order
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Checkout;