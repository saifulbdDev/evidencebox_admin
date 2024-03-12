import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorityState } from '@/types/department';

interface UserState {
  authorityStates: AuthorityState[];
}

const initialState: UserState = {
  authorityStates: [],
};

const authorityStateSlice = createSlice({
  name: 'authorityState',
  initialState,
  reducers: {
    setAthorityStates: (state, action: PayloadAction<AuthorityState[]>) => {
      state.authorityStates = action.payload;
    },
    editAuthorityState: (state, action: PayloadAction<AuthorityState>) => {
      const updatedauthorityStates = state.authorityStates.map((obj) => {
        if (obj._id === action.payload._id) {
          return {
            ...obj,
            ...action.payload,
          };
        }
        return obj;
      });
      state.authorityStates = updatedauthorityStates;
    },
    onDeleteAuthorityState: (state, action: PayloadAction<AuthorityState>) => {
      const updatedauthorityStates = state.authorityStates.filter(
        (item) => item._id !== action?.payload?._id,
      );
      state.authorityStates = updatedauthorityStates;
    },
    onAddaAthorityState: (state, action: PayloadAction<AuthorityState>) => {
      state.authorityStates = [...state.authorityStates, action?.payload];
    },
  },
});

export const {
  setAthorityStates,
  editAuthorityState,
  onDeleteAuthorityState,
  onAddaAthorityState,
} = authorityStateSlice.actions;
export default authorityStateSlice.reducer;
