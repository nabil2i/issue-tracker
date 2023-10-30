import React, { ReactNode, useContext, useReducer, useState } from 'react'
import RegistrationContext, { RegistrationContextType, RegistrationData } from './RegistrationContext';


interface EmailAction {
  type: "UPDATE_EMAIL"
  registrationData: RegistrationData;
}

interface NameAction {
  type: "UPDATE_NAME"
  registrationData: RegistrationData;
}

interface PasswordAction {
  type: "UPDATE_PASSWORD"
  registrationData: RegistrationData;
}

interface DetailsAction {
  type: "UPDATE_DETAILS"
  registrationData: RegistrationData;
}

export type RegisterAction = EmailAction | NameAction | PasswordAction | DetailsAction;


const registrationReducer = (state: RegistrationData, action: RegisterAction): RegistrationData => {
  switch(action.type) {
    case "UPDATE_EMAIL":
      return { ...state, email: action.registrationData.email};
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.registrationData.name
      };
    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.registrationData.password,
        password2: action.registrationData.password2
      };
    case "UPDATE_DETAILS":
      return {
        ...state,
        firstName: action.registrationData.firstName,
        lastName: action.registrationData.lastName,
        name: action.registrationData.name,
      };
    default:
      return state;
  };
}

interface Props {
  children: ReactNode;
}

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  name: '',
  password: '',
  password2: '',
};

const RegistrationProvider = ({ children }: Props) => {
  // const [registrationData, setRegistrationData] = useState<RegistrationData>(initialState);
  const [registrationData, dispatch] = useReducer(registrationReducer, initialState);
  const [step, setStep] = useState(1);

  const onNext = () => {
    setStep((prevValue) => prevValue + 1);
  }

  const onBack = () => {
    setStep((prevValue) => prevValue - 1);
  }

  // console.log(registrationData);
  
  const value: RegistrationContextType = { onBack, onNext, step, registrationData, dispatch };

  return (
    <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>
  )
}

export default RegistrationProvider
