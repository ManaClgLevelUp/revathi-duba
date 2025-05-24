import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, X, Image as ImageIcon, FilmIcon, Trash2, Edit2, 
  Check, Save, Plus, UploadCloud, CheckCircle2, Loader2, 
  AlertCircle, FileUp, Files
} from 'lucide-react';

import { 
  saveGalleryItem, 
  getGalleryItemsRealtime, 
  updateGalleryItem, 
  deleteGalleryItem 
} from '../utils/firebase';
import { uploadToCloudinary, isVideo, optimizeCloudinaryUrl } from '../utils/cloudinaryUtils';
import { cn } from '@/lib/utils';

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    mediaUrl: '',
    thumbnailUrl: '',
    mediaType: 'image',
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // New state for handling multiple uploads
  const [batchFiles, setBatchFiles] = useState([]);
  const [batchUploads, setBatchUploads] = useState([]);
  const [isBatchUploading, setIsBatchUploading] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [batchCategory, setBatchCategory] = useState('');
  
  const fileInputRef = useRef(null);
  const batchFileInputRef = useRef(null);
  const { toast } = useToast();

  // Load gallery items with realtime updates
  useEffect(() => {
    const unsubscribe = getGalleryItemsRealtime(
      (items) => {
        setGalleryItems(items);
        // Extract unique categories
        const uniqueCategories = [...new Set(items.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching gallery items:", error);
        toast({
          title: "Error",
          description: "Failed to load gallery items. Please try again.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    );
    
    return () => unsubscribe();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = async (file) => {
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(10);
      setUploadError('');
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 500);

      // Determine file type
      const fileType = file.type.startsWith('video/') ? 'video' : 'image';
      
      // Upload to Cloudinary
      const uploadResult = await uploadToCloudinary(file, {
        resource_type: 'auto'
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Update form data with uploaded media
      setFormData(prev => ({
        ...prev,
        mediaUrl: uploadResult.secure_url,
        mediaType: fileType,
        thumbnailUrl: fileType === 'video' ? uploadResult.secure_url.replace(/\.[^/.]+$/, '.jpg') : ''
      }));
      
      toast({
        title: "Upload Complete",
        description: "Media has been successfully uploaded.",
      });
      
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError('Failed to upload file. Please try again.');
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your file.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  // New function to handle multiple file selection with proper TypeScript typing
  const handleBatchFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    // Save files to state for preview
    const fileArray = Array.from(files).map(file => ({
      file,
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type.startsWith('video/') ? 'video' : 'image',
      progress: 0,
      status: 'pending', // pending, uploading, complete, error
      error: null,
      mediaUrl: '',
      thumbnailUrl: '',
    }));
    
    setBatchFiles(fileArray);
    setBatchMode(true);
    setShowForm(false); // Close single upload form if open
    
    // Show notification
    toast({
      title: `${fileArray.length} files selected`,
      description: "Files are ready for upload",
    });
  };

  // Function to upload batch files to Cloudinary
  const uploadBatchFiles = async () => {
    if (batchFiles.length === 0) return;
    
    setIsBatchUploading(true);
    
    // Process each file in sequence
    const results = [];
    let hasErrors = false;
    
    for (let i = 0; i < batchFiles.length; i++) {
      const item = batchFiles[i];
      
      // Update status to uploading
      setBatchFiles(prev => prev.map(f => 
        f.id === item.id ? { ...f, status: 'uploading', progress: 5 } : f
      ));
      
      try {
        // Start upload and track progress
        const uploadProgressInterval = setInterval(() => {
          setBatchFiles(prev => prev.map(f => {
            if (f.id === item.id && f.progress < 90) {
              return { ...f, progress: f.progress + Math.random() * 10 };
            }
            return f;
          }));
        }, 300);
        
        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(item.file, {
          resource_type: 'auto'
        });
        
        clearInterval(uploadProgressInterval);
        
        // Update status to complete
        const updatedItem = {
          ...item,
          status: 'complete',
          progress: 100,
          mediaUrl: uploadResult.secure_url,
          thumbnailUrl: item.type === 'video' ? uploadResult.secure_url.replace(/\.[^/.]+$/, '.jpg') : ''
        };
        
        setBatchFiles(prev => prev.map(f => 
          f.id === item.id ? updatedItem : f
        ));
        
        results.push(updatedItem);
        
      } catch (error) {
        console.error("Upload error:", error);
        hasErrors = true;
        
        // Update status to error
        setBatchFiles(prev => prev.map(f => 
          f.id === item.id ? { 
            ...f, 
            status: 'error', 
            progress: 0, 
            error: 'Upload failed' 
          } : f
        ));
      }
    }
    
    setIsBatchUploading(false);
    setBatchUploads(results);
    
    // Show notification
    if (hasErrors) {
      toast({
        title: "Some uploads failed",
        description: "Some files couldn't be uploaded. Check the list for details.",
        variant: "destructive"
      });
    } else {
      toast({
        title: `${results.length} files uploaded`,
        description: "All files were successfully uploaded. Ready to save to gallery.",
      });
    }
  };

  // Save all batch uploads to Firebase
  const saveBatchToGallery = async () => {
    if (batchUploads.length === 0) return;
    
    let successCount = 0; // Changed from const to let so it can be incremented
    setIsUploading(true);
    
    try {
      // Save each item to Firebase
      for (const item of batchUploads) {
        const galleryItem = {
          title: item.name.split('.')[0] || 'Untitled',  // Use filename as title
          description: '',
          category: batchCategory,
          mediaUrl: item.mediaUrl,
          thumbnailUrl: item.thumbnailUrl,
          mediaType: item.type
        };
        
        await saveGalleryItem(galleryItem);
        successCount++; // Now we can increment this
      }
      
      toast({
        title: "Batch Save Complete",
        description: `${successCount} items added to the gallery successfully.`,
      });
      
      // Reset batch mode
      setBatchFiles([]);
      setBatchUploads([]);
      setBatchMode(false);
      setBatchCategory('');
    } catch (error) {
      console.error("Error saving batch to gallery:", error);
      toast({
        title: "Error",
        description: "Failed to save some or all items to gallery.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Remove item from batch
  const removeFromBatch = (id) => {
    setBatchFiles(prev => prev.filter(f => f.id !== id));
    setBatchUploads(prev => prev.filter(f => f.id !== id));
    
    // If batch is empty, exit batch mode
    if (batchFiles.length <= 1) {
      setBatchMode(false);
    }
  };

  // Clear entire batch
  const clearBatch = () => {
    setBatchFiles([]);
    setBatchUploads([]);
    setBatchMode(false);
    setBatchCategory('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Check if multiple files - use batch mode
      if (e.dataTransfer.files.length > 1) {
        handleBatchFileSelect(e.dataTransfer.files);
      } else {
        // Single file - use existing flow
        handleFileSelect(e.dataTransfer.files[0]);
      }
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check if multiple files - use batch mode
      if (e.target.files.length > 1) {
        handleBatchFileSelect(e.target.files);
      } else {
        // Single file - use existing flow
        handleFileSelect(e.target.files[0]);
      }
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const openBatchFileDialog = () => {
    if (batchFileInputRef.current) {
      batchFileInputRef.current.click();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      mediaUrl: '',
      thumbnailUrl: '',
      mediaType: 'image',
    });
    setEditingId(null);
    setUploadProgress(0);
    setUploadError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.mediaUrl) {
      toast({
        title: "Error",
        description: "Please upload an image or video.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingId) {
        await updateGalleryItem(editingId, formData);
        toast({
          title: "Item Updated",
          description: "Gallery item has been successfully updated.",
        });
      } else {
        await saveGalleryItem(formData);
        toast({
          title: "Item Added",
          description: "New gallery item has been added successfully.",
        });
      }
      
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving gallery item:", error);
      toast({
        title: "Error",
        description: "Failed to save gallery item. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || '',
      mediaUrl: item.mediaUrl || '',
      thumbnailUrl: item.thumbnailUrl || '',
      mediaType: item.mediaType || 'image',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await deleteGalleryItem(id);
        toast({
          title: "Item Deleted",
          description: "Gallery item has been successfully deleted.",
        });
      } catch (error) {
        console.error("Error deleting gallery item:", error);
        toast({
          title: "Error",
          description: "Failed to delete gallery item. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-playfair text-white">Gallery Management</h2>
        
        <div className="flex gap-2">
          {!batchMode && (
            <button
              onClick={() => {
                resetForm();
                setShowForm(prev => !prev);
                setBatchMode(false);
              }}
              className={cn(
                "px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all",
                showForm 
                  ? "bg-navy-700 text-white hover:bg-navy-600" 
                  : "bg-gold-500 text-navy-900 hover:bg-gold-400"
              )}
            >
              {showForm ? (
                <>
                  <X size={16} />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Add Single Item</span>
                </>
              )}
            </button>
          )}
          
          {!showForm && (
            <button
              onClick={() => {
                setBatchMode(true);
                setShowForm(false);
                openBatchFileDialog();
              }}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 flex items-center gap-2 text-sm font-medium transition-all"
            >
              <Files size={16} />
              <span>Batch Upload</span>
            </button>
          )}
        </div>
      </div>

      {/* Batch Upload Section */}
      {batchMode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/50 rounded-lg p-6 mb-8"
        >
          <h3 className="text-lg font-medium mb-5 text-white flex items-center">
            <Files size={18} className="mr-2 text-blue-400" />
            Batch Upload
          </h3>
          
          {batchFiles.length === 0 ? (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 transition-all mb-6",
                dragActive ? "border-blue-500 bg-navy-700/50" : "border-navy-600 hover:border-navy-500"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <UploadCloud 
                  size={40} 
                  className={cn(
                    "mb-3 transition-colors",
                    dragActive ? "text-blue-400" : "text-navy-400"
                  )} 
                />
                
                <p className="mb-2 text-sm text-navy-300">
                  <span className="font-medium">Click to upload multiple files</span> or drag and drop
                </p>
                <p className="text-xs text-navy-400">
                  Select multiple images or videos at once
                </p>
                
                <button
                  type="button"
                  onClick={openBatchFileDialog}
                  className="mt-4 px-4 py-2 bg-navy-700 text-white rounded-md hover:bg-navy-600 transition-colors text-sm flex items-center gap-1"
                >
                  <Files size={16} />
                  <span>Select Multiple Files</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-navy-700/50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-medium">{batchFiles.length} Files Selected</h4>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={openBatchFileDialog}
                      className="px-3 py-1.5 bg-navy-600 hover:bg-navy-500 text-white rounded text-sm transition-colors flex items-center gap-1.5"
                      disabled={isBatchUploading}
                    >
                      <Plus size={14} />
                      <span>Add More</span>
                    </button>
                    
                    <button
                      onClick={clearBatch}
                      className="px-3 py-1.5 bg-red-900/50 hover:bg-red-900 text-white rounded text-sm transition-colors flex items-center gap-1.5"
                      disabled={isBatchUploading}
                    >
                      <X size={14} />
                      <span>Clear All</span>
                    </button>
                  </div>
                </div>
                
                {/* Batch Category Selection */}
                <div className="mb-4">
                  <label htmlFor="batchCategory" className="block text-sm font-medium text-navy-300 mb-1">
                    Category for All Items (Optional)
                  </label>
                  <div className="relative">
                    <select
                      id="batchCategory"
                      value={batchCategory}
                      onChange={(e) => setBatchCategory(e.target.value)}
                      className="w-full p-2.5 bg-navy-700/50 border border-navy-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 focus:border-gold-500"
                      disabled={isBatchUploading}
                    >
                      <option value="">No Category</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* File List with Statuses */}
                <div className="max-h-60 overflow-y-auto pr-2">
                  <div className="space-y-2">
                    {batchFiles.map((file) => (
                      <div 
                        key={file.id}
                        className="bg-navy-800/80 rounded p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          {/* File type icon */}
                          <div className="w-10 h-10 bg-navy-700 rounded flex items-center justify-center flex-shrink-0">
                            {file.type === 'video' ? (
                              <FilmIcon size={20} className="text-blue-400" />
                            ) : (
                              <ImageIcon size={20} className="text-green-400" />
                            )}
                          </div>
                          
                          {/* File details */}
                          <div className="overflow-hidden">
                            <p className="text-sm text-white truncate">{file.name}</p>
                            <p className="text-xs text-navy-400">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        
                        {/* Status indicator */}
                        <div className="flex items-center gap-3">
                          {file.status === 'pending' && (
                            <>
                              <span className="text-xs text-navy-300">Pending</span>
                              <button
                                onClick={() => removeFromBatch(file.id)}
                                className="p-1.5 text-navy-400 hover:text-white transition-colors"
                                disabled={isBatchUploading}
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                          
                          {file.status === 'uploading' && (
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-1.5 bg-navy-600 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 transition-all duration-300"
                                  style={{ width: `${file.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-navy-300">{Math.round(file.progress)}%</span>
                            </div>
                          )}
                          
                          {file.status === 'complete' && (
                            <span className="text-xs text-green-400 flex items-center">
                              <CheckCircle2 size={12} className="mr-1" />
                              Complete
                            </span>
                          )}
                          
                          {file.status === 'error' && (
                            <span className="text-xs text-red-400 flex items-center">
                              <AlertCircle size={12} className="mr-1" />
                              Failed
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Batch Upload/Save Controls */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setBatchMode(false);
                    setBatchFiles([]);
                    setBatchUploads([]);
                  }}
                  className="px-4 py-2 border border-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors"
                  disabled={isBatchUploading}
                >
                  Cancel
                </button>
                
                {batchUploads.length === 0 ? (
                  <button
                    onClick={uploadBatchFiles}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors flex items-center gap-2"
                    disabled={isBatchUploading || batchFiles.length === 0}
                  >
                    {isBatchUploading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={16} />
                        <span>Upload All ({batchFiles.length})</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={saveBatchToGallery}
                    className="px-6 py-2 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-900 hover:from-gold-500 hover:to-gold-400 rounded-md transition-colors flex items-center gap-2"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Save All to Gallery</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
          
          {/* Hidden file input for multiple selection */}
          <input
            ref={batchFileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={(e) => handleBatchFileSelect(e.target.files)}
            multiple
            className="hidden"
          />
        </motion.div>
      )}

      {/* Single Item Add/Edit Form - existing code */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium mb-5 text-white flex items-center">
                {editingId ? (
                  <>
                    <Edit2 size={18} className="mr-2 text-gold-400" />
                    Edit Gallery Item
                  </>
                ) : (
                  <>
                    <Plus size={18} className="mr-2 text-gold-400" />
                    Add Gallery Item
                  </>
                )}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-navy-300 mb-1">
                      Title (Optional)
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-2.5 bg-navy-700/50 border border-navy-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 focus:border-gold-500"
                      placeholder="Enter title for this item"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-navy-300 mb-1">
                      Category (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        list="category-options"
                        className="w-full p-2.5 bg-navy-700/50 border border-navy-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 focus:border-gold-500"
                        placeholder="E.g. Events, Awards, etc."
                      />
                      {categories.length > 0 && (
                        <datalist id="category-options">
                          {categories.map((cat, idx) => (
                            <option key={idx} value={cat} />
                          ))}
                        </datalist>
                      )}
                    </div>
                    <p className="text-xs text-navy-400 mt-1">
                      Choose existing or create new category
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-navy-300 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2.5 bg-navy-700/50 border border-navy-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-gold-500/30 focus:border-gold-500 resize-none"
                    placeholder="Enter description for this gallery item"
                  ></textarea>
                </div>
                
                {/* Media Upload Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-navy-300 mb-2">
                    Media Upload
                  </label>
                  
                  {!formData.mediaUrl ? (
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-8 transition-all",
                        dragActive ? "border-gold-500 bg-navy-700/50" : "border-navy-600 hover:border-navy-500"
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center justify-center text-center">
                        <UploadCloud 
                          size={40} 
                          className={cn(
                            "mb-3 transition-colors",
                            dragActive ? "text-gold-400" : "text-navy-400"
                          )} 
                        />
                        
                        {isUploading ? (
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-navy-300">Uploading...</span>
                              <span className="text-sm text-navy-300">{Math.round(uploadProgress)}%</span>
                            </div>
                            <div className="h-2 w-full bg-navy-600 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-gold-600 to-amber-500 transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="mb-2 text-sm text-navy-300">
                              <span className="font-medium">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-navy-400">
                              Images or videos (max 100MB)
                            </p>
                            
                            {uploadError && (
                              <p className="mt-3 text-red-400 text-sm flex items-center">
                                <AlertCircle size={14} className="mr-1" />
                                {uploadError}
                              </p>
                            )}
                            
                            <button
                              type="button"
                              onClick={openFileDialog}
                              className="mt-4 px-4 py-2 bg-navy-700 text-white rounded-md hover:bg-navy-600 transition-colors text-sm flex items-center gap-1"
                            >
                              <Upload size={16} />
                              <span>Select File</span>
                            </button>
                          </>
                        )}
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleFileInputChange}
                          className="hidden"
                          disabled={isUploading}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 bg-navy-700/30">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          {formData.mediaType === 'video' ? (
                            <div className="w-24 h-24 rounded bg-navy-800 flex items-center justify-center flex-shrink-0">
                              <FilmIcon size={30} className="text-navy-400" />
                            </div>
                          ) : (
                            <div className="w-24 h-24 rounded overflow-hidden bg-navy-800 flex-shrink-0">
                              <img 
                                src={optimizeCloudinaryUrl(formData.mediaUrl, 'image', { thumbnail: true })} 
                                alt="Preview" 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          )}
                          
                          <div>
                            <p className="text-white mb-1 font-medium flex items-center">
                              <CheckCircle2 size={16} className="text-green-500 mr-2" />
                              Media Uploaded Successfully
                            </p>
                            <p className="text-sm text-navy-300 mb-3">
                              {formData.mediaType === 'video' ? 'Video' : 'Image'} is ready to be saved
                            </p>
                            
                            <button
                              type="button"
                              onClick={resetForm}
                              className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center"
                            >
                              <X size={14} className="mr-1" />
                              Remove and upload different file
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                    className="px-4 py-2 border border-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={!formData.mediaUrl || isUploading}
                    className={cn(
                      "px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2",
                      formData.mediaUrl && !isUploading
                        ? "bg-gradient-to-r from-gold-600 to-gold-500 text-navy-900 hover:from-gold-500 hover:to-gold-400"
                        : "bg-navy-700 text-navy-400 cursor-not-allowed"
                    )}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        {editingId ? (
                          <>
                            <Save size={16} />
                            <span>Update Item</span>
                          </>
                        ) : (
                          <>
                            <Check size={16} />
                            <span>Save to Gallery</span>
                          </>
                        )}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Items List */}
      <div className="bg-navy-800/80 backdrop-blur-sm border border-navy-700/50 rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-2 text-white flex items-center">
            <ImageIcon size={18} className="mr-2 text-gold-400" />
            Gallery Items
          </h3>
          <p className="text-sm text-navy-300 mb-5">
            Manage your gallery items below. Click on an item to edit or delete it.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center p-10">
            <div className="w-10 h-10 border-4 border-navy-600 border-t-gold-400 rounded-full animate-spin"></div>
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center p-10 text-navy-400">
            <div className="w-16 h-16 rounded-full bg-navy-700 flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={28} className="opacity-50" />
            </div>
            <p>No gallery items found. Add your first item!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative group bg-navy-700 rounded-lg overflow-hidden border border-navy-600/50 hover:border-gold-500/30 transition-colors"
              >
                {/* Media content */}
                <div className="aspect-video relative bg-navy-900">
                  {isVideo(item.mediaUrl) ? (
                    <div className="w-full h-full flex items-center justify-center bg-navy-800">
                      <FilmIcon size={30} className="text-navy-400" />
                    </div>
                  ) : (
                    <img 
                      src={optimizeCloudinaryUrl(item.mediaUrl, 'image', { thumbnail: true })} 
                      alt={item.title || 'Gallery Item'} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Type indicator */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-navy-900/80 backdrop-blur-sm rounded text-xs text-white flex items-center">
                    {isVideo(item.mediaUrl) ? (
                      <>
                        <FilmIcon size={12} className="mr-1" />
                        Video
                      </>
                    ) : (
                      <>
                        <ImageIcon size={12} className="mr-1" />
                        Image
                      </>
                    )}
                  </div>
                  
                  {/* Category badge if available */}
                  {item.category && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-gold-500/80 backdrop-blur-sm rounded text-xs text-navy-900 font-medium">
                      {item.category}
                    </div>
                  )}
                </div>
                
                {/* Info section */}
                <div className="p-4">
                  <h4 className="text-white font-medium mb-1 truncate">
                    {item.title || 'Untitled Gallery Item'}
                  </h4>
                  
                  {item.description && (
                    <p className="text-navy-300 text-sm line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-navy-400">
                      {new Date(item.timestamp?.toDate?.() || Date.now()).toLocaleDateString()}
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-navy-600 hover:bg-navy-500 rounded text-white transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-900/50 hover:bg-red-900 rounded text-white transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
