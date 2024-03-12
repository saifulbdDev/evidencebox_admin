import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Relatives } from '@/types/department';

interface relativesState {
  relatives: Relatives[];
}

const initialState: relativesState = {
  relatives: [],
};

const relativesSlice = createSlice({
  name: 'relatives',
  initialState,
  reducers: {
    setRelativess: (state, action: PayloadAction<Relatives[]>) => {
      state.relatives = action.payload;
    },
    editRelatives: (state, action: PayloadAction<Relatives>) => {
      console.log(action.payload, 'action.payload')
      const updatedrelatives = state.relatives.map((obj) => {
        if (obj._id === action.payload._id) {
          return {
            ...obj,
            ...action.payload,
          };
        }
        return obj;
      });
      state.relatives = updatedrelatives;
    },
    deleteRelatives: (state, action: PayloadAction<{id:string}>) => {
      const updatedrelatives = state.relatives.filter(
        (item) => item._id !== action?.payload?.id,
      );
      state.relatives = updatedrelatives;
    },
    addRelatives: (state, action: PayloadAction<Relatives>) => {
      state.relatives = [...state.relatives, action?.payload];
    },
  },
});

export const {
  setRelativess,
  editRelatives,
  deleteRelatives,
  addRelatives,
} = relativesSlice.actions;
export default relativesSlice.reducer;
