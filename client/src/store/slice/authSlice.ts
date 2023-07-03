// нашa логикa авторизации.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './../index'
import { AuthResponse } from '@/models/response/AuthResponse';


export type AuthType = {
  email: string;
  password: string;
};



export type UserResponseType = {
 tokens:{
  accessToken: string
  refreshToken: string
  }  
  user: {
  userId: number 
  role: string
  email: string,  
  isActivated: boolean
  tel: string | null}

}

type AuthState = {
  data: UserResponseType | null; 
  session: null | string;
  status: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  data: {} as UserResponseType,
  session: null,
  status: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
      console.log('action.payload:', action.payload)
    
      state.data = action.payload;  
      state.status = true;    
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
     loginEnd: (state) => {
      state.loading = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, loginEnd } = authSlice.actions;

export default authSlice.reducer;

export const selectUserData = (state: RootState) => state.auth.data;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectStatus = (state: RootState) => state.auth.status;


