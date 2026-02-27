import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WalletState, Property, Portfolio, Transaction, Notification } from '@/types';

interface AppState {
  // Wallet state
  wallet: WalletState;
  setWallet: (wallet: WalletState) => void;
  
  // Properties
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  
  // Portfolio
  portfolio: Portfolio | null;
  setPortfolio: (portfolio: Portfolio) => void;
  
  // Transactions
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  
  // UI state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Selected property
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Wallet state
      wallet: {
        isConnected: false,
        balance: 0,
        network: 'testnet',
      },
      setWallet: (wallet) => set({ wallet }),
      
      // Properties
      properties: [
        {
          id: 'prop-001',
          name: 'Manhattan Luxury Penthouse',
          description: 'Exclusive penthouse in the heart of Manhattan with panoramic city views and premium finishes.',
          address: '123 5th Avenue',
          city: 'Manhattan',
          country: 'USA',
          totalSupply: 1000000,
          availableTokens: 750000,
          pricePerToken: 0.005,
          totalValue: 2500000,
          images: ['/images/manhattan-penthouse.jpg'],
          documents: [],
          propertyType: 'residential',
          squareMeters: 350,
          bedrooms: 3,
          bathrooms: 2,
          yearBuilt: 2020,
          status: 'active',
          apy: 12.5,
          monthlyRent: 0.0005,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'prop-002',
          name: 'Miami Beachfront Villa',
          description: 'Stunning beachfront villa with private beach access and ocean views in prestigious Miami Beach.',
          address: '456 Ocean Drive',
          city: 'Miami Beach',
          country: 'USA',
          totalSupply: 1000000,
          availableTokens: 600000,
          pricePerToken: 0.0036,
          totalValue: 1800000,
          images: ['/images/miami-villa.jpg'],
          documents: [],
          propertyType: 'residential',
          squareMeters: 280,
          bedrooms: 4,
          bathrooms: 3,
          yearBuilt: 2019,
          status: 'active',
          apy: 10.8,
          monthlyRent: 0.0004,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'prop-003',
          name: 'Commercial Office Tower',
          description: 'Prime commercial office space in downtown business district with high tenant occupancy.',
          address: '789 Business Blvd',
          city: 'Chicago',
          country: 'USA',
          totalSupply: 1000000,
          availableTokens: 400000,
          pricePerToken: 0.01,
          totalValue: 5000000,
          images: ['/images/office-tower.jpg'],
          documents: [],
          propertyType: 'commercial',
          squareMeters: 2000,
          yearBuilt: 2018,
          status: 'active',
          apy: 8.5,
          monthlyRent: 0.0008,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ],
      setProperties: (properties) => set({ properties }),
      addProperty: (property) => set((state) => ({ 
        properties: [...state.properties, property] 
      })),
      updateProperty: (id, updates) => set((state) => ({
        properties: state.properties.map(p => 
          p.id === id ? { ...p, ...updates } : p
        )
      })),
      
      // Portfolio
      portfolio: null,
      setPortfolio: (portfolio) => set({ portfolio }),
      
      // Transactions
      transactions: [],
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (transaction) => set((state) => ({
        transactions: [transaction, ...state.transactions]
      })),
      
      // Notifications
      notifications: [],
      addNotification: (notification) => {
        const id = Date.now().toString();
        const newNotification: Notification = {
          ...notification,
          id,
          timestamp: new Date().toISOString(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications]
        }));
        
        // Auto-remove success notifications after 5 seconds
        if (notification.type === 'success') {
          setTimeout(() => {
            get().markNotificationRead(id);
          }, 5000);
        }
      },
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      })),
      clearNotifications: () => set({ notifications: [] }),
      
      // UI state
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
      isDarkMode: true,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      sidebarCollapsed: false,
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      
      // Selected property
      selectedProperty: null,
      setSelectedProperty: (selectedProperty) => set({ selectedProperty }),
    }),
    {
      name: 'op-real-estate-storage',
      partialize: (state) => ({
        wallet: state.wallet,
        isDarkMode: state.isDarkMode,
        properties: state.properties,
        transactions: state.transactions,
      }),
    }
  )
);
