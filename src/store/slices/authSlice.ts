import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types';
import { authService, type LoginData, type SignUpData } from '@/services/authService';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

// Async thunks
export const login = createAsyncThunk('auth/login', async (credentials: LoginData) => {
  return await authService.login(credentials);
});

export const signUp = createAsyncThunk('auth/signUp', async (data: SignUpData & { password: string }) => {
  return await authService.signUp(data);
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  return await authService.getCurrentUser();
});

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ userId, updates }: { userId: string; updates: Partial<User> }) => {
    return await authService.updateProfile(userId, updates);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = `token_${action.payload.id}`;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      // Sign Up
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = `token_${action.payload.id}`;
      })
      .addCase(signUp.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      // Get Current User
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.token = `token_${action.payload.id}`;
        }
      })
      // Update Profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
