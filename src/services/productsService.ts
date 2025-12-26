import { supabase } from '@/lib/supabase';
import type { Product, ProductFilters } from '@/types';

export const productsService = {
  // Get all products
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        measurements:product_measurements(*)
      `)
      .eq('active', true);

    // Apply filters
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,brand.ilike.%${filters.search}%`);
    }

    if (filters?.conditions && filters.conditions.length > 0) {
      query = query.in('condition', filters.conditions);
    }

    if (filters?.brands && filters.brands.length > 0) {
      query = query.in('brand', filters.brands);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform data to match Product type
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      brand: item.brand,
      condition: item.condition,
      material: item.material,
      careInstructions: item.care_instructions,
      images: item.images || [],
      tags: item.tags || [],
      featured: item.featured,
      createdAt: item.created_at,
      soldAt: item.sold_at,
      rating: parseFloat(item.rating) || 0,
      reviewCount: item.review_count || 0,
      variants: (item.variants || []).map((v: any) => ({
        id: v.id,
        color: v.color,
        size: v.size,
        sku: v.sku,
        quantity: v.quantity,
        price: parseFloat(v.price),
        images: v.images || [],
      })),
      measurements: item.measurements ? {
        chest: item.measurements.chest,
        length: item.measurements.length,
        shoulders: item.measurements.shoulders,
        sleeves: item.measurements.sleeves,
        waist: item.measurements.waist,
        inseam: item.measurements.inseam,
      } : {},
    }));
  },

  // Get product by ID
  async getProductById(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*),
        measurements:product_measurements(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Product not found');

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      brand: data.brand,
      condition: data.condition,
      material: data.material,
      careInstructions: data.care_instructions,
      images: data.images || [],
      tags: data.tags || [],
      featured: data.featured,
      createdAt: data.created_at,
      soldAt: data.sold_at,
      rating: parseFloat(data.rating) || 0,
      reviewCount: data.review_count || 0,
      variants: (data.variants || []).map((v: any) => ({
        id: v.id,
        color: v.color,
        size: v.size,
        sku: v.sku,
        quantity: v.quantity,
        price: parseFloat(v.price),
        images: v.images || [],
      })),
      measurements: data.measurements ? {
        chest: data.measurements.chest,
        length: data.measurements.length,
        shoulders: data.measurements.shoulders,
        sleeves: data.measurements.sleeves,
        waist: data.measurements.waist,
        inseam: data.measurements.inseam,
      } : {},
    };
  },

  // Create product (Admin only)
  async createProduct(productData: any): Promise<Product> {
    // 1. Create product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        name: productData.name,
        description: productData.description,
        category: productData.category,
        brand: productData.brand,
        condition: productData.condition,
        material: productData.material,
        care_instructions: productData.careInstructions,
        images: productData.images || [],
        tags: productData.tags || [],
        featured: productData.featured || false,
        active: true,
      })
      .select()
      .single();

    if (productError) throw productError;

    // 2. Create measurements
    if (productData.measurements) {
      const { error: measurementsError } = await supabase
        .from('product_measurements')
        .insert({
          product_id: product.id,
          ...productData.measurements,
        });

      if (measurementsError) throw measurementsError;
    }

    // 3. Create variants
    if (productData.variants && productData.variants.length > 0) {
      const variants = productData.variants.map((v: any) => ({
        product_id: product.id,
        color: v.color,
        size: v.size,
        sku: v.sku,
        quantity: v.quantity,
        price: v.price,
        images: v.images || [],
      }));

      const { error: variantsError } = await supabase
        .from('product_variants')
        .insert(variants);

      if (variantsError) throw variantsError;
    }

    // Return the created product
    return this.getProductById(product.id);
  },

  // Update product (Admin only)
  async updateProduct(id: string, updates: any): Promise<Product> {
    const { error } = await supabase
      .from('products')
      .update({
        name: updates.name,
        description: updates.description,
        category: updates.category,
        brand: updates.brand,
        condition: updates.condition,
        material: updates.material,
        care_instructions: updates.careInstructions,
        images: updates.images,
        tags: updates.tags,
        featured: updates.featured,
        active: updates.active,
      })
      .eq('id', id);

    if (error) throw error;

    return this.getProductById(id);
  },

  // Update product stock
  async updateStock(variantId: string, quantity: number): Promise<void> {
    const { error } = await supabase
      .from('product_variants')
      .update({ quantity })
      .eq('id', variantId);

    if (error) throw error;

    // If quantity is 0, mark product as sold
    if (quantity === 0) {
      const { data: variant } = await supabase
        .from('product_variants')
        .select('product_id')
        .eq('id', variantId)
        .single();

      if (variant) {
        await supabase
          .from('products')
          .update({ sold_at: new Date().toISOString() })
          .eq('id', variant.product_id);
      }
    }
  },

  // Delete product (Admin only)
  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
