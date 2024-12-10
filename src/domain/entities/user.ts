// src/domain/entities/user.ts

export type Role = "admin" | "user";

export type Store = {
  id_firestore: string;
  store_url: string;
  store_name: string;
  api_token: string;
};

export class User {
  constructor(
    public id: string,
    public username: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public role: Role,
    public created_at: string, // ISO format
    public last_login: string, // ISO format
    public url: string,
    public stores: Store[]
    ) {}

  static isValidUser(data: any): data is User {
    return (
      typeof data === "object" &&
      typeof data.id === "string" &&
      typeof data.username === "string" &&
      typeof data.first_name === "string" &&
      typeof data.last_name === "string" &&
      typeof data.email === "string" &&
      typeof data.password === "string" &&
      ["admin", "user"].includes(data.role) &&
      typeof data.created_at === "string" &&
      typeof data.last_login === "string" &&
      typeof data.url === "string" &&
      Array.isArray(data.stores) &&
      data.stores.every(Store.isValidStore)
    );
  }
}

export namespace Store {
  export function isValidStore(data: any): data is Store {
    return (
      typeof data === "object" &&
      typeof data.id_firestore === "string" &&
      typeof data.store_url === "string" &&
      typeof data.store_name === "string" &&
      typeof data.api_token === "string"
    );
  }
}
