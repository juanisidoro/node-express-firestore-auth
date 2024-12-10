// src/domain/types/userTypes.ts

export type Role = "admin" | "user";

export type Store = {
  id_firestore: string;
  store_url: string;
  store_name: string;
  api_token: string;
};

export type UserData = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: Role;
  created_at: string;
  last_login: string;
  url: string;
  stores: Store[];
};
