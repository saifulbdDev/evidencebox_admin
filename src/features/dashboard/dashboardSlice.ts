import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCard } from '@/types/types';

interface dashboardState {
  isSidebar: boolean;
  userOverview: UserCard;
  policeOverview: UserCard;
  relativeOverview: UserCard;
  incomeOverview: UserCard;
  planOverview: UserCard;
  evidenceOverview: UserCard;
}

const initialState: dashboardState = {
  userOverview: {
    title: '',
    items: []
  },
  policeOverview: {
    title: '',
    items: []
  },
  relativeOverview: {
    title: '',
    items: []
  },
  evidenceOverview: {
    title: '',
    items: []
  },
  incomeOverview: {
    title: '',
    items: []
  },
  planOverview: {
    title: '',
    items: []
  },
  isSidebar: true,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.isSidebar = action.payload;
    },
    setUserOverview: (state, action: PayloadAction<UserCard>) => {    
      state.userOverview = action.payload;
    },
    setPoliceOverview: (state, action: PayloadAction<UserCard>) => {
      state.policeOverview = action.payload;
    },
    setEvidenceOverview: (state, action: PayloadAction<UserCard>) => {
      state.evidenceOverview = action.payload;
    },
    setRelativeOverview: (state, action: PayloadAction<UserCard>) => {
      state.relativeOverview = action.payload;
    },
    setIncomeOverview: (state, action: PayloadAction<UserCard>) => {
      state.incomeOverview = action.payload;
    },
    setPlanOverview: (state, action: PayloadAction<UserCard>) => {
      state.planOverview = action.payload;
    },
  },
});

export const {
  setEvidenceOverview,
  setUserOverview,
  setPoliceOverview,
  setRelativeOverview,
  setIncomeOverview,
  setPlanOverview,
  toggleSidebar,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
