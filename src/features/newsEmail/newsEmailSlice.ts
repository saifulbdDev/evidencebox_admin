import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsEmail } from '@/types/department';

interface UserState {
  newsEmails: NewsEmail[];
}

const initialState: UserState = {
  newsEmails: [],
};

const newsEmailApiSlice = createSlice({
  name: 'newsEmailApi',
  initialState,
  reducers: {
    setNewsEmail: (state, action: PayloadAction<NewsEmail[]>) => {
      state.newsEmails = action.payload;
    },
    editNewsEmail: (state, action: PayloadAction<NewsEmail>) => {
      const updatednewsEmails = state.newsEmails.map((obj) => {
        if (obj._id === action.payload._id) {
          return {
            ...obj,
            ...action.payload,
          };
        }
        return obj;
      });
      state.newsEmails = updatednewsEmails;
    },
    onDeleteNewsEmail: (state, action: PayloadAction<NewsEmail>) => {
      const updatednewsEmails = state.newsEmails.filter(
        (item) => item._id !== action?.payload?._id,
      );
      state.newsEmails = updatednewsEmails;
    },
    onAddNewsEmail: (state, action: PayloadAction<NewsEmail>) => {
      state.newsEmails = [...state.newsEmails, action?.payload];
    },
  },
});

export const { setNewsEmail, editNewsEmail, onDeleteNewsEmail, onAddNewsEmail } =
  newsEmailApiSlice.actions;
export default newsEmailApiSlice.reducer;
