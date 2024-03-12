import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorityNotify } from '@/types/department';
import { HowItWorks } from '@/types/department';

interface UserState {
  authorityNotifys: AuthorityNotify[];
  howItWorks: HowItWorks;
}

const initialState: UserState = {
  authorityNotifys: [],
  howItWorks: {
    description: [],
    thumbnail: '',
    video: '',
  },
};

const userSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setAuthorityNotifys: (state, action: PayloadAction<AuthorityNotify[]>) => {
      state.authorityNotifys = action.payload;
    },
    setHowItWorks: (state, action: PayloadAction<HowItWorks>) => {
      state.howItWorks = action.payload;
    },
    editAuthorityNotify: (state, action: PayloadAction<AuthorityNotify>) => {
      const updatedauthorityNotifys = state.authorityNotifys.map((obj) => {
        if (obj._id === action.payload._id) {
          return {
            ...obj,
            ...action.payload,
          };
        }
        return obj;
      });
      state.authorityNotifys = updatedauthorityNotifys;
    },
    onDeleteAuthorityNotify: (state, action: PayloadAction<AuthorityNotify>) => {
      const updatedauthorityNotifys = state.authorityNotifys.filter(
        (item) => item._id !== action?.payload?._id,
      );
      state.authorityNotifys = updatedauthorityNotifys;
    },
    onAddAuthorityNotify: (state, action: PayloadAction<AuthorityNotify>) => {
      state.authorityNotifys = [...state.authorityNotifys, action?.payload];
    },
  },
});

export const {
  setHowItWorks,
  setAuthorityNotifys,
  editAuthorityNotify,
  onDeleteAuthorityNotify,
  onAddAuthorityNotify,
} = userSlice.actions;
export default userSlice.reducer;
