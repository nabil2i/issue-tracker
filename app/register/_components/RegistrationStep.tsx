
import useRegistrationContext from '../hooks/useRegistrationContext';
import DetailsForm from './DetailsForm';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';

const RegistrationStep = () => {
  const {step} = useRegistrationContext();

  switch(step) {
    case 1:
      return <EmailForm />;
    case 2:
      return <DetailsForm />;
    case 3:
      return <PasswordForm />;
    default:
      return null;
  }
}

export default RegistrationStep
