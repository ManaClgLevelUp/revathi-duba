/**
 * Types for Cloudinary options
 */
interface CloudinaryOptions {
  responsive?: boolean;
  thumbnail?: boolean;
  [key: string]: any;
}

/**
 * Uploads a file to Cloudinary using the provided upload preset and cloud name
 */
export const uploadToCloudinary = async (file: File, options: Record<string, any> = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'revathiduba');
    formData.append('cloud_name', 'ds4kworxm');
    
    // Add any additional options
    for (const key in options) {
      formData.append(key, options[key]);
    }
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/ds4kworxm/auto/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

/**
 * Checks if a file is a video based on its type or extension
 */
export const isVideo = (file: File | string): boolean => {
  if (typeof file === 'object' && 'type' in file) {
    return file.type.startsWith('video/');
  }
  
  // Check by URL extension if type is not available
  if (typeof file === 'string') {
    const extension = file.split('.').pop()?.toLowerCase();
    return ['mp4', 'webm', 'ogg', 'mov'].includes(extension || '');
  }
  
  return false;
};

/**
 * Optimizes Cloudinary URLs for different purposes
 */
export const optimizeCloudinaryUrl = (url: string, type: 'image' | 'video' = 'image', options: CloudinaryOptions = {}) => {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  // Split the URL into parts
  const baseUrl = url.split('upload/')[0] + 'upload/';
  const identifier = url.split('upload/')[1];
  
  let transformations = '';
  
  if (type === 'image') {
    // Default image optimizations
    transformations = 'q_auto,f_auto,c_limit,w_1200/';
    
    // Add responsive transformations if specified
    if (options.responsive) {
      transformations = 'q_auto,f_auto,w_auto,c_scale,dpr_auto/';
    }
    
    // Add thumbnail transformations if specified
    if (options.thumbnail) {
      transformations = 'c_thumb,w_400,h_300,g_auto/';
    }
  } else if (type === 'video') {
    // Default video optimizations
    transformations = 'q_auto/';
  }
  
  return `${baseUrl}${transformations}${identifier}`;
};
