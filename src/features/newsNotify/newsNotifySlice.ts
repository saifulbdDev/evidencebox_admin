import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsNotify } from '@/types/department';

interface UserState {
  newsNotifys: NewsNotify[];
}

const initialState: UserState = {
  newsNotifys: [],
};

const newsNotifySlice = createSlice({
  name: 'newsNotifys',
  initialState,
  reducers: {
    setNewsNotify: (state, action: PayloadAction<NewsNotify[]>) => {
      state.newsNotifys = action.payload;
    },
    editNewsNotify: (state, action: PayloadAction<NewsNotify>) => {
      const updatednewsNotifys = state.newsNotifys.map((obj) => {
        if (obj._id === action.payload._id) {
          return {
            ...obj,
            ...action.payload,
          };
        }
        return obj;
      });
      state.newsNotifys = updatednewsNotifys;
    },
    onDeleteNewsNotify: (state, action: PayloadAction<NewsNotify>) => {
      const updatednewsNotifys = state.newsNotifys.filter(
        (item) => item._id !== action?.payload?._id,
      );
      state.newsNotifys = updatednewsNotifys;
    },
    onAddNewsNotify: (state, action: PayloadAction<NewsNotify>) => {
      state.newsNotifys = [...state.newsNotifys, action?.payload];
    },
  },
});

export const { setNewsNotify, editNewsNotify, onDeleteNewsNotify, onAddNewsNotify } =
  newsNotifySlice.actions;
export default newsNotifySlice.reducer;
