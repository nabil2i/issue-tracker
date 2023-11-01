import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useReducer } from "react";
import ProfileContext, {
  ProfileContextType,
  ProfileData,
} from "./ProfileContext";

interface EmailAction {
  type: "UPDATE_EMAIL";
  profileData: ProfileData;
}

interface NameAction {
  type: "UPDATE_NAME";
  profileData: ProfileData;
}

interface PasswordAction {
  type: "UPDATE_PASSWORD";
  profileData: ProfileData;
}

export type ProfileAction = EmailAction | NameAction | PasswordAction;

const profileReducer = (
  state: ProfileData,
  action: ProfileAction
): ProfileData => {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return { ...state, email: action.profileData.email };
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.profileData.name,
      };
    // case "UPDATE_PASSWORD":
    //   return {
    //     ...state,
    //     password: action.profileData.password,
    //   };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

const ProfileProvider = ({ children }: Props) => {
  const { data: session } = useSession();
  const initialState = {
    email: "",
    name: "",
    // password: '',
  };
  console.log("init", initialState);
  const [profileData, dispatch] = useReducer(profileReducer, initialState);
  useEffect(() => {
    if (session?.user) {
      dispatch({
        type: "UPDATE_EMAIL",
        profileData: { ...profileData, email: session.user.email ?? "" },
      });
      dispatch({
        type: "UPDATE_NAME",
        profileData: { ...profileData, name: session.user.name ?? "" },
      });
    }
  }, [session]);

  // console.log(profileData);

  const value: ProfileContextType = { profileData, dispatch };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
