# 🔑 How to Get Your Supabase Service Role Key

The migration script needs your **service_role** key to bypass Row Level Security when inserting products.

---

## 📋 Steps to Get the Key

1. **Go to your Supabase project**
   - Open https://supabase.com/dashboard
   - Click on your project

2. **Navigate to API settings**
   - Click on **⚙️ Project Settings** (bottom left)
   - Click on **API** in the left sidebar

3. **Find the service_role key**
   - Scroll down to the section "**Project API keys**"
   - You'll see three keys:
     - `anon` `public` - Already in your .env ✅
     - `service_role` `secret` - **This is what you need!** ⬅️

4. **Copy the service_role key**
   - Click the **👁️ Reveal** button next to `service_role`
   - Click the **📋 Copy** button

5. **Add it to your .env file**
   - Open `D:\Mavs\vintage-threads\.env` in a text editor
   - Add a new line:
     ```env
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```
   - Paste your copied key after the `=`
   - Save the file

---

## ✅ Your .env file should now look like this:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

---

## ⚠️ IMPORTANT SECURITY NOTE

**The service_role key is VERY POWERFUL!**

- ✅ It bypasses ALL Row Level Security policies
- ✅ It has admin access to your entire database
- ❌ **NEVER** commit it to git
- ❌ **NEVER** expose it in client-side code
- ❌ **NEVER** share it publicly

This key should **ONLY** be used in:
- Server-side code
- Migration scripts (like this one)
- Backend API routes
- Secure environments

The `.env` file is already in `.gitignore` to protect this key.

---

## 🚀 Next Step

Once you've added the key to your `.env` file, run:

```bash
npm run migrate
```

This will populate your database with all 25 products!
