import { createClient } from '@supabase/supabase-js';
import { mockProducts } from '../src/data/mockProducts';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file');
  console.log('Please make sure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  console.log('\nThe SUPABASE_SERVICE_ROLE_KEY is needed to bypass Row Level Security during migration.');
  console.log('You can find it in Supabase Dashboard → Project Settings → API → service_role key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateProducts() {
  console.log('🚀 Starting product migration to Supabase...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const product of mockProducts) {
    try {
      console.log(`📦 Migrating: ${product.name}...`);

      // 1. Insert product
      const { data: insertedProduct, error: productError } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description,
          category: product.category,
          brand: product.brand,
          condition: product.condition,
          material: product.material,
          care_instructions: product.careInstructions,
          images: product.images,
          tags: product.tags,
          featured: product.featured,
          active: true,
          rating: product.rating,
          review_count: product.reviewCount,
        })
        .select()
        .single();

      if (productError) {
        console.error(`   ❌ Error inserting product: ${productError.message}`);
        errorCount++;
        continue;
      }

      const productId = insertedProduct.id;
      console.log(`   ✅ Product created with ID: ${productId}`);

      // 2. Insert measurements (if they exist)
      if (product.measurements && Object.keys(product.measurements).length > 0) {
        const { error: measurementError } = await supabase
          .from('product_measurements')
          .insert({
            product_id: productId,
            chest: product.measurements.chest,
            waist: product.measurements.waist,
            length: product.measurements.length,
            shoulders: product.measurements.shoulders,
            sleeves: product.measurements.sleeves,
            inseam: product.measurements.inseam,
          });

        if (measurementError) {
          console.error(`   ⚠️  Warning: Could not insert measurements: ${measurementError.message}`);
        } else {
          console.log(`   ✅ Measurements added`);
        }
      }

      // 3. Insert variants
      for (const variant of product.variants) {
        const { error: variantError } = await supabase
          .from('product_variants')
          .insert({
            product_id: productId,
            color: variant.color,
            size: variant.size,
            sku: variant.sku,
            quantity: variant.quantity,
            price: variant.price,
          });

        if (variantError) {
          console.error(`   ❌ Error inserting variant ${variant.sku}: ${variantError.message}`);
        } else {
          console.log(`   ✅ Variant added: ${variant.color} / ${variant.size} - $${variant.price}`);
        }
      }

      successCount++;
      console.log(`   ✨ Completed: ${product.name}\n`);

    } catch (error) {
      console.error(`❌ Unexpected error migrating ${product.name}:`, error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Successfully migrated: ${successCount} products`);
  console.log(`❌ Failed: ${errorCount} products`);
  console.log(`📦 Total products: ${mockProducts.length}`);
  console.log('='.repeat(60));

  if (successCount > 0) {
    console.log('\n🎉 Migration completed successfully!');
    console.log('You can now view your products at: http://localhost:5173/shop');
  }
}

// Run the migration
migrateProducts()
  .then(() => {
    console.log('\n✨ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });
