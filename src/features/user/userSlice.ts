import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plan, UserData, FileAccess } from '@/types/user';

interface UserState {
  plans: Plan[];
  users: UserData[];
  polices: UserData[];
  FileAccess: FileAccess[];
}

const initialState: UserState = {
  plans: [],
  users: [],
  polices: [],
  FileAccess: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getPlans: (state, action: PayloadAction<Plan[]>) => {
      state.plans = action.payload;
    },
    editPlan: (state, action: PayloadAction<Plan>) => {
      const updatedPlans = state.plans.map((plan) => {
        if (plan.id === action.payload.id) {
          return {
            ...plan,
            ...action.payload,
          };
        }
        return plan;
      });
      state.plans = updatedPlans;
    },
    onDeletePlan: (state, action: PayloadAction<Plan>) => {
      const updatedPlans = state.plans.filter((item) => item.id !== action?.payload?.id);
      state.plans = updatedPlans;
    },
    planAdd: (state, action: PayloadAction<Plan>) => {
      state.plans = [...state.plans, action?.payload];
    },
    setFileAccess: (state, action: PayloadAction<FileAccess[]>) => {
      state.FileAccess = action?.payload;
    },
    
    updatePolice: (state, action: PayloadAction<UserData>) => {    
      const updatedPolices = state.polices.map((user) =>
        user._id === action?.payload._id ? { ...action.payload } : user
      );
    
      state.polices = updatedPolices;
    },
    setPolice: (state, action: PayloadAction<UserData[]>) => {
      state.polices = action?.payload;
    },
    updatePoliceVerify: (state, action: PayloadAction<UserData>) => {
      const updatedPolices = state.polices.map((police) => {
        if (police._id === action?.payload._id) {
          return {
            ...police,
            isVerified: action?.payload?.isVerified,
          };
        }
        return police;
      });
      state.polices = updatedPolices;
    },

    softDeletePolice: (state, action: PayloadAction<UserData>) => {
      const updatedPolices = state.polices.map((police) => {
        if (police._id === action?.payload._id) {
          return {
            ...police,
            isDeleted: action?.payload?.isDeleted,
          };
        }
        return police;
      });
      state.polices = updatedPolices;
    },
    restorePolice: (state, action: PayloadAction<UserData>) => {
      const updatedPolices = state.polices.map((police) => {
        if (police._id === action?.payload._id) {
          return {
            ...police,
            isDeleted: action?.payload?.isDeleted,
            isSuspended: action?.payload?.isSuspended,
          };
        }
        return police;
      });
      state.polices = updatedPolices;
    },
    suspendPolice: (state, action: PayloadAction<UserData>) => {
      const updatedPolices = state.polices.map((police) => {
        if (police._id === action?.payload._id) {
          return {
            ...police,
            isSuspended: action?.payload?.isSuspended,
          };
        }
        return police;
      });
      state.polices = updatedPolices;
    },
    permanentDeletePolice: (state, action: PayloadAction<UserData>) => {
      const updatedPolices = state.polices?.filter((police) => police._id !== action?.payload?._id);
      state.polices = updatedPolices;
    },
    updateFileAccess: (state, action: PayloadAction<FileAccess>) => {
      const updatedFileAccess = state.FileAccess.map((police) => {
        if (police._id === action?.payload._id) {
          return {
            ...police,
            status: action?.payload?.status,
          };
        }
        return police;
      });
      state.FileAccess = updatedFileAccess;
    },
    setUsers: (state, action: PayloadAction<UserData[]>) => {
      state.users = action?.payload;
    },
     updateUsers: (state, action: PayloadAction<UserData>) => {    
      const updatedUsers = state.users.map((user) =>
        user._id === action?.payload._id ? { ...action.payload } : user
      );
    
      state.users = updatedUsers;
    },
    softDeleteUser: (state, action: PayloadAction<UserData>) => {
      const updatedUsers = state.users.map((user) => {
        if (user._id === action?.payload._id) {
          return {
            ...user,
            isDeleted: action?.payload?.isDeleted,
          };
        }
        return user;
      });
      state.users = updatedUsers;
    },
    restoreUser: (state, action: PayloadAction<UserData>) => {
      const updatedUsers = state.users.map((user) => {
        if (user._id === action?.payload._id) {
          return {
            ...user,
            isDeleted: action?.payload?.isDeleted,
            isSuspended: action?.payload?.isSuspended,
          };
        }
        return user;
      });
      state.users = updatedUsers;
    },
    suspendUser: (state, action: PayloadAction<UserData>) => {
      const updatedUsers = state.users.map((user) => {
        if (user._id === action?.payload._id) {
          return {
            ...user,
            isSuspended: action?.payload?.isSuspended,
          };
        }
        return user;
      });
      state.users = updatedUsers;
    },
    permanentDeleteUser: (state, action: PayloadAction<UserData>) => {
      const updatedUsers = state.users?.filter((user) => user._id !== action?.payload?._id);
      state.users = updatedUsers;
    },
    // updateDeathStatusOfUser: (state, action: PayloadAction<UserData>) => {
    //   const updatedUsers = state.users.map((user) => {
    //     if (user._id === action?.payload._id) {
    //       return {
    //         ...user,
    //         isSuspended: action?.payload?.isSuspended,
    //       };
    //     }
    //     return user;
    //   });
    //   state.users = updatedUsers;
    // },
  },
});

export const {
  getPlans,
  setFileAccess,
  updateFileAccess,
  editPlan,
  onDeletePlan,
  planAdd,
  setPolice,
  updatePoliceVerify,
  updatePolice,
  softDeletePolice,
  restorePolice,
  suspendPolice,
  permanentDeletePolice,
  setUsers,
  updateUsers,
  softDeleteUser,
  restoreUser,
  suspendUser,
  permanentDeleteUser,
} = userSlice.actions;
export default userSlice.reducer;
