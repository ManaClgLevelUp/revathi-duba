import React, { useState, useEffect } from 'react';
import { loginAdmin } from '../utils/firebase';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, LogIn } from 'lucide-react';
import Navigation from './Navigation'; // Import Navigation component

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Add class to body for styling when on admin login page
  useEffect(() => {
    document.body.classList.add('admin-login-page');
    
    return () => {
      document.body.classList.remove('admin-login-page');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await loginAdmin(email, password);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard.",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Add Navigation component with special class */}
      <div className="admin-nav-wrapper">
        <Navigation />
      </div>
      
      <div className="flex min-h-screen items-center justify-center bg-navy-900 p-4 pt-24">
        <div className="w-full max-w-md">
          <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/50 p-8 rounded-lg shadow-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair mb-2 text-white">Admin Login</h2>
              <p className="text-navy-300 text-sm">Please enter your credentials to continue</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-navy-200">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400" size={18} />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 p-3 bg-navy-700/50 border border-navy-600 rounded text-white placeholder:text-navy-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-navy-200">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400" size={18} />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 p-3 bg-navy-700/50 border border-navy-600 rounded text-white placeholder:text-navy-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-900 font-medium rounded-md hover:from-gold-500 hover:to-gold-400 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-navy-900 border-t-transparent animate-spin"></div>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Login</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Add custom styling for admin login page navigation */}
      <style>{`
        /* Style navigation on admin login page similar to gallery page */
        body.admin-login-page {
          background-color: var(--navy-900);
        }
        
        body.admin-login-page header {
          background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.5) 100%);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        body.admin-login-page nav button,
        body.admin-login-page .nav-link,
        body.admin-login-page .nav-logo {
          color: white !important;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
          font-weight: 600 !important;
        }
        
        body.admin-login-page nav a:hover,
        body.admin-login-page .nav-link:hover {
          color: #ffd700 !important;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
        }
        
        body.admin-login-page nav a.active,
        body.admin-login-page .nav-link.active {
          color: #ffd700 !important;
        }
        
        /* Add background to the nav wrapper for better contrast */
        .admin-nav-wrapper {
          position: relative;
          z-index: 10;
          background-color: rgba(0, 0, 0, 0.7);
        }
        
        /* Target all link elements in the header to ensure coverage */
        body.admin-login-page header a,
        body.admin-login-page header button,
        body.admin-login-page header span {
          color: white !important;
        }
      `}</style>
    </>
  );
};

export default AdminLogin;
