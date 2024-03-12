export interface MyState {
  auth: {
    accessToken: string;
  };
}
export interface UserCardItem {
  title: string;
  value?: number | null;
}
export interface UserCard {
  title: string;
  totalItems?: number | string;
  newItems?: number | null;
  items: UserCardItem[];


}

export interface UserOverview {
  total: number;
  new: number;
  registered: number;
  deleted: number;
  suspended: number;
  alive: number;
  dead: number;
}
export interface dashboardState {
  dashboard: {
    policeOverview: UserCard;
    relativeOverview: UserCard;
    incomeOverview: UserCard;
    planOverview: UserCard;
    evidenceOverview: UserCard;
    userOverview: UserCard;
    isSidebar: boolean;
  };
}
