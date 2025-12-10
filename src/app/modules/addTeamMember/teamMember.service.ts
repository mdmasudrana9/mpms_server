import { TeamMember, ITeamMember } from "./teamMember.model";

const createTeamMemberInDB = async (payload: ITeamMember) => {
  const result = await TeamMember.create(payload);
  return result;
};

const getAllTeamMembersFromDB = async () => {
  return await TeamMember.find();
};

const getSingleTeamMemberFromDB = async (id: string) => {
  return await TeamMember.findById(id);
};

const updateTeamMemberInDB = async (
  id: string,
  payload: Partial<ITeamMember>
) => {
  return await TeamMember.findByIdAndUpdate(id, payload, { new: true });
};

const deleteTeamMemberFromDB = async (id: string) => {
  return await TeamMember.findByIdAndDelete(id);
};

export const TeamMemberServices = {
  createTeamMemberInDB,
  getAllTeamMembersFromDB,
  getSingleTeamMemberFromDB,
  updateTeamMemberInDB,
  deleteTeamMemberFromDB,
};
