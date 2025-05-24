import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  X, 
  Maximize2, 
  Play, 
  Image as ImageIcon, 
  Filter, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2,
  Info,
  Eye
} from 'lucide-react';
import { getGalleryItemsRealtime } from '../utils/firebase';
import { cn } from '@/lib/utils';
import PageLoader from './PageLoader';

// Define the structure of a gallery item
interface GalleryItem {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType?: 'image' | 'video';
  timestamp?: any;
}

const GalleryPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [scrollY, setScrollY] = useState(0);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);

  // Load gallery items with real-time updates
  useEffect(() => {
    const unsubscribe = getGalleryItemsRealtime(
      (items) => {
        const typedItems = items as GalleryItem[];
        setGalleryItems(typedItems);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(typedItems.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching gallery items:", error);
        setError('Failed to load gallery. Please try again later.');
        setIsLoading(false);
      }
    );
    
    // Clean up subscription
    return () => unsubscribe();
  }, []);

  // Apply filters when active filter or gallery items change
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeFilter));
    }
  }, [activeFilter, galleryItems]);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check if file is a video based on URL or media type
  const isVideo = (item: GalleryItem) => {
    if (item.mediaType === 'video') return true;
    
    const url = item.mediaUrl || '';
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  // Optimize image URLs with Cloudinary transformations
  const optimizeImageUrl = (url: string, options: { width?: number, quality?: number, format?: string } = {}) => {
    if (!url || !url.includes('cloudinary')) return url;
    
    // Default options
    const width = options.width || 1200;
    const quality = options.quality || 80;
    const format = options.format || 'auto';
    
    // Parse Cloudinary URL
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;
    
    // Add transformations
    return `${parts[0]}/upload/w_${width},q_${quality},f_${format}/${parts[1]}`;
  };

  // Navigate through gallery items in lightbox
  const navigateGallery = (direction: 'next' | 'prev') => {
    if (!lightboxOpen || filteredItems.length === 0) return;
    
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    // Loop around if reaching bounds
    if (newIndex < 0) {
      newIndex = filteredItems.length - 1;
    } else if (newIndex >= filteredItems.length) {
      newIndex = 0;
    }
    
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  // Open lightbox with selected item
  const openLightbox = (item: GalleryItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setCurrentIndex(index >= 0 ? index : 0);
    setSelectedItem(item);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    // Add class to body for styling navigation elements
    document.body.classList.add('lightbox-open');
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
    // Remove class from body when closing lightbox
    document.body.classList.remove('lightbox-open');
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      switch(e.key) {
        case 'ArrowRight':
          navigateGallery('next');
          break;
        case 'ArrowLeft':
          navigateGallery('prev');
          break;
        case 'Escape':
          closeLightbox();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, currentIndex, filteredItems]);

  // Track image loading state
  const handleImageLoaded = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  // Gallery card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    },
    hover: { 
      y: -5, 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  // Format timestamp for display
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Fix mobile menu opening
  useEffect(() => {
    // Add a class to body to indicate we're on gallery page
    document.body.classList.add('on-gallery-page');
    
    // Reset any menu-related styling to ensure clean state
    document.body.classList.remove('menu-open');
    
    // Clean up function to remove class when component unmounts
    return () => {
      document.body.classList.remove('on-gallery-page');
      document.body.classList.remove('menu-open');
    };
  }, []);

  // Enhanced fix for mobile menu with proper TypeScript typing
  useEffect(() => {
    const handleMenuOpen = () => {
      const menuButton = document.querySelector('[aria-label="Open menu"]');
      if (menuButton) {
        // Properly cast to HTMLElement for TypeScript
        const menuButtonElement = menuButton as HTMLElement;
        const originalClickHandler = menuButtonElement.onclick;
        
        menuButtonElement.onclick = (e) => {
          document.body.classList.add('menu-open');
          
          // Fix z-index issues for the menu overlay with a slight delay to ensure elements are rendered
          setTimeout(() => {
            // Target the menu overlay
            const menuOverlay = document.querySelector('.fixed.inset-0.z-40');
            if (menuOverlay) {
              (menuOverlay as HTMLElement).style.zIndex = '999';
            }
            
            // Target the menu content
            const menuContent = document.querySelector('.fixed.inset-y-0.left-0.w-\\[85\\%\\].max-w-xs.z-50');
            if (menuContent) {
              (menuContent as HTMLElement).style.zIndex = '1000';
              (menuContent as HTMLElement).style.height = '100vh';
              (menuContent as HTMLElement).style.top = '0';
              (menuContent as HTMLElement).style.bottom = '0';
              (menuContent as HTMLElement).style.position = 'fixed';
            }
          }, 10);
          
          if (originalClickHandler) {
            originalClickHandler.call(menuButtonElement, e);
          }
        };
      }
      
      // Find close button and handle that too
      const closeButtons = document.querySelectorAll('.fixed.inset-0.z-40');
      closeButtons.forEach(button => {
        // Properly cast to HTMLElement
        const buttonElement = button as HTMLElement;
        const originalClickHandler = buttonElement.onclick;
        
        buttonElement.onclick = (e) => {
          document.body.classList.remove('menu-open');
          if (originalClickHandler) {
            originalClickHandler.call(buttonElement, e);
          }
        };
      });
    };
    
    // Increase the timeout to ensure all menu components are fully loaded
    setTimeout(handleMenuOpen, 1000);
    
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-b from-navy-50/40 via-white to-white gallery-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PageLoader isLoading={isLoading} />

      {/* Reduced height for nav overlay with stronger contrast for better visibility */}
      <div className="absolute top-0 left-0 right-0 z-20 h-16 bg-gradient-to-b from-navy-900/95 via-navy-900/50 to-transparent pointer-events-none">
        {/* Add animated subtle light rays for premium effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="absolute top-0 h-full w-40 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-light-sweep"
              style={{ 
                left: `${i * 30}%`, 
                animationDelay: `${i * 2}s`,
                opacity: 0.7
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Parallax Hero Header - Increased height and added min-height */}
      <div className="relative h-[60vh] md:h-[70vh] min-h-[400px] overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, 300]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2])
          }}
        >
          {/* Gradient Background with Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-800 to-navy-900 z-0"></div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0 z-10">
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white opacity-20"
                style={{
                  width: Math.random() * 6 + 2 + 'px',
                  height: Math.random() * 6 + 2 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Gold-colored accent shapes */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gold-500/10 to-transparent"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-navy-500/10 blur-3xl"></div>
        </motion.div>
        
        {/* Header Content with improved positioning */}
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center items-center pt-24">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Curated Gallery
          </motion.h1>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
          
          <motion.p 
            className="text-white/90 max-w-2xl text-center mb-16 text-lg" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ opacity }}
          >
            Explore Dr. Revathi Duba's academic journey, events, achievements, and memorable moments through this visual showcase.
          </motion.p>
        </div>
        
        {/* Decorative bottom wave - Positioned properly at the bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,170.7C960,139,1056,85,1152,80C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Main Gallery Container */}
      <div className="container mx-auto px-4 py-12 md:py-16" ref={galleryRef}>
        {/* Category Filter Pills */}
        {categories.length > 0 && (
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5",
                activeFilter === 'all' 
                  ? "bg-navy-800 text-white shadow-md" 
                  : "bg-gray-100 text-navy-700 hover:bg-gray-200"
              )}
            >
              <Filter size={14} />
              <span>All</span>
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5",
                  activeFilter === category 
                    ? "bg-navy-800 text-white shadow-md" 
                    : "bg-gray-100 text-navy-700 hover:bg-gray-200"
                )}
              >
                <Filter size={14} />
                <span className="capitalize">{category}</span>
              </button>
            ))}
          </motion.div>
        )}
        
        {error && (
          <div className="text-center text-red-500 py-10">
            <p>{error}</p>
          </div>
        )}
        
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center text-navy-500 py-16">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-medium mb-2">No Gallery Items Yet</h3>
            <p>Check back soon for updates.</p>
          </div>
        )}
        
        {/* Masonry Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-xl bg-white shadow-md transform transition-all duration-300 group cursor-pointer"
              onClick={() => openLightbox(item)}
            >
              <div className="aspect-[4/3] overflow-hidden bg-navy-50">
                {!loadedImages[item.id] && (
                  <div className="absolute inset-0 bg-navy-100/50 flex items-center justify-center animate-pulse">
                    {isVideo(item) ? (
                      <FilmIcon className="w-8 h-8 text-navy-300" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-navy-300" />
                    )}
                  </div>
                )}
                
                {isVideo(item) ? (
                  <div className="relative h-full flex items-center justify-center bg-navy-900/80">
                    <img
                      src={item.thumbnailUrl || item.mediaUrl}
                      alt={item.title || "Video thumbnail"}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                        !loadedImages[item.id] && "opacity-0"
                      )}
                      loading="lazy"
                      onLoad={() => handleImageLoaded(item.id)}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-navy-800 ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full">
                    <img
                      src={optimizeImageUrl(item.mediaUrl)}
                      alt={item.title || "Gallery Image"}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                        !loadedImages[item.id] && "opacity-0"
                      )}
                      loading="lazy"
                      onLoad={() => handleImageLoaded(item.id)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                
                {/* View button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg"
                  >
                    <Eye className="w-4 h-4 text-navy-800" />
                    <span className="text-sm font-medium text-navy-800">View</span>
                  </motion.div>
                </div>
                
                {/* Category badge */}
                {item.category && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-navy-800/80 backdrop-blur-sm rounded-lg text-xs text-white shadow-lg">
                    {item.category}
                  </div>
                )}
                
                {/* Media type indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center">
                  {isVideo(item) ? (
                    <div className="bg-navy-800/80 text-white p-1.5 rounded-full">
                      <Play className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="bg-white/80 text-navy-800 p-1.5 rounded-full">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content info */}
              <div className="p-4 bg-white">
                <h3 className="font-medium text-navy-900 line-clamp-1">
                  {item.title || "Untitled"}
                </h3>
                
                {item.timestamp && (
                  <div className="flex items-center text-xs text-navy-500 mt-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(item.timestamp)}</span>
                  </div>
                )}
              </div>
              
              {/* Hover overlay with description preview */}
              {item.description && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm line-clamp-2">{item.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Lightbox Modal - Now darkbox */}
      <AnimatePresence>
        {lightboxOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black backdrop-blur-lg p-4 md:p-8 overflow-hidden darkbox"
            onClick={closeLightbox}
          >
            {/* Close button - Better visibility */}
            <button
              className="absolute top-4 right-4 z-[10000] w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors"
              onClick={closeLightbox}
            >
              <X size={20} />
            </button>
            
            {/* Navigation arrows - Better visibility */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
              <button
                className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/15 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGallery('prev');
                }}
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30">
              <button
                className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/15 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGallery('next');
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Main content */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media display */}
              <div className="relative flex-1 w-full flex items-center justify-center max-h-[70vh] overflow-hidden">
                {isVideo(selectedItem) ? (
                  <video
                    key={selectedItem.mediaUrl}
                    className="max-w-full max-h-full object-contain"
                    controls
                    autoPlay
                  >
                    <source src={selectedItem.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    key={selectedItem.mediaUrl}
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.title || "Gallery Image"}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
              
              {/* Info panel with animations - Adjusted for darkbox */}
              <motion.div 
                className="w-full max-w-4xl bg-black/70 backdrop-blur-md rounded-lg mt-4 overflow-hidden"
                animate={{ height: showInfo ? 'auto' : '60px' }}
                initial={false}
              >
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo(!showInfo);
                  }}
                >
                  <h3 className="text-lg font-medium text-white">{selectedItem.title || "Untitled"}</h3>
                  <button className="text-white">
                    <Info size={20} />
                  </button>
                </div>
                
                {/* Collapsible content */}
                <motion.div 
                  className="px-4 pb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showInfo ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedItem.description && (
                    <p className="text-white/80 mb-4">{selectedItem.description}</p>
                  )}
                  
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center space-x-4">
                      {selectedItem.category && (
                        <span className="px-2 py-1 bg-navy-700 rounded-md text-xs text-white">
                          {selectedItem.category}
                        </span>
                      )}
                      
                      {selectedItem.timestamp && (
                        <div className="text-white/70 text-xs flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {formatDate(selectedItem.timestamp)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button className="p-2 bg-navy-700 rounded-md text-white hover:bg-navy-600 transition-colors">
                        <Download size={16} />
                      </button>
                      <button className="p-2 bg-navy-700 rounded-md text-white hover:bg-navy-600 transition-colors">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Page indicator - Adjusted for darkbox */}
              <div className="w-full max-w-4xl flex justify-center mt-4">
                <div className="bg-black/70 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm">
                  {currentIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes light-sweep {
          0% { transform: translateX(-250px) skewX(-15deg); }
          100% { transform: translateX(calc(100vw + 250px)) skewX(-15deg); }
        }
        
        .animate-light-sweep {
          animation: light-sweep 8s ease-in-out infinite;
        }
        
        .FilmIcon, .ImageIcon {
          display: inline-block;
        }
        
        /* Enhanced solution for removing all horizontal lines */
        .gallery-container > div {
          border-top: none !important;
          border-bottom: none !important;
        }
        
        /* Mobile-specific fixes for horizontal lines */
        @media (max-width: 768px) {
          /* Target any potential dividers in the mobile view */
          .gallery-container > div,
          .gallery-container > div::before,
          .gallery-container > div::after,
          .container > div,
          .container div[ref="galleryRef"],
          .relative.h-\\[60vh\\],
          .relative.h-\\[60vh\\] + div,
          .motion-div,
          svg,
          svg path {
            border: none !important;
            border-top: none !important;
            border-bottom: none !important;
            outline: none !important;
            box-shadow: none !important;
          }

          /* Specifically target the wave and area below it */
          .absolute.bottom-0.left-0.right-0 svg {
            border-bottom: none !important;
            margin-bottom: -2px !important;
          }

          /* Fix wave SVG connection issues */
          svg {
            display: block !important;
            vertical-align: bottom !important;
          }
          
          /* Fix container joint between sections */
          .container.mx-auto.px-4.py-12 {
            padding-top: 0 !important;
            margin-top: -1px !important;
          }
          
          /* Fix for wave-to-content transition */
          .relative.h-\\[60vh\\].md\\:h-\\[70vh\\].min-h-\\[400px\\] {
            border-bottom: 0 !important;
            margin-bottom: -1px !important;
          }
        }
        
        /* Darkbox styles */
        .darkbox {
          background-color: rgba(0, 0, 0, 0.97) !important;
        }
        
        .darkbox img {
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
        }
        
        .darkbox video {
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
        }
        
        /* Hide navigation when lightbox is open */
        body.lightbox-open header,
        body.lightbox-open .fixed.top-0.left-0.right-0.z-40 {
          visibility: hidden !important;
          opacity: 0 !important;
        }
        
        /* Ensure lightbox has highest z-index */
        body.lightbox-open .fixed.inset-0.z-\\[9999\\] {
          z-index: 9999 !important;
        }
        
        /* Prevent navigation button interference */
        body.lightbox-open .back-to-top-button {
          display: none !important;
        }
        
        /* Ensure proper modal containment */
        .fixed.inset-0.z-\\[9999\\] {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
        }
        
        /* Target the wave separator specifically */
        .relative.h-\\[60vh\\].md\\:h-\\[70vh\\].min-h-\\[400px\\] {
          border-bottom: none !important;
        }
        
        /* Remove borders from any direct children of main containers */
        .container.mx-auto,
        .container.mx-auto > *,
        .gallery-container > * {
          border-top: none !important;
          border-bottom: none !important;
          outline: none !important;
        }
        
        /* Fix for the wave SVG element */
        .absolute.bottom-0.left-0.right-0 svg {
          display: block;
          margin-bottom: -1px; /* Fix any gap between wave and content */
        }
      `}</style>
    </motion.section>
  );
};

// Add missing component definitions
const FilmIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
      <line x1="7" y1="2" x2="7" y2="22"></line>
      <line x1="17" y1="2" x2="17" y2="22"></line>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <line x1="2" y1="7" x2="7" y2="7"></line>
      <line x1="2" y1="17" x2="7" y2="17"></line>
      <line x1="17" y1="17" x2="22" y2="17"></line>
      <line x1="17" y1="7" x2="22" y2="7"></line>
    </svg>
  );
};

export default GalleryPage;
