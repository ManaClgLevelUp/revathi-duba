import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from '../components/AdminLogin';
import { getContactForms, logoutAdmin } from '../utils/firebase';
import { useToast } from '@/hooks/use-toast';
import { LogOut, User, Mail, Phone, FileText, Calendar, ExternalLink, RefreshCcw } from 'lucide-react';

const Admin = () => {
  const { currentUser } = useAuth();
  const [formRequests, setFormRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch form submissions when user is authenticated
  useEffect(() => {
    if (currentUser) {
      fetchFormRequests();
    }
  }, [currentUser]);

  const fetchFormRequests = async () => {
    setIsLoading(true);
    try {
      const forms = await getContactForms();
      setFormRequests(forms);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load form submissions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Format message for WhatsApp
  const formatWhatsAppMessage = (request) => {
    const { name, email, subject, message } = request;
    
    // Different format based on whether subject and message exist
    let formattedMessage;
    
    if (subject && message) {
      formattedMessage = `Dear Dr. Revathi Duba,

I hope this message finds you well. I wanted to reach out regarding:

*Subject:* ${subject}

*Message:*
${message}

Thank you for your time and consideration.

Best regards,
${name}
${email}`;
    } else {
      formattedMessage = `Dear Dr. Revathi Duba,

I hope this message finds you well. I would like to connect with you.

My contact details:
Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}` : ''}
${message ? `\nAdditional information:\n${message}` : ''}

Thank you for your time and consideration.

Best regards,
${name}`;
    }
    
    // Encode for URL
    return encodeURIComponent(formattedMessage);
  };

  // Open WhatsApp with formatted message
  const openWhatsApp = (request) => {
    const messageText = formatWhatsAppMessage(request);
    window.open(`https://wa.me/918099794356?text=${messageText}`, '_blank');
  };

  // If not logged in, show login form
  if (!currentUser) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-playfair">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchFormRequests}
              className="p-2 bg-navy-700 rounded-full hover:bg-navy-600 transition-colors"
              title="Refresh"
            >
              <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
            </button>
            
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-navy-700 text-white rounded-md hover:bg-navy-600 transition-colors flex items-center gap-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/50 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-playfair mb-4 flex items-center gap-2">
            <FileText size={20} className="text-gold-400" />
            <span>Contact Form Submissions</span>
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-navy-600 border-t-gold-400 rounded-full animate-spin"></div>
            </div>
          ) : formRequests.length === 0 ? (
            <div className="text-center py-12 text-navy-400">
              <p>No form submissions yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {formRequests.map((request) => {
                const timestamp = request.timestamp?.toDate ? 
                  request.timestamp.toDate().toLocaleString() : 
                  'Unknown date';
                
                return (
                  <div 
                    key={request.id} 
                    className="bg-navy-700/50 border border-navy-600/50 rounded-lg p-5 hover:border-gold-500/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <User size={16} className="text-gold-400" />
                          {request.name || 'Anonymous'}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-navy-300">
                          <Mail size={14} />
                          <span>{request.email || 'No email provided'}</span>
                        </div>
                        
                        {request.phone && (
                          <div className="flex items-center gap-2 text-sm text-navy-300">
                            <Phone size={14} />
                            <span>{request.phone}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-xs text-navy-400 mt-1">
                          <Calendar size={12} />
                          <span>{timestamp}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => openWhatsApp(request)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white text-sm font-medium flex items-center gap-2 transition-colors"
                      >
                        <ExternalLink size={16} />
                        <span>Send to WhatsApp</span>
                      </button>
                    </div>
                    
                    {request.subject && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-navy-200">Subject:</h4>
                        <p className="text-white">{request.subject}</p>
                      </div>
                    )}
                    
                    {request.message && (
                      <div>
                        <h4 className="text-sm font-medium text-navy-200">Message:</h4>
                        <p className="text-white whitespace-pre-wrap">{request.message}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
