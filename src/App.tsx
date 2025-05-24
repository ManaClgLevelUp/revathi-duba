import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";
import { AuthProvider } from "./contexts/AuthContext";
import PageLoader from "./components/PageLoader";
import Home from './pages/Index';
import GalleryPage from './components/GalleryPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate content loading time and assets preparation
  useEffect(() => {
    // Simulate loading time - adjust as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PageLoader isLoading={isLoading} />
        
        {/* Only render main content after loading completes */}
        <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/*" element={<Layout><Index /></Layout>} />
              </Routes>
              <Footer />
            </AuthProvider>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
