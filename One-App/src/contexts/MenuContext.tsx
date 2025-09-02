'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MenuItem {
  id: string;
  text: string;
  href: string;
  isHome: boolean;
  order: number;
}

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (text: string, href: string) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  moveMenuItem: (id: string, newOrder: number) => void;
  reorderMenuItems: (newOrder: MenuItem[]) => void;
  hasChanges: boolean;
  setHasChanges: (hasChanges: boolean) => void;
  saveMenuItems: () => Promise<void>;
}

const initialMenuItems: MenuItem[] = [
  { id: 'home', text: 'Home', href: '/', isHome: true, order: 0 },
  { id: 'about', text: 'About', href: '#about', isHome: false, order: 1 },
  { id: 'devices', text: 'Devices', href: '#devices', isHome: false, order: 2 },
  { id: 'content', text: 'Content', href: '#content', isHome: false, order: 3 },
  { id: 'retail', text: 'Retail', href: '#retail', isHome: false, order: 4 },
];

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [hasChanges, setHasChanges] = useState(false);

  const addMenuItem = (text: string, href: string) => {
    const newItem: MenuItem = {
      id: `menu-${Date.now()}`,
      text,
      href,
      isHome: false,
      order: menuItems.length,
    };
    setMenuItems(prev => [...prev, newItem]);
    setHasChanges(true);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
    setHasChanges(true);
  };

  const deleteMenuItem = (id: string) => {
    const item = menuItems.find(item => item.id === id);
    if (item?.isHome) return; // Prevent deleting home item
    
    setMenuItems(prev => prev.filter(item => item.id !== id));
    setHasChanges(true);
  };

  const moveMenuItem = (id: string, newOrder: number) => {
    // Prevent moving any item to position 0 (home position is locked)
    if (newOrder === 0) {
      return;
    }
    
    setMenuItems(prev => {
      const items = [...prev];
      const itemIndex = items.findIndex(item => item.id === id);
      if (itemIndex === -1) return prev;
      
      const item = items[itemIndex];
      const oldOrder = item.order;
      
      // Update orders for items between old and new position
      if (newOrder > oldOrder) {
        items.forEach(menuItem => {
          if (menuItem.order > oldOrder && menuItem.order <= newOrder) {
            menuItem.order = menuItem.order - 1;
          }
        });
      } else {
        items.forEach(menuItem => {
          if (menuItem.order >= newOrder && menuItem.order < oldOrder) {
            menuItem.order = menuItem.order + 1;
          }
        });
      }
      
      item.order = newOrder;
      return items.sort((a, b) => a.order - b.order);
    });
    setHasChanges(true);
  };

  const reorderMenuItems = (newOrder: MenuItem[]) => {
    setMenuItems(newOrder.map((item, index) => ({ ...item, order: index })));
    setHasChanges(true);
  };

  const saveMenuItems = async () => {
    try {
      // Here you would typically save to a database or API
      // For now, we'll just mark as saved
      setHasChanges(false);
      console.log('Menu items saved:', menuItems);
    } catch (error) {
      console.error('Error saving menu items:', error);
    }
  };

  const value: MenuContextType = {
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    moveMenuItem,
    reorderMenuItems,
    hasChanges,
    setHasChanges,
    saveMenuItems,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};
