// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData) => {
    const userWithDefaults = {
      ...userData,
      addresses: userData.addresses || [],
      orders: userData.orders || [],
      defaultAddressId: userData.defaultAddressId || null,
    };
    localStorage.setItem("user", JSON.stringify(userWithDefaults));
    setUser(userWithDefaults);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const addAddress = (newAddress) => {
    const addressWithId = {
      ...newAddress,
      id: Date.now().toString(),
      isDefault: user.addresses.length === 0 || newAddress.isDefault,
    };

    const updatedAddresses = user.addresses.map(addr => 
      addressWithId.isDefault ? { ...addr, isDefault: false } : addr
    );
    updatedAddresses.push(addressWithId);

    updateUser({ 
      addresses: updatedAddresses,
      defaultAddressId: addressWithId.isDefault ? addressWithId.id : user.defaultAddressId
    });
  };

  const updateAddress = (addressId, updatedAddress) => {
    const updatedAddresses = user.addresses.map(addr => {
      if (addr.id === addressId) {
        return { ...addr, ...updatedAddress };
      }
      return updatedAddress.isDefault ? { ...addr, isDefault: false } : addr;
    });

    updateUser({ 
      addresses: updatedAddresses,
      defaultAddressId: updatedAddress.isDefault ? addressId : user.defaultAddressId
    });
  };

  const deleteAddress = (addressId) => {
    const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
    const newDefaultId = addressId === user.defaultAddressId ? 
      (updatedAddresses.length > 0 ? updatedAddresses[0].id : null) : 
      user.defaultAddressId;

    if (newDefaultId && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }

    updateUser({ 
      addresses: updatedAddresses,
      defaultAddressId: newDefaultId
    });
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'Processing',
      ...orderData
    };

    const updatedOrders = [...(user.orders || []), newOrder];
    updateUser({ orders: updatedOrders });
    
    return newOrder;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUser, 
      addAddress, 
      updateAddress, 
      deleteAddress,
      addOrder
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);