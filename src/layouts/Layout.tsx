import React from 'react';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/navigation/Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-smw-black">
      <Navigation />
      <main className={`flex-1 pt-16 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
