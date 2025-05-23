/**
 * Utility functions for admin operations
 */

/**
 * Generate a WhatsApp message URL with a professional response to user inquiry
 */
export const generateAdminWhatsAppResponse = (contactData: any, phoneNumber: string, customResponse?: string) => {
  // Format the current date in a professional way
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Create a formal subject line with reference ID
  const referenceId = `REF-${Date.now().toString().substring(6)}`;
  
  // Use custom response or default message
  const responseText = customResponse && customResponse.trim() !== '[Enter your personalized response here]' && customResponse.trim() !== '' 
    ? customResponse 
    : "Thank you for reaching out. I've reviewed your inquiry and would be happy to discuss this matter further.";
  
  // Format the message in a professional email-like format
  const message = encodeURIComponent(
    `*KIET GROUP OF INSTITUTIONS*\n` +
    `Office of the Principal & Academic Director\n\n` +
    `Date: ${formattedDate}\n` +
    `Reference: ${referenceId}\n\n` +
    `Dear ${contactData.name},\n\n` +
    `Thank you for reaching out to me regarding "${contactData.subject}".\n\n` +
    `I have received your inquiry and appreciate your interest. After reviewing your message, I would like to provide you with the following response:\n\n` +
    `*Re: ${contactData.subject}*\n\n` +
    `${responseText}\n\n` +
    `If you would like to discuss this matter further or have any additional questions, please feel free to contact me directly.\n\n` +
    `Best regards,\n\n` +
    `Dr. Revathi Duba\n` +
    `Principal & Academic Director\n` +
    `KIET Group of Institutions\n` +
    `Email: revathidubaindia@gmail.com\n` +
    `Phone: +91 8099794356`
  );
  
  // Generate WhatsApp URL with the message
  return `https://wa.me/${phoneNumber}?text=${message}`;
};

/**
 * Format a phone number by removing any non-digit characters
 * and ensuring it has the country code
 */
export const formatPhoneNumber = (phone: string) => {
  // Remove any non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // If the number doesn't start with country code, add it (assuming Indian numbers)
  if (!digitsOnly.startsWith('91') && digitsOnly.length === 10) {
    return `91${digitsOnly}`;
  }
  
  return digitsOnly;
};
