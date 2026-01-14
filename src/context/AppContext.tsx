"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: { id: string; name: string; price?: any; price_min?: any; image?: string; image_url?: string }, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const supabase = createClient();

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('mic_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  }, []);

  // Auth Listener
  useEffect(() => {
    // Supabase Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  // Sync cart with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mic_cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: { id: string; name: string; price?: any; price_min?: any; image?: string; image_url?: string }, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price_min || product.price || 0,
        image: product.image_url || product.image || "/placeholder.jpg",
        quantity
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const isAdmin =
    profile?.role === 'admin' ||
    profile?.role === 'super_admin' ||
    user?.app_metadata?.role === 'admin' ||
    user?.user_metadata?.role === 'admin';

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        user,
        profile,
        isAdmin,
        loading,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
