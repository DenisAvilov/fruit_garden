// нашa логикa авторизации.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Auth = {
  email: string;
  password: string;
};

const initialState: Auth = {
    email: 'йц',
    password: 'йцйц'
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  
    loginSuccess: (state, action: PayloadAction<Auth>) => {     
     state.email = action.payload.email
     state.password = action.payload.password
    }, 
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;

// Определите тип автоматически на основе authSlice.reducer
export type AuthState = ReturnType<typeof authSlice.reducer>;


