// нашa логикa авторизации.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './../index'
import { AuthResponse } from '@/models/response/AuthResponse';
// import { iUser } from '@/models/response/iUser';


export type AuthType = {
  email: string;
  password: string;
};

 interface iUser{
  userId: number 
  role: string
  email: string,  
  isActivated: boolean 
}

 

type AuthState = {
  data: iUser | null; 
  session: null | string;
  status: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  data: {} as iUser,
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
    loginSuccess: (state, action: PayloadAction<iUser>) => {     
      if(!action.payload){
            return
          }
      state.data = action.payload;  
      state.status = true;    
      state.loading = false;
      state.error = null;
    },
    loginOut: (state, action: PayloadAction<iUser>) => {
      console.log('loginOut: (state, action: ', action)
      state.data = action.payload; 
      state.status = false
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

export const { loginRequest, loginSuccess, loginFailure, loginEnd, loginOut } = authSlice.actions;

export default authSlice.reducer;

export const selectUserData = (state: RootState) => state.auth.data;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectStatus = (state: RootState) => state.auth.status;




