import { Model, Types } from "mongoose";
export type TMember = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: string;
  email: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface MemberModel extends Model<TMember> {
  isUserExists(id: string): Promise<TMember | null>;
}
