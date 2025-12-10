import { User } from "./user.model";

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `A-${incrementId}`;
  return incrementId;
};

// Member ID
export const findLastMemberId = async () => {
  const lastMember = await User.findOne(
    {
      role: "member",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastMember?.id ? lastMember.id.substring(2) : undefined;
};

export const generateMemberId = async () => {
  let currentId = (0).toString();
  const lastMemberId = await findLastMemberId();

  if (lastMemberId) {
    currentId = lastMemberId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `M-${incrementId}`;
  return incrementId;
};
