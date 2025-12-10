import { model, Schema } from "mongoose";
import { MemberModel, TMember } from "./member.interface";

const MemberSchema = new Schema<TMember, MemberModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },

    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    profileImg: { type: String, default: "" },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//filter Ou deleted documents

MemberSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

MemberSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

MemberSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
MemberSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Member.findOne({ id });
  return existingUser;
};

export const Member = model<TMember, MemberModel>("Member", MemberSchema);
