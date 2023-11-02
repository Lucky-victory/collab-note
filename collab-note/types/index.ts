import { type SpaceMember } from "@ably/spaces";

export type MemberProperty = "memberColor" | "memberName";
export type MemberForAvatar = Omit<SpaceMember, "profileData"> & {
  profileData: { memberColor: string; name: string };
};
export type Member = Omit<SpaceMember, "profileData" | "location"> & {
  profileData: {name:string;
    memberName: string;
    memberColor: string; userColors: {
      cursorColor: string;
    };
  };
  location: {
    row?: number;
    col?: number;
  };
};