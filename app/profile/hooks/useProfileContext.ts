import { useContext } from "react";
import ProfileContext from "../_components/ProfileContext";

const useProfileContext = () => {
  return useContext(ProfileContext)
}

export default useProfileContext;
