import React, { useState } from 'react';
import { Mail, Linkedin, BookOpen, Link as LinkIcon, Phone, MessageSquare, Send, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. Dr. Duba will get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    { 
      icon: <Mail size={22} />, 
      title: "Email", 
      value: "revathidubaindia@gmail.com", 
      href: "mailto:revathidubaindia@gmail.com",
      color: "from-blue-500 to-cyan-400"
    },
    { 
      icon: <Linkedin size={22} />, 
      title: "LinkedIn", 
      value: "dr-revathi-duba", 
      href: "https://www.linkedin.com/in/dr-revathi-duba-1536523a/",
      color: "from-blue-600 to-blue-400"
    },
    { 
      icon: <Phone size={22} />, 
      title: "Phone", 
      value: "+91 8099794356", 
      href: "tel:+918099794356",
      color: "from-green-600 to-emerald-400"
    },
    { 
      icon: <MessageSquare size={22} />, 
      title: "WhatsApp", 
      value: "+91 8099794356", 
      href: "https://wa.me/918099794356",
      color: "from-green-500 to-emerald-300"
    },
    { 
      icon: <BookOpen size={22} />, 
      title: "ResearchGate", 
      value: "Revathi Duba", 
      href: "https://www.researchgate.net/profile/Revathi-Duba-2",
      color: "from-teal-500 to-green-400"
    },
    { 
      icon: <LinkIcon size={22} />, 
      title: "Google Scholar", 
      value: "Revathi Duba", 
      href: "https://scholar.google.com/citations?user=j75rs0IAAAAJ&hl=en",
      color: "from-blue-500 to-indigo-400"
    }
  ];

  return (
    <section id="contact" className="section-padding relative bg-navy-900 text-white overflow-hidden">
      {/* Abstract decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400 to-cyan-600 blur-3xl"></div>
      </div>
      
      <div className="luxury-container relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-medium mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-6"></div>
          <p className="max-w-xl mx-auto text-navy-200">
            Feel free to reach out for academic collaborations, research opportunities, 
            speaking engagements, or any inquiries.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {contactInfo.map((item, index) => (
                <a 
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-navy-800/80 backdrop-blur-sm border border-navy-700/50 p-5 rounded-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/5 hover:border-gold-500/30"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <h4 className="font-medium text-white text-lg mb-1">{item.title}</h4>
                  <p className="text-navy-300 group-hover:text-gold-300 transition-colors text-sm">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>
            
            <div className="mt-8">
              <div className="p-6 bg-navy-800/80 backdrop-blur-sm border border-navy-700/50 rounded-lg">
                <h3 className="text-xl font-playfair mb-3">Office Hours</h3>
                <ul className="space-y-2 text-navy-300">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>By Appointment</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 relative">
            <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/50 p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-playfair mb-6 relative inline-block">
                Send a Message
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 to-transparent"></div>
              </h3>
              
              <form onSubmit={handleSubmit} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="relative group">
                    <label 
                      htmlFor="name" 
                      className={cn(
                        "absolute left-3 transition-all duration-200 pointer-events-none",
                        activeField === 'name' || formData.name ? 
                          "-top-2 text-xs bg-navy-800 px-1 text-gold-400" : 
                          "top-3 text-navy-400"
                      )}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      required
                      className="w-full p-3 bg-navy-700/50 border border-navy-600 rounded text-white placeholder:text-navy-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all"
                    />
                  </div>
                  
                  <div className="relative group">
                    <label 
                      htmlFor="email" 
                      className={cn(
                        "absolute left-3 transition-all duration-200 pointer-events-none",
                        activeField === 'email' || formData.email ? 
                          "-top-2 text-xs bg-navy-800 px-1 text-gold-400" : 
                          "top-3 text-navy-400"
                      )}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required
                      className="w-full p-3 bg-navy-700/50 border border-navy-600 rounded text-white placeholder:text-navy-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all"
                    />
                  </div>
                </div>
                
                <div className="mb-6 relative group">
                  <label 
                    htmlFor="subject" 
                    className={cn(
                      "absolute left-3 transition-all duration-200 pointer-events-none",
                      activeField === 'subject' || formData.subject ? 
                        "-top-2 text-xs bg-navy-800 px-1 text-gold-400" : 
                        "top-3 text-navy-400"
                    )}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    required
                    className="w-full p-3 bg-navy-700/50 border border-navy-600 rounded text-white placeholder:text-navy-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all"
                  />
                </div>
                
                <div className="mb-8 relative group">
                  <label 
                    htmlFor="message" 
                    className={cn(
                      "absolute left-3 transition-all duration-200 pointer-events-none",
                      activeField === 'message' || formData.message ? 
                        "-top-2 text-xs bg-navy-800 px-1 text-gold-400" : 
                        "top-3 text-navy-400"
                    )}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    required
                    rows={5}
                    className="w-full p-3 bg-navy-700/50 border border-navy-600 rounded text-white placeholder:text-navy-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-all resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-900 font-medium rounded-md hover:from-gold-500 hover:to-gold-400 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-opacity-50"
                >
                  <span className="relative flex items-center justify-center gap-2 z-10">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-navy-900 border-t-transparent animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></div>
                </button>
              </form>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-navy-400 flex items-center justify-center gap-2">
            <span>Looking forward to connecting with you</span>
            <ArrowRight size={16} className="text-gold-500" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
