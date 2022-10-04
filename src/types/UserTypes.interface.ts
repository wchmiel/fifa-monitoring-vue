export interface User {
  [key: string]: string | number | boolean | undefined;
  id: number;
  name: string;
  surname: string;
  avatar: string;
  eagerToPlay?: boolean;
  company?: string;
}

export interface UsersListMenuConfig {
  text: string;
  action: Function;
  disableProp?: string;
}
