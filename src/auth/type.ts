export interface AuthStateType {
  token: any;
  tokenType: any;
  isLoggedIn: any;
  user: {
    branch: string;
    lastLogin: string;
    type: string;
    firstName: string;
    lastName: string;
  };
}

export interface ActionType {
  type: string;
  payload: any;
}

export interface AuthContextType {
  authState: AuthStateType;
  login: any;
  logout: any;
  isLoggedIn: any;
}
