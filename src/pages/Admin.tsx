import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from '../components/AdminLogin';
import { getContactFormsRealtime, logoutAdmin, deleteContactForm, updateContactForm } from '../utils/firebase';
import { useToast } from '@/hooks/use-toast';
import { LogOut, User, Mail, Phone, FileText, Calendar, ExternalLink, RefreshCcw, 
         Trash2, Edit2, X, Save, MessageSquare, Image as ImageIcon } from 'lucide-react';
// Import the new AdminGallery component
import AdminGallery from '../components/AdminGallery';
// Import our admin utilities
import { generateAdminWhatsAppResponse, formatPhoneNumber } from '../utils/adminUtils';
import { cn } from "@/lib/utils";

// Define interface for contact form data
interface ContactFormData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  timestamp?: any;
  [key: string]: any; // Allow other properties
}

const Admin = () => {
  const { currentUser } = useAuth();
  const [formRequests, setFormRequests] = useState<ContactFormData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [responseMessages, setResponseMessages] = useState<Record<string, string>>({});
  const [showResponseInput, setShowResponseInput] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
  // Add state for active admin tab
  const [activeTab, setActiveTab] = useState<'messages' | 'gallery'>('messages');

  // Use real-time listener for form submissions
  useEffect(() => {
    if (!currentUser) return;
    
    setIsLoading(true);
    
    // Set up real-time listener
    const unsubscribe = getContactFormsRealtime((forms) => {
      setFormRequests(forms);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching contact forms:", error);
      toast({
        title: "Error",
        description: "Failed to load form submissions. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    });
    
    // Clean up listener when component unmounts
    return () => {
      unsubscribe();
    };
  }, [currentUser, toast]);

  // Manual refresh function (kept for legacy support)
  const fetchFormRequests = () => {
    toast({
      title: "Real-time Updates Active",
      description: "Form submissions are updated automatically in real-time.",
    });
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form submission?")) return;
    
    try {
      await deleteContactForm(id);
      toast({ title: "Success", description: "Form submission deleted" });
      // Remove from local state to avoid refetching
      setFormRequests(formRequests.filter(request => request.id !== id));
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to delete submission", 
        variant: "destructive"
      });
    }
  };

  const handleEdit = (request) => {
    setEditingId(request.id);
    setEditFormData({ ...request });
  };

  const handleSaveEdit = async () => {
    try {
      await updateContactForm(editingId, editFormData);
      toast({ title: "Success", description: "Form submission updated" });
      // Update in local state to avoid refetching
      setFormRequests(formRequests.map(request => 
        request.id === editingId ? { ...editFormData, id: editingId } : request
      ));
      setEditingId(null);
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to update submission", 
        variant: "destructive"
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResponseChange = (id, value) => {
    setResponseMessages(prev => ({ ...prev, [id]: value }));
  };

  const toggleResponseInput = (id) => {
    setShowResponseInput(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      
      // Initialize response template if showing input
      if (newState[id] && !responseMessages[id]) {
        setResponseMessages(prev => ({ 
          ...prev, 
          [id]: "[Enter your personalized response here]" 
        }));
      }
      
      return newState;
    });
  };

  // Open WhatsApp with professionally formatted message including custom response
  const openWhatsApp = (request) => {
    // Use the default phone number if the request doesn't have one
    const phoneNumber = formatPhoneNumber(request.phone || "8099794356");
    
    // Get custom response if available
    const customResponse = responseMessages[request.id];
    
    // Generate WhatsApp URL with custom response
    const whatsappUrl = generateAdminWhatsAppResponse(request, phoneNumber, customResponse);
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Hide response input after sending
    setShowResponseInput(prev => ({ ...prev, [request.id]: false }));
  };

  // If not logged in, show login form
  if (!currentUser) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Responsive header that stacks on mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
          <h1 className="text-2xl font-playfair">Admin Dashboard</h1>
          
          <div className="flex items-center gap-3 self-end sm:self-auto">
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
              <LogOut size={16} className="sm:size-18" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        {/* Admin navigation tabs */}
        <div className="mb-6 border-b border-navy-700/50">
          <nav className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveTab('messages')}
              className={cn(
                "py-3 px-4 font-medium text-sm border-b-2 transition-colors flex items-center mr-4",
                activeTab === 'messages' 
                  ? "border-gold-500 text-gold-500" 
                  : "border-transparent hover:border-navy-700 text-navy-300 hover:text-white"
              )}
            >
              <MessageSquare size={16} className="mr-2" />
              Contact Messages
            </button>
            
            <button
              onClick={() => setActiveTab('gallery')}
              className={cn(
                "py-3 px-4 font-medium text-sm border-b-2 transition-colors flex items-center",
                activeTab === 'gallery' 
                  ? "border-gold-500 text-gold-500" 
                  : "border-transparent hover:border-navy-700 text-navy-300 hover:text-white"
              )}
            >
              <ImageIcon size={16} className="mr-2" />
              Gallery Management
            </button>
          </nav>
        </div>
        
        {/* Conditional rendering based on active tab */}
        {activeTab === 'messages' ? (
          <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/50 p-4 sm:p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-playfair mb-4 flex items-center gap-2">
              <FileText size={20} className="text-gold-400" />
              <span>Contact Form Submissions</span>
            </h2>
            
            {/* Rest of the existing contact messages UI */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-4 border-navy-600 border-t-gold-400 rounded-full animate-spin"></div>
              </div>
            ) : formRequests.length === 0 ? (
              <div className="text-center py-12 text-navy-400">
                <p>No form submissions yet.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {formRequests.map((request) => {
                  const timestamp = request.timestamp?.toDate ? 
                    request.timestamp.toDate().toLocaleString() : 
                    'Unknown date';
                
                  const isEditing = editingId === request.id;
                
                  return (
                    <div 
                      key={request.id} 
                      className="bg-navy-700/50 border border-navy-600/50 rounded-lg p-4 sm:p-5 hover:border-gold-500/30 transition-all"
                    >
                      {/* Mobile layout with column direction for header */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 sm:gap-0 mb-4">
                        <div className="space-y-1">
                          {isEditing ? (
                            <div className="space-y-3 mb-3 w-full sm:max-w-md">
                              <div>
                                <label className="text-sm text-navy-300 block mb-1">Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  value={editFormData.name || ''}
                                  onChange={handleInputChange}
                                  className="w-full p-2 bg-navy-600 border border-navy-500 rounded text-white"
                                />
                              </div>
                              <div>
                                <label className="text-sm text-navy-300 block mb-1">Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={editFormData.email || ''}
                                  onChange={handleInputChange}
                                  className="w-full p-2 bg-navy-600 border border-navy-500 rounded text-white"
                                />
                              </div>
                              <div>
                                <label className="text-sm text-navy-300 block mb-1">Phone</label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={editFormData.phone || ''}
                                  onChange={handleInputChange}
                                  className="w-full p-2 bg-navy-600 border border-navy-500 rounded text-white"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <h3 className="text-lg font-medium flex items-center gap-2">
                                <User size={16} className="text-gold-400" />
                                {request.name || 'Anonymous'}
                              </h3>
                            
                              <div className="flex items-center gap-2 text-sm text-navy-300">
                                <Mail size={14} />
                                <span className="break-all">{request.email || 'No email provided'}</span>
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
                            </>
                          )}
                        </div>
                      
                        {/* Mobile-optimized action buttons with improved spacing */}
                        <div className="flex flex-wrap items-center gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={handleSaveEdit}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-white text-sm font-medium flex items-center gap-1.5 transition-colors flex-1 sm:flex-none justify-center sm:justify-start"
                              >
                                <Save size={14} />
                                <span>Save</span>
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1.5 bg-navy-600 hover:bg-navy-500 rounded text-white text-sm font-medium flex items-center gap-1.5 transition-colors flex-1 sm:flex-none justify-center sm:justify-start"
                              >
                                <X size={14} />
                                <span>Cancel</span>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => toggleResponseInput(request.id)}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm font-medium flex items-center gap-1.5 transition-colors"
                                title="Compose response"
                              >
                                <MessageSquare size={14} />
                                <span className="inline sm:hidden md:inline">Response</span>
                              </button>
                              <button
                                onClick={() => handleEdit(request)}
                                className="px-3 py-1.5 bg-navy-600 hover:bg-navy-500 rounded text-white text-sm font-medium flex items-center gap-1.5 transition-colors"
                                title="Edit"
                              >
                                <Edit2 size={14} />
                                <span className="inline sm:hidden md:inline">Edit</span>
                              </button>
                              <button
                                onClick={() => handleDelete(request.id)}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded text-white text-sm font-medium flex items-center gap-1.5 transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                                <span className="inline sm:hidden md:inline">Delete</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    
                      {isEditing ? (
                        <>
                          <div className="mb-3">
                            <label className="text-sm text-navy-300 block mb-1">Subject</label>
                            <input
                              type="text"
                              name="subject"
                              value={editFormData.subject || ''}
                              onChange={handleInputChange}
                              className="w-full p-2 bg-navy-600 border border-navy-500 rounded text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-navy-300 block mb-1">Message</label>
                            <textarea
                              name="message"
                              value={editFormData.message || ''}
                              onChange={handleInputChange}
                              rows={4}
                              className="w-full p-2 bg-navy-600 border border-navy-500 rounded text-white"
                            ></textarea>
                          </div>
                        </>
                      ) : (
                        <>
                          {request.subject && (
                            <div className="mb-3">
                              <h4 className="text-sm font-medium text-navy-200">Subject:</h4>
                              <p className="text-white">{request.subject}</p>
                            </div>
                          )}
                        
                          {request.message && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-navy-200">Message:</h4>
                              <p className="text-white whitespace-pre-wrap">{request.message}</p>
                            </div>
                          )}
                        
                          {/* Custom Response Input with better mobile styling */}
                          {showResponseInput[request.id] && (
                            <div className="mt-4 border-t border-navy-600 pt-4">
                              <label className="text-sm font-medium text-navy-200 block mb-2">
                                Your Response:
                              </label>
                              <textarea
                                value={responseMessages[request.id] || ''}
                                onChange={(e) => handleResponseChange(request.id, e.target.value)}
                                placeholder="Enter your personalized response here..."
                                rows={5} 
                                className="w-full p-3 bg-navy-600 border border-navy-500 rounded text-white mb-3"
                              ></textarea>
                            
                              <button
                                onClick={() => openWhatsApp(request)}
                                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                              >
                                <ExternalLink size={16} />
                                <span>Send to WhatsApp</span>
                              </button>
                            </div>
                          )}
                        
                          {!showResponseInput[request.id] && (
                            <button
                              onClick={() => openWhatsApp(request)}
                              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors mt-2"
                            >
                              <ExternalLink size={16} />
                              <span>Send to WhatsApp</span>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <AdminGallery />
        )}
      </div>
    </div>
  );
};

export default Admin;
