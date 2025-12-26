import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginCredentials, SignUpData } from '@/types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

// Load from localStorage
const loadAuthState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('auth');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const saveAuthState = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('auth', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    login: (state, action: PayloadAction<LoginCredentials>) => {
      // Simulate login - check against localStorage users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        (u: User & { password: string }) =>
          u.email === action.payload.email && u.password === action.payload.password
      );

      if (user) {
        state.user = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt,
          avatar: user.avatar,
        };
        state.isAuthenticated = true;
        state.token = `token_${user.id}`;
        saveAuthState(state);
      } else {
        throw new Error('Invalid credentials');
      }
    },
    signUp: (state, action: PayloadAction<SignUpData & { password: string }>) => {
      // Create new user
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser: User & { password: string } = {
        id: `user_${Date.now()}`,
        email: action.payload.email,
        password: action.payload.password,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      state.user = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        createdAt: newUser.createdAt,
      };
      state.isAuthenticated = true;
      state.token = `token_${newUser.id}`;
      saveAuthState(state);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      saveAuthState(state);
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveAuthState(state);

        // Update in localStorage users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex((u: User) => u.id === state.user!.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...action.payload };
          localStorage.setItem('users', JSON.stringify(users));
        }
      }
    },
  },
});

export const { login, signUp, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
