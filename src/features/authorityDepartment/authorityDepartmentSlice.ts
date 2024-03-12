import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorityDepartment } from '@/types/department';

interface UserState {
  authorityDepartments: AuthorityDepartment[];
}

const initialState: UserState = {
  authorityDepartments: [],
};

const authorityDepartmentsSlice = createSlice({
  name: 'authorityDepartments',
  initialState,
  reducers: {
    setAthorityStates: (state, action: PayloadAction<AuthorityDepartment[]>) => {
      state.authorityDepartments = action.payload;
    },
    editAuthorityDepartment: (state, action: PayloadAction<AuthorityDepartment>) => {
      const updatedauthorityDepartments = state.authorityDepartments.map((obj) => {
        if (obj._id === action.payload._id) {
          return {
            ...obj,
            ...action.payload,
          };
        }
        return obj;
      });
      state.authorityDepartments = updatedauthorityDepartments;
    },
    onDeleteAuthorityDepartment: (state, action: PayloadAction<AuthorityDepartment>) => {
      const updatedauthorityDepartments = state.authorityDepartments.filter(
        (item) => item._id !== action?.payload?._id,
      );
      state.authorityDepartments = updatedauthorityDepartments;
    },
    onAddaAthorityState: (state, action: PayloadAction<AuthorityDepartment>) => {
      state.authorityDepartments = [...state.authorityDepartments, action?.payload];
    },
  },
});

export const {
  setAthorityStates,
  editAuthorityDepartment,
  onDeleteAuthorityDepartment,
  onAddaAthorityState,
} = authorityDepartmentsSlice.actions;
export default authorityDepartmentsSlice.reducer;
