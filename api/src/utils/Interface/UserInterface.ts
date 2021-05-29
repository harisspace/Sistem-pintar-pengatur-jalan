export interface User {
  id: number;
  user_uid: string;
  username: string;
  email: string;
  password: string;
  user_role: string;
  confirmed: boolean;
  created_at: Date;
  updated_at: Date;
}

export const SelectUser = {
  id: true,
  user_uid: true,
  username: true,
  email: true,
  user_role: true,
  confirmed: true,
  created_at: true,
  updated_at: true,
};
