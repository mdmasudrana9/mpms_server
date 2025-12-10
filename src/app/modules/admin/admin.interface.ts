import { Model, Types } from "mongoose";
export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: string;
  email: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}
