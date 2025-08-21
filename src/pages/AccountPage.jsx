// src/pages/AccountPage.jsx
import React, { useState ,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate,useLocation } from "react-router-dom";
import { User, MapPin, Package, Edit3, Trash2, Plus, X ,Calendar, CreditCard} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import PageBreadcrumb from "../components/PageBreadcrumb";

const AccountPage = () => {
  const { user, logout, addAddress, updateAddress, deleteAddress } = useAuth();
  const [activeView, setActiveView] = useState("dashboard");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [addressForm, setAddressForm] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    isDefault: false,
  });

  // Handle URL parameters for direct navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['dashboard', 'addresses', 'orders'].includes(tab)) {
      setActiveView(tab);
    }
  }, [location.search]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-[#3B2F2F] mb-4">Please log in to access your account</h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#D2A679] text-[#3B2F2F] px-6 py-2 rounded-lg font-medium hover:bg-[#C1A15D] transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      updateAddress(editingAddress.id, addressForm);
      setEditingAddress(null);
    } else {
      addAddress(addressForm);
    }
    setAddressForm({
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      phone: "",
      isDefault: false,
    });
    setShowAddressForm(false);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressForm(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      deleteAddress(addressId);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "orders", label: "Order History", icon: Package },
  ];

  return (
    <>
      {/* <PageBreadcrumb
        links={[
          { path: "/", label: "Home" },
          { path: "/account", label: "Account" },
        ]}
      /> */}
      
      <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-serif font-bold text-[#3B2F2F] mb-2">
              Hello, {user.name}
            </h1>
            <p className="text-[#6D5C4D] text-lg">Welcome to your dashboard!</p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-[#ECD5B2] p-6 sticky top-8">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                          activeView === item.id
                            ? "bg-[#5D3754] text-white shadow-md"
                            : "text-[#6D5C4D] hover:bg-[#FDF8EF] hover:text-[#3B2F2F]"
                        }`}
                      >
                        <Icon size={20} />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-[#ECD5B2]">
                  <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[#6D5C4D] hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    <User size={20} />
                    Log out
                  </button>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.main
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-[#ECD5B2] p-8">
                {/* Dashboard View */}
                {activeView === "dashboard" && (
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-[#3B2F2F] mb-8">
                      Dashboard Overview
                    </h2>
                    
                    {/* Quick Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-[#FDF8EF] rounded-xl p-6 text-center">
                        <Package size={32} className="mx-auto text-[#D2A679] mb-2" />
                        <h3 className="text-2xl font-bold text-[#3B2F2F]">
                          {user.orders?.length || 0}
                        </h3>
                        <p className="text-[#6D5C4D]">Total Orders</p>
                      </div>
                      <div className="bg-[#FDF8EF] rounded-xl p-6 text-center">
                        <MapPin size={32} className="mx-auto text-[#D2A679] mb-2" />
                        <h3 className="text-2xl font-bold text-[#3B2F2F]">
                          {user.addresses?.length || 0}
                        </h3>
                        <p className="text-[#6D5C4D]">Saved Addresses</p>
                      </div>
                      <div className="bg-[#FDF8EF] rounded-xl p-6 text-center">
                        <CreditCard size={32} className="mx-auto text-[#D2A679] mb-2" />
                        <h3 className="text-2xl font-bold text-[#3B2F2F]">
                          ${user.orders?.reduce((total, order) => total + order.total, 0).toFixed(2) || '0.00'}
                        </h3>
                        <p className="text-[#6D5C4D]">Total Spent</p>
                      </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-serif font-bold text-[#3B2F2F]">
                          Recent Orders
                        </h3>
                        {user.orders && user.orders.length > 0 && (
                          <button
                            onClick={() => setActiveView('orders')}
                            className="text-[#D2A679] hover:text-[#C1A15D] font-medium"
                          >
                            View All
                          </button>
                        )}
                      </div>
                      
                      {user.orders && user.orders.length > 0 ? (
                        <div className="space-y-4">
                          {user.orders.slice(0, 3).map((order) => (
                            <div key={order.id} className="bg-[#FDF8EF] rounded-xl p-6 border border-[#ECD5B2]">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-bold text-[#3B2F2F]">#{order.orderNumber}</h4>
                                  <p className="text-sm text-[#6D5C4D]">{formatDate(order.date)}</p>
                                </div>
                                <div className="text-right">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                  </span>
                                  <p className="text-lg font-bold text-[#3B2F2F] mt-1">${order.total.toFixed(2)}</p>
                                </div>
                              </div>
                              <p className="text-sm text-[#6D5C4D]">
                                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-[#FDF8EF] rounded-xl p-8 text-center">
                          <Package size={48} className="mx-auto text-[#D2A679] mb-4" />
                          <p className="text-[#6D5C4D] text-lg">
                            You haven't placed any orders yet.
                          </p>
                          <button
                            onClick={() => navigate("/shop")}
                            className="mt-4 bg-[#D2A679] text-[#3B2F2F] px-6 py-2 rounded-lg font-medium hover:bg-[#C1A15D] transition-colors"
                          >
                            Start Shopping
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Account Details */}
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[#3B2F2F] mb-6">
                        Account Details
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#FDF8EF] rounded-xl p-6">
                          <h4 className="font-semibold text-[#3B2F2F] mb-2">Name</h4>
                          <p className="text-[#6D5C4D]">{user.name}</p>
                        </div>
                        <div className="bg-[#FDF8EF] rounded-xl p-6">
                          <h4 className="font-semibold text-[#3B2F2F] mb-2">Email</h4>
                          <p className="text-[#6D5C4D]">{user.email}</p>
                        </div>
                        <div className="bg-[#FDF8EF] rounded-xl p-6">
                          <h4 className="font-semibold text-[#3B2F2F] mb-2">Location</h4>
                          <p className="text-[#6D5C4D]">
                            {user.address?.city || "Not specified"}, {user.address?.country || "Not specified"}
                          </p>
                        </div>
                        <div className="bg-[#FDF8EF] rounded-xl p-6">
                          <h4 className="font-semibold text-[#3B2F2F] mb-2">Member Since</h4>
                          <p className="text-[#6D5C4D]">
                            {user.joinDate ? formatDate(user.joinDate) : "Recently joined"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Orders View */}
                {activeView === "orders" && (
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-[#3B2F2F] mb-8">
                      Order History
                    </h2>
                    
                    {user.orders && user.orders.length > 0 ? (
                      <div className="space-y-6">
                        {user.orders.map((order) => (
                          <div key={order.id} className="bg-[#FDF8EF] rounded-xl p-6 border border-[#ECD5B2]">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-[#3B2F2F]">#{order.orderNumber}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Calendar size={16} className="text-[#6D5C4D]" />
                                  <span className="text-sm text-[#6D5C4D]">{formatDate(order.date)}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                                <p className="text-xl font-bold text-[#3B2F2F] mt-2">${order.total.toFixed(2)}</p>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-4">
                              <h4 className="font-semibold text-[#3B2F2F] mb-2">Items Ordered:</h4>
                              <div className="space-y-2">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex justify-between items-center py-2 border-b border-[#ECD5B2] last:border-b-0">
                                    <div>
                                      <span className="font-medium text-[#3B2F2F]">{item.name}</span>
                                      <span className="text-sm text-[#6D5C4D] ml-2">x{item.quantity}</span>
                                    </div>
                                    <span className="font-semibold text-[#3B2F2F]">${item.total.toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-[#3B2F2F] mb-2">Shipping Address:</h4>
                                <div className="text-sm text-[#6D5C4D]">
                                  <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                  <p>{order.shippingAddress.streetAddress}</p>
                                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                                  {order.shippingAddress.phone && <p>Phone: {order.shippingAddress.phone}</p>}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-[#3B2F2F] mb-2">Order Total:</h4>
                                <div className="text-sm space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-[#6D5C4D]">Subtotal:</span>
                                    <span className="text-[#3B2F2F]">${order.subtotal.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-[#6D5C4D]">Shipping:</span>
                                    <span className="text-[#3B2F2F]">${order.shipping.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between font-bold pt-2 border-t border-[#ECD5B2]">
                                    <span className="text-[#3B2F2F]">Total:</span>
                                    <span className="text-[#3B2F2F]">${order.total.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#FDF8EF] rounded-xl p-8 text-center">
                        <Package size={48} className="mx-auto text-[#D2A679] mb-4" />
                        <p className="text-[#6D5C4D] text-lg">
                          You haven't placed any orders yet.
                        </p>
                        <button
                          onClick={() => navigate("/shop")}
                          className="mt-4 bg-[#D2A679] text-[#3B2F2F] px-6 py-2 rounded-lg font-medium hover:bg-[#C1A15D] transition-colors"
                        >
                          Start Shopping
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Addresses View */}
                {activeView === "addresses" && (
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-serif font-bold text-[#3B2F2F]">
                        Addresses
                      </h2>
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="bg-[#5D3754] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4A2B43] transition-colors flex items-center gap-2"
                      >
                        <Plus size={20} />
                        ADD A NEW ADDRESS
                      </button>
                    </div>

                    {user.addresses && user.addresses.length > 0 ? (
                      <div className="space-y-6">
                        {user.addresses.map((address) => (
                          <div
                            key={address.id}
                            className="bg-[#FDF8EF] rounded-xl p-6 border border-[#ECD5B2]"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                {address.isDefault && (
                                  <span className="inline-block bg-[#D2A679] text-[#3B2F2F] px-3 py-1 rounded-full text-sm font-medium mb-3">
                                    Default
                                  </span>
                                )}
                                <h3 className="text-xl font-serif font-bold text-[#3B2F2F] mb-2">
                                  {address.firstName} {address.lastName}
                                </h3>
                                <div className="text-[#6D5C4D] space-y-1">
                                  <p>{address.streetAddress}</p>
                                  <p>{address.city}, {address.state} {address.postalCode}</p>
                                  {address.phone && <p>Phone: {address.phone}</p>}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditAddress(address)}
                                  className="p-2 text-[#6D5C4D] hover:text-[#3B2F2F] hover:bg-white rounded-lg transition-colors"
                                >
                                  <Edit3 size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteAddress(address.id)}
                                  className="p-2 text-[#6D5C4D] hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#FDF8EF] rounded-xl p-8 text-center">
                        <MapPin size={48} className="mx-auto text-[#D2A679] mb-4" />
                        <p className="text-[#6D5C4D] text-lg">
                          No addresses saved yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.main>
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      <AnimatePresence>
        {showAddressForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-[#3B2F2F]">
                  {editingAddress ? "Edit Address" : "Add a new address"}
                </h3>
                <button
                  onClick={() => {
                    setShowAddressForm(false);
                    setEditingAddress(null);
                    setAddressForm({
                      firstName: "",
                      lastName: "",
                      streetAddress: "",
                      city: "",
                      state: "",
                      postalCode: "",
                      phone: "",
                      isDefault: false,
                    });
                  }}
                  className="p-2 text-[#6D5C4D] hover:text-[#3B2F2F] hover:bg-[#FDF8EF] rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    value={addressForm.firstName}
                    onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                    className="w-full p-3 border border-[#ECD5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#FDF8EF]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={addressForm.lastName}
                    onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                    className="w-full p-3 border border-[#ECD5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#FDF8EF]"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Street Address"
                  value={addressForm.streetAddress}
                  onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })}
                  className="w-full p-3 border border-[#ECD5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#FDF8EF]"
                  required
                />

                <input
                  type="text"
                  placeholder="City"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  className="w-full p-3 border border-[#ECD5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#FDF8EF]"
                  required
                />
                

                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full p-3 border border-[#ECD5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#FDF8EF]"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Postal/ZIP code"
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    className="w-full p-3 border border-[#ECD5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#FDF8EF]"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  value={addressForm.country}
                  onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                  className="w-full p-3 border border-[#ECD5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#FDF8EF]"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="w-full p-3 border border-[#ECD5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2A679] bg-[#FDF8EF]"
                  required
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="defaultAddress"
                    checked={addressForm.isDefault}
                    onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                    className="w-4 h-4 text-[#D2A679] border-[#ECD5B2] rounded focus:ring-[#D2A679]"
                  />
                  <label htmlFor="defaultAddress" className="text-[#6D5C4D] font-medium">
                    Set as default address
                  </label>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-[#5D3754] text-white py-3 rounded-xl font-medium hover:bg-[#4A2B43] transition-colors"
                  >
                    {editingAddress ? "UPDATE ADDRESS" : "ADD ADDRESS"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                      setEditingAddress(null);
                    }}
                    className="px-6 py-3 border border-[#ECD5B2] text-[#6D5C4D] rounded-xl font-medium hover:bg-[#FDF8EF] transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccountPage;