export interface User {
  [key: string]: string | number | boolean | undefined;
  id: number;
  name: string;
  avatar: string;
  eagerToPlay?: boolean;
  company?: string;
  compnayImage?: string;
}

export interface UsersListMenuConfig {
  text: string;
  action: Function;
  disableProp?: string;
}

export enum USER_LOCAL_STORAGE {
  ID_ITEM = "MHSID",
}
