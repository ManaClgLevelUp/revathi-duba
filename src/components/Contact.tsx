
import React, { useState } from 'react';
import { Mail, Linkedin, BookOpen, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  return (
    <section id="contact" className="section-padding bg-navy-900 text-white">
      <div className="luxury-container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Contact</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-playfair mb-6">Get In Touch</h3>
            <p className="mb-8 text-navy-100">
              Feel free to reach out for academic collaborations, research opportunities, 
              speaking engagements, or general inquiries.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center mr-4">
                  <Mail className="text-gold-500" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Email</h4>
                  <a href="mailto:contact@revathiduba.com" className="text-navy-200 hover:text-gold-300 transition-colors">
                    contact@revathiduba.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center mr-4">
                  <Linkedin className="text-gold-500" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">LinkedIn</h4>
                  <a href="#" className="text-navy-200 hover:text-gold-300 transition-colors">
                    linkedin.com/in/revathi-duba
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center mr-4">
                  <BookOpen className="text-gold-500" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">ResearchGate</h4>
                  <a href="#" className="text-navy-200 hover:text-gold-300 transition-colors">
                    researchgate.net/profile/revathi-duba
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center mr-4">
                  <Link className="text-gold-500" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Google Scholar</h4>
                  <a href="#" className="text-navy-200 hover:text-gold-300 transition-colors">
                    scholar.google.com/revathi-duba
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-navy-800 p-8 rounded-md">
            <h3 className="text-2xl font-playfair mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy-100 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-navy-700 border border-navy-600 rounded-sm text-white placeholder:text-navy-400 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy-100 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-navy-700 border border-navy-600 rounded-sm text-white placeholder:text-navy-400 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-navy-100 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-navy-700 border border-navy-600 rounded-sm text-white placeholder:text-navy-400 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-100 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 bg-navy-700 border border-navy-600 rounded-sm text-white placeholder:text-navy-400 focus:outline-none focus:border-gold-500 transition-colors"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-gold-600 text-navy-900 font-medium rounded-sm hover:bg-gold-500 transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
