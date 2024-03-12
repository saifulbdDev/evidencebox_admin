import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/features/apiSlice';
import authReducer from '@/features/auth/authSlice';
import userReducer from '@/features/user/userSlice';
import departmentReducer from '@/features/department/departmentSlice';
import authorityStateSlice from '@/features/authorityState/authorityStateSlice';
import authorityDepartment from '@/features/authorityDepartment/authorityDepartmentSlice';
import departmentEmail from '@/features/departmentEmail/departmentEmailSlice';
import newsNotify from '@/features/newsNotify/newsNotifySlice';
import newsEmail from '@/features/newsEmail/newsEmailSlice';
import relatives from '@/features/relatives/relativesSlice';
import relationtype from '@/features/relationtype/relationtypeSlice';
import dashboard from '@/features/dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    department: departmentReducer,
    authorityState: authorityStateSlice,
    authorityDepartment: authorityDepartment,
    departmentEmail: departmentEmail,
    newsNotify: newsNotify,
    newsEmail: newsEmail,
    relatives: relatives,
    relationtype: relationtype,
    dashboard: dashboard,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});
