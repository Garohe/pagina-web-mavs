import { supabase } from '@/lib/supabase';
import { MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES } from '@/config/constants';

export const uploadService = {
  // Upload product image
  async uploadProductImage(file: File, productId?: string): Promise<string> {
    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error('Image size must be less than 5MB');
    }

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error('Only JPEG, PNG, and WebP images are allowed');
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId || 'temp'}-${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  // Upload multiple images
  async uploadMultipleImages(files: File[], productId?: string): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadProductImage(file, productId));
    return Promise.all(uploadPromises);
  },

  // Delete product image
  async deleteProductImage(imageUrl: string): Promise<void> {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/product-images/');
      if (urlParts.length !== 2) {
        console.warn('Invalid image URL format');
        return;
      }

      const filePath = urlParts[1];

      const { error } = await supabase.storage
        .from('product-images')
        .remove([filePath]);

      if (error) {
        console.error('Error deleting image:', error);
      }
    } catch (error) {
      console.error('Error in deleteProductImage:', error);
    }
  },

  // Delete multiple images
  async deleteMultipleImages(imageUrls: string[]): Promise<void> {
    const deletePromises = imageUrls.map(url => this.deleteProductImage(url));
    await Promise.all(deletePromises);
  },

  // Validate image file
  validateImage(file: File): { valid: boolean; error?: string } {
    if (file.size > MAX_IMAGE_SIZE) {
      return { valid: false, error: 'Image size must be less than 5MB' };
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
    }

    return { valid: true };
  },
};
