import { useContext } from "react";
import RegistrationContext from "../_components/RegistrationContext";

const useRegistrationContext = () => {
  return useContext(RegistrationContext)
}

export default useRegistrationContext;
