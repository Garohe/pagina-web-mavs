import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductFilters, SortOption } from '@/types';
import { productsService } from '@/services/productsService';

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
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (filters?: ProductFilters) => {
  return await productsService.getProducts(filters);
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: string) => {
  return await productsService.getProductById(id);
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData: any) => {
  return await productsService.createProduct(productData);
});

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updates }: { id: string; updates: any }) => {
    return await productsService.updateProduct(id, updates);
  }
);

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
  await productsService.deleteProduct(id);
  return id;
});

const applyFiltersAndSort = (products: Product[], filters: ProductFilters, sortBy: SortOption): Product[] => {
  let filtered = [...products];

  // Apply client-side filters that weren't applied server-side
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
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
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
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
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
      })
      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.filteredItems = applyFiltersAndSort(state.items, state.filters, state.sortBy);
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.filteredItems = applyFiltersAndSort(state.items, state.filters, state.sortBy);
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
        state.filteredItems = applyFiltersAndSort(state.items, state.filters, state.sortBy);
      });
  },
});

export const { setFilters, setSortBy, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
