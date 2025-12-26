# Vintage Threads - E-Commerce Platform

A modern, full-featured vintage clothing e-commerce platform built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

## Features

### Customer Features
- ✅ User authentication (Sign up, Login, Logout, Forgot Password)
- ✅ Browse products with advanced filtering and sorting
- ✅ Product detail pages with variant selection (size, color)
- ✅ Shopping cart with 15-minute reservation timer
- ✅ Multi-step checkout process
- ✅ Order tracking and history
- ✅ User profile management
- ✅ Wishlist functionality
- ✅ Product reviews and ratings
- ✅ Newsletter subscription

### Admin Features
- ✅ Complete admin dashboard
- ✅ Product management (CRUD operations)
- ✅ Variant management (colors, sizes, stock)
- ✅ Order management and status updates
- ✅ Customer management
- ✅ Sales analytics and reports
- ✅ Settings management

### Technical Features
- ✅ Redux Toolkit for state management
- ✅ TypeScript for type safety
- ✅ React Hook Form for form handling
- ✅ Zod for validation
- ✅ LocalStorage + Mock API for data persistence
- ✅ Responsive design (mobile-first)
- ✅ Toast notifications
- ✅ Loading states and error handling

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone or extract the project**
   ```bash
   cd vintage-threads
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Demo Credentials

### Customer Account
- Email: `demo@example.com`
- Password: `demo123`

### Admin Account
- Email: `admin@vintageThreads.com`
- Password: `admin123`

## Project Structure

```
vintage-threads/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── cart/          # Shopping cart components
│   │   ├── layout/        # Layout components (Header, Footer)
│   │   └── ui/            # Reusable UI components
│   ├── data/              # Mock data
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin panel pages
│   │   ├── auth/          # Authentication pages
│   │   ├── info/          # Information pages
│   │   └── user/          # User account pages
│   ├── store/             # Redux store
│   │   └── slices/        # Redux slices
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## Features Overview

### Product Catalog
- Browse all products or filter by category
- Advanced filtering (price range, size, color, condition, brand)
- Multiple sort options (price, rating, newest)
- Live search functionality
- Pagination support

### Product Details
- Multiple product images
- Variant selection (color, size)
- Stock availability indicators
- Product measurements table
- Material and care instructions
- Customer reviews and ratings
- Related products

### Shopping Cart
- Real-time cart updates
- 15-minute item reservation timer
- Quantity adjustments
- Free shipping progress bar
- Quick checkout

### Checkout Process
1. Shipping address
2. Shipping method selection
3. Payment method
4. Order review and confirmation

### Admin Panel
- Dashboard with sales overview
- Product management (add, edit, delete)
- Variant management
- Order processing and tracking
- Customer management
- Sales reports and analytics

## Mock Data

The application includes 25 pre-loaded vintage products across different categories:
- Jackets
- Jeans
- Hoodies
- T-Shirts
- Pants
- Shorts
- Activewear
- Accessories

## Notes

- All data is stored in localStorage
- The app includes a mock API with simulated delays for realistic UX
- Email verification is simulated
- Payment processing is simulated (no real transactions)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a demo project. Feel free to use it as a template for your own projects.

## License

MIT License - feel free to use this project for learning or commercial purposes.
