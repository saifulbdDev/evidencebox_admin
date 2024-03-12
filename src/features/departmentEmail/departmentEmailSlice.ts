import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DepartmentEmail } from '@/types/department';

interface UserState {
  departmentEmails: DepartmentEmail[];
}

const initialState: UserState = {
  departmentEmails: [],
};

const departmentEmailSlice = createSlice({
  name: 'departmentEmails',
  initialState,
  reducers: {
    setAuthorityDepartmentEmail: (state, action: PayloadAction<DepartmentEmail[]>) => {
      state.departmentEmails = action.payload;
    },
    editDepartmentEmail: (state, action: PayloadAction<DepartmentEmail>) => {
      const updateddepartmentEmails = state.departmentEmails.map((obj) => {
        if (obj._id === action.payload._id) {
          return {
            ...obj,
            ...action.payload,
          };
        }
        return obj;
      });
      state.departmentEmails = updateddepartmentEmails;
    },
    onDeleteDepartmentEmail: (state, action: PayloadAction<DepartmentEmail>) => {
      const updateddepartmentEmails = state.departmentEmails.filter(
        (item) => item._id !== action?.payload?._id,
      );
      state.departmentEmails = updateddepartmentEmails;
    },
    onAddDepartmentEmail: (state, action: PayloadAction<DepartmentEmail>) => {
      state.departmentEmails = [...state.departmentEmails, action?.payload];
    },
  },
});

export const {
  setAuthorityDepartmentEmail,
  editDepartmentEmail,
  onDeleteDepartmentEmail,
  onAddDepartmentEmail,
} = departmentEmailSlice.actions;
export default departmentEmailSlice.reducer;
