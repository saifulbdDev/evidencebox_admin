
export type Person =   {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
  relationType: string;
}
export type EvidenceData = {
  _id: string;
  dataOf: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photo: string;
    socialSecurityNumber: string;
    state: string;
    city: string;
    zip: string;
    country: string;
    isAlive: boolean;
    deathDate: null | string;
  };
  dataType: string;
  title: string;
  noteOrJournal: string;
  files: string[];
  assignedTo:Person [];
  notifyAuthoritiesList: {
    _id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isDeleted: boolean;
  }[];
  authorityState: {
    _id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  authorityDepartment: {
    _id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    stateOfDepartment: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  notifyNewsList: {
    _id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isDeleted: boolean;
  }[];
  notifyAfterCertainDate: string;
  createdAt: string;
  updatedAt: string;
}

export type Plan = {
  id?: string | undefined;
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  priceId?: string;
  productId?: string;
  packageType?: string;
  interval?: string;
  intervalCount?: number;
  offer?: string;
  isPopular?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export type UserData = {
  id?: number | string;
  _id: string;
  ID: string;
  photo?: string;
  socialSecurityNumber: string;
  firstName: string;
  state: string;
  city: string;
  zip: string;
  country: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  stripeCustomerId: string;
  currentPlan: Plan;
  currentPlanExpires: string;
  isAgreedToTermsAndConditions: boolean;
  isAlive?: boolean;
  deathDate?: string;
  deathCertificate?: string;
  deathNote?: string;
  isVerified: boolean;
  isRejected: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;

  isSuspended: boolean;
  isDeleted: boolean;
};

export type Subscription = {
  _id: string;
  user: {
    photo?: string;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    socialSecurityNumber: string;
    ID: string | null;
    stateAndDepartment: string | null;
    state: string | null;
    city: string | null;
    zip: string | null;
    country: string;
    isVerified: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isSuspended: boolean;
    isDeleted: boolean;
    isAgreedToTermsAndConditions: boolean;
    isAlive: boolean;
    roles: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    identification: string;
    stripeCustomerId: string;
    currentPlan: string;
    currentPlanExpires: string;
    fcmToken: string;
  };
  plan: {
    intervalCount: number;
    _id: string;
    title: string;
    description: string;
    price: number;
    priceId: string;
    currency: string;
    packageType: string;
    offer: string;
    isPopular: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isDeleted: boolean;
  };
  subscriptionExpires: string;
  stripeSubscriptionId: string;
  subscriptionStatus: string;
  paymentMethodType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type FileAccess = {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photo: string | null;
  };
  policeId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photo: string | null;
  };
  submittedDocuments: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
};

export interface userState {
  user: {
    loader: boolean;
    plans: Plan[];
    users: UserData[];
    evidenceData: EvidenceData[];
    polices: UserData[];
    FileAccess: FileAccess[];
  };
}
