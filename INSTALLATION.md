# Vintage Threads - Installation Guide

## Step-by-Step Installation

### 1. Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### 2. Navigate to the Project Directory
```bash
cd vintage-threads
```

### 3. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- React Hook Form
- Zod
- And more...

### 4. Start the Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### 5. Open in Browser
Navigate to `http://localhost:5173` in your web browser.

## Demo Accounts

### Customer Account
- **Email:** demo@example.com
- **Password:** demo123

### Admin Account
- **Email:** admin@vintagethreads.com
- **Password:** admin123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
vintage-threads/
├── src/
│   ├── components/       # Reusable components
│   ├── data/            # Mock data
│   ├── pages/           # Page components
│   ├── store/           # Redux store
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind config
└── vite.config.ts       # Vite config
```

## Features

✅ User authentication (Login, Sign up, Logout)
✅ Browse products with filtering and sorting
✅ Product detail pages with variants
✅ Shopping cart with 15-minute reservation timer
✅ Checkout process
✅ Admin panel for product and order management
✅ Responsive design
✅ Mock data with 25+ products

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.)

### Dependencies Installation Issues
If you encounter issues during `npm install`:
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### Build Errors
Make sure you're using Node.js v16 or higher:
```bash
node --version
```

## Next Steps

1. **Explore the Homepage** - Check out the hero slider and featured products
2. **Browse Products** - Visit /shop to see all products with filtering
3. **Login as Customer** - Use demo@example.com / demo123
4. **Add to Cart** - Add products and see the cart sidebar
5. **Login as Admin** - Use admin@vintageThreads.com / admin123
6. **Admin Panel** - Visit /admin to see the admin dashboard

## Support

For issues or questions:
- Check the README.md file
- Review the code comments
- Contact: support@vintagethreads.com

## Technologies Used

- React 18
- TypeScript
- Vite
- Redux Toolkit
- React Router v6
- Tailwind CSS
- React Hook Form
- Zod
- Lucide React (icons)
- React Hot Toast

Enjoy building with Vintage Threads! 🎉
