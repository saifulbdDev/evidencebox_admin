export interface AuthorityState {
  isDeleted: boolean;
  _id: string;
  type: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
export interface AuthorityNotify {
  isDeleted: boolean;
  _id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
export interface NewsNotify {
  isDeleted: boolean;
  _id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
export interface AuthorityDepartment {
  isDeleted: boolean;
  _id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  stateOfDepartment: string;
}
export type HowItWorks = {
  description: any[];
  thumbnail: string;
  video: string;
};
export interface DepartmentEmail {
  authorityDepartment: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}
export interface NewsEmail {
  newsToNotify: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}
export interface RelationType {
  relationName: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}
export interface Relatives {
  _id: string;
  relativeOf: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photo: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
  relationType: string;
  userId: string;
  isAssigned: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface departmentState {
  department: {
    howItWorks: HowItWorks;
    loader: boolean;
    authorityNotifys: AuthorityNotify[];
  };
}
export interface AuthorityStateLocal {
  authorityState: {
    loader: boolean;
    authorityStates: AuthorityState[];
  };
}
export interface AuthorityDepartmentLocal {
  authorityDepartment: {
    loader: boolean;
    authorityDepartments: AuthorityDepartment[];
  };
}
export interface departmentEmailState {
  departmentEmail: {
    loader: boolean;
    departmentEmails: DepartmentEmail[];
  };
}
export interface NewsNotifyState {
  newsNotify: {
    loader: boolean;
    newsNotifys: NewsNotify[];
  };
}
export interface NewsEmailState {
  newsEmail: {
    loader: boolean;
    newsEmails: NewsEmail[];
  };
}

export interface RelationTypeState {
  relationtype: {
    loader: boolean;
    relationTypes: RelationType[];
  };
}
export interface RelativesState {
  relatives: {
    loader: boolean;
    relatives: Relatives[];
  };
}
