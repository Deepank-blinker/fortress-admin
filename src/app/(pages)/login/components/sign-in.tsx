import FormField from '@/components/custom/form-field';
import FormWrapper from '@/components/custom/form-wrapper';
import Spinner from '@/components/custom/spinner';
import { LOGIN_TYPE_PASSWORD_CODE_RESEND_MODE } from '@/constants/interface.constant';
import {
  loginTypePassword,
  loginTypePasswordResponseData,
} from '@/services/auth.api';
import { getErrorMessage } from '@/utils';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import * as Yup from 'yup';
interface SigninProps {
  handleNext: (query?: string) => void;
  handlePrevious: () => void;
}

interface InitialValues {
  email: string;
  password: string;
}

const Signin: React.FC<SigninProps> = ({ handleNext, handlePrevious }) => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const initialValues: InitialValues = {
    email: email as string,
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Enter password'),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginTypePassword,
    onSuccess: (response) => {
      const responseData = response?.data as loginTypePasswordResponseData;
      switch (responseData.sentTo) {
        case LOGIN_TYPE_PASSWORD_CODE_RESEND_MODE.PHONE_NUMBER:
          toast.success('OTP sent to your registered phone number!');
          handleNext(`&phoneNumber=${responseData.phoneNumber}&email=${email}`);
          return;
        case LOGIN_TYPE_PASSWORD_CODE_RESEND_MODE.EMAIL:
          toast.success('OTP sent to your registered email address!');
          handleNext(`&email=${email}`);
          return;
        case LOGIN_TYPE_PASSWORD_CODE_RESEND_MODE.AUTHENTICATOR:
          toast.success('Please check your authenticator app for OTP!');
          handleNext(`&isAuthenticator=true&email=${email}`);
          return;
        default:
          toast.error('Something went wrong!');
          return;
      }
    },
    onError: (err: Error) => {
      toast.error(getErrorMessage(err));
    },
  });

  const handleSubmit = (password: string) => {
    if (!email) {
      toast.error('Email not found');
      handlePrevious();
      return;
    }
    mutate({ email: email, password: password });
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values.password)}
    >
      {isPending ? (
        <Spinner />
      ) : (
        ({}) => (
          <Form className="w-full space-y-4">
            <FormWrapper
              headingText="Welcome back"
              descriptionText=""
              continueButtonType="submit"
              continueButtonText={isPending ? 'Verifying...' : 'Continue'}
              handlePrevious={handlePrevious}
              disableContinueButton={isPending}
            >
              <FormField
                name="email"
                label=""
                placeholder="Enter your email"
                disabled={true}
                iconDirection="left"
                icon={<UserCircleIcon className="w-4 h-4 text-neutral-100" />}
              />

              <FormField
                name="password"
                label="Password"
                placeholder="Password"
                as="password"
              />
            </FormWrapper>
          </Form>
        )
      )}
    </Formik>
  );
};

export default Signin;
