import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isFilterSidebarOpen: boolean;
}

const initialState: UiState = {
  isMobileMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  isFilterSidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    toggleFilterSidebar: (state) => {
      state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
    },
    closeFilterSidebar: (state) => {
      state.isFilterSidebarOpen = false;
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  toggleCart,
  openCart,
  closeCart,
  toggleSearch,
  closeSearch,
  toggleFilterSidebar,
  closeFilterSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;
