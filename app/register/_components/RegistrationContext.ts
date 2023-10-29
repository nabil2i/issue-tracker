import { registrationSchema } from "@/app/validationSchemas";
import { Dispatch, SetStateAction, createContext } from "react";
import { z } from "zod";
import { RegisterAction } from "./RegistrationProvider";

export type RegistrationData = z.infer<typeof registrationSchema>;

export interface RegistrationContextType {
  onBack: () => void;
  onNext: () => void;
  step: number;
  registrationData: RegistrationData;
  // setRegistrationData: Dispatch<SetStateAction<RegistrationData>>;
  dispatch: Dispatch<RegisterAction>
}

// const RegistrationContext = createContext<RegistrationContextType>({
//   onBack: () => {},
//   onNext: () => {},
//   step: 1
// });
const RegistrationContext = createContext<RegistrationContextType>({ } as RegistrationContextType);

export default RegistrationContext;
