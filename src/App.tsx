import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/layouts/Layout';

// Pages (to be created)
const HomePage = React.lazy(() => import('@/pages/Home'));
const AboutPage = React.lazy(() => import('@/pages/About'));
const ManifestoPage = React.lazy(() => import('@/pages/Manifesto'));
const MarketplacePage = React.lazy(() => import('@/pages/Marketplace'));
const JournalPage = React.lazy(() => import('@/pages/Journal'));
const LibraryPage = React.lazy(() => import('@/pages/Library'));
const PineappleCodePage = React.lazy(() => import('@/pages/PineappleCode'));
const CreativeStudioPage = React.lazy(() => import('@/pages/CreativeStudio'));
const CommunityPage = React.lazy(() => import('@/pages/Community'));
const MembershipPage = React.lazy(() => import('@/pages/Membership'));
const ContactPage = React.lazy(() => import('@/pages/Contact'));

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/manifesto" element={<ManifestoPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/pineapple-code" element={<PineappleCodePage />} />
            <Route path="/studio" element={<CreativeStudioPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </Layout>
    </Router>
  );
};

export default App;
