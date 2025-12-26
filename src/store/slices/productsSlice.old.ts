import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductFilters, SortOption } from '@/types';
import { mockApi } from '@/utils/mockApi';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  sortBy: SortOption;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filters: {},
  sortBy: 'featured',
};

// Async thunks
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const products = await mockApi.getProducts();
  return products;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: string) => {
  const product = await mockApi.getProductById(id);
  return product;
});

const applyFiltersAndSort = (products: Product[], filters: ProductFilters, sortBy: SortOption): Product[] => {
  let filtered = [...products];

  // Apply filters
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.tags.some(tag => tag.toLowerCase().includes(search))
    );
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => {
      const price = Math.min(...p.variants.map(v => v.price));
      if (filters.minPrice !== undefined && price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && price > filters.maxPrice) return false;
      return true;
    });
  }

  if (filters.sizes && filters.sizes.length > 0) {
    filtered = filtered.filter(p => p.variants.some(v => filters.sizes!.includes(v.size)));
  }

  if (filters.colors && filters.colors.length > 0) {
    filtered = filtered.filter(p => p.variants.some(v => filters.colors!.includes(v.color)));
  }

  if (filters.conditions && filters.conditions.length > 0) {
    filtered = filtered.filter(p => filters.conditions!.includes(p.condition));
  }

  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter(p => filters.brands!.includes(p.brand));
  }

  // Apply sorting
  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => {
        const priceA = Math.min(...a.variants.map(v => v.price));
        const priceB = Math.min(...b.variants.map(v => v.price));
        return priceA - priceB;
      });
      break;
    case 'price-desc':
      filtered.sort((a, b) => {
        const priceA = Math.min(...a.variants.map(v => v.price));
        const priceB = Math.min(...b.variants.map(v => v.price));
        return priceB - priceA;
      });
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }

  return filtered;
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = action.payload;
      state.filteredItems = applyFiltersAndSort(state.items, state.filters, state.sortBy);
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      state.filteredItems = applyFiltersAndSort(state.items, state.filters, state.sortBy);
    },
    clearFilters: (state) => {
      state.filters = {};
      state.sortBy = 'featured';
      state.filteredItems = applyFiltersAndSort(state.items, {}, 'featured');
    },
    updateProductStock: (state, action: PayloadAction<{ productId: string; variantId: string; quantity: number }>) => {
      const product = state.items.find(p => p.id === action.payload.productId);
      if (product) {
        const variant = product.variants.find(v => v.id === action.payload.variantId);
        if (variant) {
          variant.quantity = Math.max(0, variant.quantity - action.payload.quantity);
        }
      }
      state.filteredItems = applyFiltersAndSort(state.items, state.filters, state.sortBy);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = applyFiltersAndSort(action.payload, state.filters, state.sortBy);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        // Update the product in items if it exists, otherwise add it
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
        state.filteredItems = applyFiltersAndSort(state.items, state.filters, state.sortBy);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
      });
  },
});

export const { setFilters, setSortBy, clearFilters, updateProductStock } = productsSlice.actions;
export default productsSlice.reducer;
