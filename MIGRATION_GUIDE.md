# 📦 Product Migration Guide

This guide will help you migrate all 25 mock products to your Supabase database.

---

## ✅ Prerequisites

Before running the migration, make sure you have:

1. **Supabase Project Setup**
   - Created a Supabase project
   - Run the SQL schema from `SUPABASE_SETUP.md`
   - Configured the Storage bucket for product images

2. **Environment Variables**
   - `.env` file exists in the project root
   - Contains valid Supabase credentials:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your_anon_key_here
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
     ```

   **How to get your Service Role Key:**
   1. Go to your Supabase project dashboard
   2. Click on **Project Settings** (gear icon)
   3. Click on **API** in the left sidebar
   4. Under "Project API keys", copy the **service_role** key
   5. Paste it in your `.env` file as `SUPABASE_SERVICE_ROLE_KEY`

   **⚠️ Important:** The service_role key bypasses Row Level Security. Keep it secret and never expose it in client code!

3. **Dependencies Installed**
   - Run `npm install` to ensure all packages are installed

---

## 🚀 Running the Migration

### Step 1: Verify Your .env File

Make sure `D:\Mavs\vintage-threads\.env` exists and has your Supabase credentials.

### Step 2: Install Dependencies (if you haven't already)

```bash
cd D:\Mavs\vintage-threads
npm install
```

This will install the new `tsx` and `dotenv` packages needed for the migration script.

### Step 3: Run the Migration

```bash
npm run migrate
```

---

## 📊 What Happens During Migration

The migration script will:

1. **Connect to Supabase** using your .env credentials
2. **Loop through all 25 products** from `mockProducts.ts`
3. For each product:
   - ✅ Insert the product into the `products` table
   - ✅ Insert measurements into the `product_measurements` table
   - ✅ Insert all variants into the `product_variants` table
4. **Display progress** with emojis and status updates
5. **Show summary** of successful and failed migrations

---

## 📋 Expected Output

You should see something like this:

```
🚀 Starting product migration to Supabase...

📦 Migrating: Classic Denim Jacket...
   ✅ Product created with ID: 123e4567-e89b-12d3-a456-426614174000
   ✅ Measurements added
   ✅ Variant added: Medium Blue / M - $89.99
   ✅ Variant added: Medium Blue / L - $89.99
   ✨ Completed: Classic Denim Jacket

📦 Migrating: Vintage Champion Hoodie...
   ✅ Product created with ID: 123e4567-e89b-12d3-a456-426614174001
   ✅ Measurements added
   ✅ Variant added: Navy Blue / L - $75.00
   ✅ Variant added: Navy Blue / XL - $75.00
   ✨ Completed: Vintage Champion Hoodie

... (continues for all 25 products)

============================================================
📊 Migration Summary:
============================================================
✅ Successfully migrated: 25 products
❌ Failed: 0 products
📦 Total products: 25
============================================================

🎉 Migration completed successfully!
You can now view your products at: http://localhost:5173/shop

✨ All done!
```

---

## 🔍 Verifying the Migration

### Option 1: Check in Supabase Dashboard

1. Go to your Supabase project
2. Click on **Table Editor**
3. Select the **products** table
4. You should see 25 products
5. Check **product_variants** table - you should see multiple variants
6. Check **product_measurements** table - you should see measurement data

### Option 2: Check in Your Application

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173/shop

3. You should see all 25 products displayed

---

## ⚠️ Troubleshooting

### Error: "Missing Supabase credentials"

**Problem:** The .env file is missing or doesn't have the correct variables.

**Solution:**
1. Verify `.env` exists in `D:\Mavs\vintage-threads\.env`
2. Make sure it contains all three required variables:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Get the service_role key from Supabase Dashboard → Project Settings → API

### Error: "tsx: command not found"

**Problem:** Dependencies aren't installed.

**Solution:**
```bash
npm install
```

### Error: "row level security policy violation"

**Problem:** You might be using the anon key instead of the service_role key.

**Solution:**
1. Make sure your `.env` file has `SUPABASE_SERVICE_ROLE_KEY` (not just `VITE_SUPABASE_ANON_KEY`)
2. The service_role key bypasses Row Level Security, which is necessary for migrations
3. Get it from Supabase Dashboard → Project Settings → API → service_role key

### Error: "duplicate key value violates unique constraint"

**Problem:** Products might already exist in your database.

**Solution:**
1. Go to Supabase Dashboard → Table Editor
2. Delete existing products from:
   - `product_variants` (delete first - has foreign key)
   - `product_measurements` (delete first - has foreign key)
   - `products` (delete last)
3. Run the migration again

---

## 🎯 Next Steps After Migration

Once the migration is complete:

1. ✅ **Test the Shop Page**
   - Visit http://localhost:5173/shop
   - Verify all products display correctly
   - Test filtering by category, brand, condition
   - Test sorting options

2. ✅ **Test Product Details**
   - Click on individual products
   - Verify all product information displays
   - Test adding to cart

3. ✅ **Test Admin Panel**
   - Login as admin (admin@mavsthrift.com)
   - Go to Admin Panel
   - Verify you can see and manage products

4. 🔧 **Continue with remaining features:**
   - Create image upload component for Admin Panel
   - Integrate Stripe for payments
   - Complete checkout flow

---

## 📝 Migration Script Location

The migration script is located at:
```
D:\Mavs\vintage-threads\scripts\migrateProducts.ts
```

You can modify it if you need to:
- Add custom fields
- Skip certain products
- Add additional data transformations

---

## 🎉 Success!

If you see "Migration completed successfully!", your database is now populated with all 25 products and you're ready to test the full application!

**Happy testing!** 🚀
