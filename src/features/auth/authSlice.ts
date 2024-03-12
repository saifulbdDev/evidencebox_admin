import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
let accessToken;

if (typeof window !== 'undefined') {
  accessToken = Cookies.get('accessToken');
}

const initialState = {
  accessToken: accessToken ? accessToken : null,
  user: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.accessToken = action.payload;
      Cookies.set('accessToken', action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      Cookies.remove('accessToken')
    },
    getUser: (state, action) => {
      state.user = { ...action.payload };
    }
  }
});

export const { loggedIn, logout, getUser } = authSlice.actions;
export default authSlice.reducer;
