'use client';

import React, { useState, useEffect } from 'react';
import { useMenu } from '@/contexts/MenuContext';

// Icons
import { 
  Menu, 
  FileText, 
  Layers, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  ChevronUp,
  ChevronDown,
  Link
} from 'lucide-react';

// Types
interface MenuItem {
  id: string;
  text: string;
  href: string;
  order: number;
  isVisible: boolean;
}

interface PageSection {
  id: string;
  name: string;
  type: string;
  order: number;
  url: string;
}

interface FooterItem {
  id: string;
  text: string;
  href: string;
  category: string;
  order: number;
}

interface FooterPage {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
}

export default function Admin2Page() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, moveMenuItem, saveMenuItems } = useMenu();
  
  // State for different systems
  const [activeTab, setActiveTab] = useState<'menu' | 'pages' | 'footer'>('menu');
  const [menuItemsState, setMenuItemsState] = useState<MenuItem[]>([]);
  const [pageSections, setPageSections] = useState<PageSection[]>([]);
  const [footerItems, setFooterItems] = useState<FooterItem[]>([]);
  const [footerPages, setFooterPages] = useState<FooterPage[]>([]);
  
  // Form states
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showPageForm, setShowPageForm] = useState(false);
  const [showFooterForm, setShowFooterForm] = useState(false);
  const [showFooterPageForm, setShowFooterPageForm] = useState(false);
  
  // Form data
  const [menuFormData, setMenuFormData] = useState({ text: '', href: '' });
  const [pageFormData, setPageFormData] = useState({ name: '', type: 'section', url: '' });
  const [footerFormData, setFooterFormData] = useState({ text: '', href: '', category: 'links' });
  const [footerPageFormData, setFooterPageFormData] = useState({ title: '', url: '' });

  // Initialize data
  useEffect(() => {
    // Initialize menu items
    setMenuItemsState(menuItems.map(item => ({
      id: item.id,
      text: item.text,
      href: item.href,
      order: item.order,
      isVisible: true
    })));

    // Initialize page sections (mock data)
    setPageSections([
      { id: '1', name: 'Hero Section', type: 'section', order: 1, url: '/hero' },
      { id: '2', name: 'Features Section', type: 'section', order: 2, url: '/features' },
      { id: '3', name: 'About Section', type: 'section', order: 3, url: '/about' },
      { id: '4', name: 'Contact Section', type: 'section', order: 4, url: '/contact' }
    ]);

    // Initialize footer items (mock data)
    setFooterItems([
      { id: '1', text: 'Privacy Policy', href: '/privacy', category: 'legal', order: 1 },
      { id: '2', text: 'Terms of Service', href: '/terms', category: 'legal', order: 2 },
      { id: '3', text: 'Contact Us', href: '/contact', category: 'links', order: 3 },
      { id: '4', text: 'Support', href: '/support', category: 'links', order: 4 }
    ]);

    // Initialize footer pages (mock data)
    setFooterPages([
      { id: '1', title: 'Privacy Policy', url: '/privacy', isActive: true },
      { id: '2', title: 'Terms of Service', url: '/terms', isActive: true },
      { id: '3', title: 'Cookie Policy', url: '/cookies', isActive: false }
    ]);
  }, [menuItems]);

  // Menu Management Functions
  const handleAddMenuItem = () => {
    if (menuFormData.text && menuFormData.href) {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        text: menuFormData.text,
        href: menuFormData.href,
        order: menuItemsState.length,
        isVisible: true
      };
      setMenuItemsState([...menuItemsState, newItem]);
      setMenuFormData({ text: '', href: '' });
      setShowMenuForm(false);
    }
  };

  const handleUpdateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItemsState(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItemsState(prev => prev.filter(item => item.id !== id));
  };

  const handleMoveMenuItem = (id: string, direction: 'up' | 'down') => {
    const currentIndex = menuItemsState.findIndex(item => item.id === id);
    if (currentIndex === -1) return;

    const newItems = [...menuItemsState];
    if (direction === 'up' && currentIndex > 0) {
      [newItems[currentIndex], newItems[currentIndex - 1]] = [newItems[currentIndex - 1], newItems[currentIndex]];
    } else if (direction === 'down' && currentIndex < newItems.length - 1) {
      [newItems[currentIndex], newItems[currentIndex + 1]] = [newItems[currentIndex + 1], newItems[currentIndex]];
    }
    
    // Update order numbers
    newItems.forEach((item, index) => {
      item.order = index;
    });
    
    setMenuItemsState(newItems);
  };

  // Page Management Functions
  const handleAddPageSection = () => {
    if (pageFormData.name && pageFormData.url) {
      const newSection: PageSection = {
        id: Date.now().toString(),
        name: pageFormData.name,
        type: pageFormData.type,
        order: pageSections.length,
        url: pageFormData.url
      };
      setPageSections([...pageSections, newSection]);
      setPageFormData({ name: '', type: 'section', url: '' });
      setShowPageForm(false);
    }
  };

  const handleMovePageSection = (id: string, direction: 'up' | 'down') => {
    const currentIndex = pageSections.findIndex(section => section.id === id);
    if (currentIndex === -1) return;

    const newSections = [...pageSections];
    if (direction === 'up' && currentIndex > 0) {
      [newSections[currentIndex], newSections[currentIndex - 1]] = [newSections[currentIndex - 1], newSections[currentIndex]];
    } else if (direction === 'down' && currentIndex < newSections.length - 1) {
      [newSections[currentIndex], newSections[currentIndex + 1]] = [newSections[currentIndex + 1], newSections[currentIndex]];
    }
    
    // Update order numbers
    newSections.forEach((section, index) => {
      section.order = index;
    });
    
    setPageSections(newSections);
  };

  // Footer Management Functions
  const handleAddFooterItem = () => {
    if (footerFormData.text && footerFormData.href) {
      const newItem: FooterItem = {
        id: Date.now().toString(),
        text: footerFormData.text,
        href: footerFormData.href,
        category: footerFormData.category,
        order: footerItems.length
      };
      setFooterItems([...footerItems, newItem]);
      setFooterFormData({ text: '', href: '', category: 'links' });
      setShowFooterForm(false);
    }
  };

  const handleAddFooterPage = () => {
    if (footerPageFormData.title && footerPageFormData.url) {
      const newPage: FooterPage = {
        id: Date.now().toString(),
        title: footerPageFormData.title,
        url: footerPageFormData.url,
        isActive: true
      };
      setFooterPages([...footerPages, newPage]);
      setFooterPageFormData({ title: '', url: '' });
      setShowFooterPageForm(false);
    }
  };

  const handleToggleFooterPage = (id: string) => {
    setFooterPages(prev => prev.map(page => 
      page.id === id ? { ...page, isActive: !page.isActive } : page
    ));
  };

  // Save all changes
  const handleSaveAll = () => {
    // Save menu items to context
    menuItemsState.forEach(item => {
      if (!menuItems.find(m => m.id === item.id)) {
        addMenuItem(item.text, item.href);
      }
    });
    
    // Save to context
    saveMenuItems();
    
    // Here you would typically save page sections and footer data to your backend
    console.log('Saving all changes...');
  };

  return (
    <>
      {/* TailAdmin CSS - Self-contained styles */}
      <style jsx global>{`
        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.5;
          color: #1f2937;
          background-color: #f9fafb;
        }
        
        /* TailAdmin-inspired component styles */
        .admin-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .admin-header {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        
        .admin-logo {
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          border-radius: 12px;
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.3);
        }
        
        .admin-title {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 4px;
        }
        
        .admin-subtitle {
          font-size: 14px;
          color: #6b7280;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(139, 92, 246, 0.2);
        }
        
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
        }
        
        .btn-primary:active {
          transform: translateY(0);
        }
        
        .btn-secondary {
          background: white;
          color: #6b7280;
          border: 1px solid #d1d5db;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-secondary:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }
        
        .btn-sm {
          padding: 8px 16px;
          font-size: 13px;
        }
        
        .btn-icon {
          padding: 8px;
          border-radius: 6px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-icon:hover {
          background: #f3f4f6;
        }
        
        .btn-icon.danger:hover {
          background: #fef2f2;
          color: #dc2626;
        }
        
        .btn-icon.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .admin-tabs {
          background: white;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .tab-button {
          padding: 16px 8px;
          border: none;
          background: transparent;
          font-weight: 500;
          font-size: 14px;
          color: #6b7280;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .tab-button.active {
          color: #8b5cf6;
          border-bottom-color: #8b5cf6;
        }
        
        .tab-button:hover:not(.active) {
          color: #374151;
          border-bottom-color: #d1d5db;
        }
        
        .admin-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 16px;
        }
        
        .admin-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          overflow: hidden;
          margin-bottom: 24px;
        }
        
        .card-header {
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }
        
        .card-content {
          padding: 0;
        }
        
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .admin-table th {
          background: #f9fafb;
          padding: 12px 24px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .admin-table td {
          padding: 16px 24px;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: middle;
        }
        
        .admin-table tbody tr:hover {
          background: #f9fafb;
        }
        
        .form-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        
        .form-select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          cursor: pointer;
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .badge-blue {
          background: #dbeafe;
          color: #1e40af;
        }
        
        .badge-green {
          background: #dcfce7;
          color: #166534;
        }
        
        .badge-red {
          background: #fee2e2;
          color: #dc2626;
        }
        
        .badge-gray {
          background: #f3f4f6;
          color: #374151;
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 24px;
          width: 400px;
          max-width: 90vw;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 16px;
        }
        
        .form-group {
          margin-bottom: 16px;
        }
        
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
        }
        
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }
        
        .icon {
          width: 16px;
          height: 16px;
        }
        
        .icon-sm {
          width: 14px;
          height: 14px;
        }
        
        .flex {
          display: flex;
        }
        
        .items-center {
          align-items: center;
        }
        
        .justify-between {
          justify-content: space-between;
        }
        
        .gap-2 {
          gap: 8px;
        }
        
        .gap-3 {
          gap: 12px;
        }
        
        .gap-4 {
          gap: 16px;
        }
        
        .space-y-6 > * + * {
          margin-top: 24px;
        }
        
        .w-full {
          width: 100%;
        }
        
        .max-w-7xl {
          max-width: 80rem;
        }
        
        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
        
        .px-4 {
          padding-left: 16px;
          padding-right: 16px;
        }
        
        .px-6 {
          padding-left: 24px;
          padding-right: 24px;
        }
        
        .py-6 {
          padding-top: 24px;
          padding-bottom: 24px;
        }
        
        .py-8 {
          padding-top: 32px;
          padding-bottom: 32px;
      `}</style>

      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center gap-4">
                <div className="admin-logo">O</div>
                <div>
                  <h1 className="admin-title">OORO Admin 2.0</h1>
                  <p className="admin-subtitle">Comprehensive Content Management System</p>
                </div>
              </div>
              <button
                onClick={handleSaveAll}
                className="btn-primary"
              >
                <Save className="icon mr-2" />
                Save All Changes
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex space-x-8">
              {[
                { id: 'menu', label: 'Menu Editor', icon: Menu },
                { id: 'pages', label: 'Page Sections', icon: FileText },
                { id: 'footer', label: 'Footer Manager', icon: Layers }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <tab.icon className="icon" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {/* Menu Editor Tab */}
          {activeTab === 'menu' && (
            <div className="admin-card">
              <div className="card-header">
                <h2 className="card-title">Navigation Menu</h2>
                <button
                  onClick={() => setShowMenuForm(true)}
                  className="btn-primary btn-sm"
                >
                  <Plus className="icon-sm mr-2" />
                  Add Menu Item
                </button>
              </div>
              
              <div className="card-content">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '80px' }}>Order</th>
                      <th>Text</th>
                      <th>Link</th>
                      <th style={{ width: '120px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItemsState.map((item, index) => (
                      <tr key={item.id}>
                        <td>{item.order}</td>
                        <td>
                          <input
                            type="text"
                            value={item.text}
                            onChange={(e) => handleUpdateMenuItem(item.id, { text: e.target.value })}
                            className="form-input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={item.href}
                            onChange={(e) => handleUpdateMenuItem(item.id, { href: e.target.value })}
                            className="form-input"
                          />
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMoveMenuItem(item.id, 'up')}
                              disabled={index === 0}
                              className={`btn-icon ${index === 0 ? 'disabled' : ''}`}
                            >
                              <ChevronUp className="icon-sm" />
                            </button>
                            <button
                              onClick={() => handleMoveMenuItem(item.id, 'down')}
                              disabled={index === menuItemsState.length - 1}
                              className={`btn-icon ${index === menuItemsState.length - 1 ? 'disabled' : ''}`}
                            >
                              <ChevronDown className="icon-sm" />
                            </button>
                            <button
                              onClick={() => handleDeleteMenuItem(item.id)}
                              className="btn-icon danger"
                            >
                              <Trash2 className="icon-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Page Sections Tab */}
          {activeTab === 'pages' && (
            <div className="admin-card">
              <div className="card-header">
                <h2 className="card-title">Page Sections</h2>
                <button
                  onClick={() => setShowPageForm(true)}
                  className="btn-primary btn-sm"
                >
                  <Plus className="icon-sm mr-2" />
                  Add Section
                </button>
              </div>
              
              <div className="card-content">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '80px' }}>Order</th>
                      <th>Section Name</th>
                      <th>Type</th>
                      <th>URL</th>
                      <th style={{ width: '120px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageSections.map((section, index) => (
                      <tr key={section.id}>
                        <td>{section.order}</td>
                        <td>{section.name}</td>
                        <td>
                          <span className="badge badge-blue">{section.type}</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Link className="icon-sm" />
                            {section.url}
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMovePageSection(section.id, 'up')}
                              disabled={index === 0}
                              className={`btn-icon ${index === 0 ? 'disabled' : ''}`}
                            >
                              <ChevronUp className="icon-sm" />
                            </button>
                            <button
                              onClick={() => handleMovePageSection(section.id, 'down')}
                              disabled={index === pageSections.length - 1}
                              className={`btn-icon ${index === pageSections.length - 1 ? 'disabled' : ''}`}
                            >
                              <ChevronDown className="icon-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer Manager Tab */}
          {activeTab === 'footer' && (
            <div className="space-y-6">
              {/* Footer Links */}
              <div className="admin-card">
                <div className="card-header">
                  <h2 className="card-title">Footer Links</h2>
                  <button
                    onClick={() => setShowFooterForm(true)}
                    className="btn-primary btn-sm"
                  >
                    <Plus className="icon-sm mr-2" />
                    Add Link
                  </button>
                </div>
                
                <div className="card-content">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Text</th>
                        <th>Link</th>
                        <th style={{ width: '80px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {footerItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <span className={`badge ${item.category === 'legal' ? 'badge-red' : 'badge-green'}`}>
                              {item.category}
                            </span>
                          </td>
                          <td>{item.text}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Link className="icon-sm" />
                              {item.href}
                            </div>
                          </td>
                          <td>
                            <button
                              onClick={() => setFooterItems(prev => prev.filter(i => i.id !== item.id))}
                              className="btn-icon danger"
                            >
                              <Trash2 className="icon-sm" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer Pages */}
              <div className="admin-card">
                <div className="card-header">
                  <h2 className="card-title">Footer Pages</h2>
                  <button
                    onClick={() => setShowFooterPageForm(true)}
                    className="btn-primary btn-sm"
                  >
                    <Plus className="icon-sm mr-2" />
                    Add Page
                  </button>
                </div>
                
                <div className="card-content">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Status</th>
                        <th style={{ width: '160px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {footerPages.map((page) => (
                        <tr key={page.id}>
                          <td>{page.title}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Link className="icon-sm" />
                              {page.url}
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${page.isActive ? 'badge-green' : 'badge-gray'}`}>
                              {page.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleToggleFooterPage(page.id)}
                                className={`btn-sm ${page.isActive ? 'btn-secondary' : 'btn-primary'}`}
                              >
                                {page.isActive ? 'Deactivate' : 'Activate'}
                              </button>
                              <button
                                onClick={() => setFooterPages(prev => prev.filter(p => p.id !== page.id))}
                                className="btn-icon danger"
                              >
                                <Trash2 className="icon-sm" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Menu Item Modal */}
      {showMenuForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add Menu Item</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Text</label>
                <input
                  type="text"
                  value={menuFormData.text}
                  onChange={(e) => setMenuFormData({ ...menuFormData, text: e.target.value })}
                  className="form-input"
                  placeholder="Menu item text"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Link</label>
                <input
                  type="text"
                  value={menuFormData.href}
                  onChange={(e) => setMenuFormData({ ...menuFormData, href: e.target.value })}
                  className="form-input"
                  placeholder="/about or #section"
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setShowMenuForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMenuItem}
                  className="btn-primary"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Page Section Modal */}
      {showPageForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add Page Section</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Section Name</label>
                <input
                  type="text"
                  value={pageFormData.name}
                  onChange={(e) => setPageFormData({ ...pageFormData, name: e.target.value })}
                  className="form-input"
                  placeholder="Section name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  value={pageFormData.type}
                  onChange={(e) => setPageFormData({ ...pageFormData, type: e.target.value })}
                  className="form-select"
                >
                  <option value="section">Section</option>
                  <option value="component">Component</option>
                  <option value="widget">Widget</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">URL</label>
                <input
                  type="text"
                  value={pageFormData.url}
                  onChange={(e) => setPageFormData({ ...pageFormData, url: e.target.value })}
                  className="form-input"
                  placeholder="/section-url"
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setShowPageForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPageSection}
                  className="btn-primary"
                >
                  Add Section
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Footer Link Modal */}
      {showFooterForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add Footer Link</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Text</label>
                <input
                  type="text"
                  value={footerFormData.text}
                  onChange={(e) => setFooterFormData({ ...footerFormData, text: e.target.value })}
                  className="form-input"
                  placeholder="Link text"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Link</label>
                <input
                  type="text"
                  value={footerFormData.href}
                  onChange={(e) => setFooterFormData({ ...footerFormData, href: e.target.value })}
                  className="form-input"
                  placeholder="/privacy or #section"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={footerFormData.category}
                  onChange={(e) => setFooterFormData({ ...footerFormData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="links">General Links</option>
                  <option value="legal">Legal</option>
                  <option value="social">Social</option>
                  <option value="support">Support</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setShowFooterForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFooterItem}
                  className="btn-primary"
                >
                  Add Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Footer Page Modal */}
      {showFooterPageForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add Footer Page</h3>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Page Title</label>
                <input
                  type="text"
                  value={footerPageFormData.title}
                  onChange={(e) => setFooterPageFormData({ ...footerPageFormData, title: e.target.value })}
                  className="form-input"
                  placeholder="Page title"
                />
              </div>
              <div className="form-group">
                <label className="form-label">URL</label>
                <input
                  type="text"
                  value={footerPageFormData.url}
                  onChange={(e) => setFooterPageFormData({ ...footerPageFormData, url: e.target.value })}
                  className="form-input"
                  placeholder="/page-url"
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => setShowFooterPageForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFooterPage}
                  className="btn-primary"
                >
                  Add Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
