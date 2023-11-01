import { Dispatch, createContext } from "react";
import { ProfileAction } from "./ProfileProvider";

export interface ProfileData {
  name: string;
  email: string;
  // password: string;
}

export interface ProfileContextType {
  profileData: ProfileData;
  dispatch: Dispatch<ProfileAction>
}

const ProfileContext = createContext<ProfileContextType>({ } as ProfileContextType);

export default ProfileContext;
