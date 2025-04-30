import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FormField from '@/components/custom/form-field';
import FormWrapper from '@/components/custom/form-wrapper';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface WelcomeBackProps {
  handleNext: (query?: string) => void;
}

const WelcomeBack: React.FC<WelcomeBackProps> = ({ handleNext }) => {

  const initialValues = {
    email: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .transform((value) => value.trim())
      .email('Invalid email')
      .required('Email is required'),
  });
  // check return type

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleNext(`&email=${values.email}`)}
    >
      {({}) => (
        <Form className="w-full space-y-4">
          <FormWrapper
            headingText="Welcome back"
            descriptionText="Sign-in to your Fortuna Account"
            continueButtonType="submit"
          >
            <FormField
              name="email"
              label="Email"
              placeholder="Enter your email"
              iconDirection="left"
              icon={<UserCircleIcon className="w-4 h-4 text-neutral-100" />}
            />
          </FormWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default WelcomeBack;
