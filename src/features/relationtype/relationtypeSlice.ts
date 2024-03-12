import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RelationType } from '@/types/department';

interface UserState {
  relationTypes: RelationType[];
}

const initialState: UserState = {
  relationTypes: [],
};

const relationtypeSlice = createSlice({
  name: 'relationtype',
  initialState,
  reducers: {
    setRelationTypes: (state, action: PayloadAction<RelationType[]>) => {
      state.relationTypes = action.payload;
    },
    editRelationType: (state, action: PayloadAction<RelationType>) => {
      const updatedrelationTypes = state.relationTypes.map((obj) => {
        if (obj._id === action.payload._id) {
          return {
            ...obj,
            ...action.payload,
          };
        }
        return obj;
      });
      state.relationTypes = updatedrelationTypes;
    },
    onDeleteRelationType: (state, action: PayloadAction<RelationType>) => {
      const updatedrelationTypes = state.relationTypes.filter(
        (item) => item._id !== action?.payload?._id,
      );
      state.relationTypes = updatedrelationTypes;
    },
    onAddRelationType: (state, action: PayloadAction<RelationType>) => {
      state.relationTypes = [...state.relationTypes, action?.payload];
    },
  },
});

export const { setRelationTypes, editRelationType, onDeleteRelationType, onAddRelationType } =
  relationtypeSlice.actions;
export default relationtypeSlice.reducer;
