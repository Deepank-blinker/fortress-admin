import FormField from '@/components/custom/form-field';
import FormWrapper from '@/components/custom/form-wrapper';
import Spinner from '@/components/custom/spinner';
import Typography from '@/components/custom/typography';
import { Button } from '@/components/ui/button';
import { CODE_RESEND_TIMEOUT } from '@/constants/form.constant';
import { ROUTES } from '@/constants/route';
import {
  loginTypeOtp,
  sendEmailOtp,
  sendEmailOtpPayload,
  sendMobileOtpNoAuth,
  sendMobileOtpNoAuthPayload,
} from '@/services/auth.api';
import { login } from '@/store/slices/auth.slice';
import { useAppDispatch } from '@/store/store';
import {
  getErrorMessage,
  getMaskedPhoneNumber,
  getVerificationCodeSubmitButtonText,
} from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';

interface VerificationCodeProps {
  handlePrevious: () => void;
}

const initialValues = { otp: '' };
const validationSchema = Yup.object().shape({
  otp: Yup.number().typeError('OTP must contain only numeric digits'),
});

const VerificationCode: React.FC<VerificationCodeProps> = ({
  handlePrevious,
}) => {
  const router = useRouter();
  const [displayNumber, setDisplayNumber] = useState('');
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const phoneNumber = searchParams.get('phoneNumber');
  const isAuthenticator = searchParams.get('isAuthenticator');
  const [timer, setTimer] = useState(CODE_RESEND_TIMEOUT); // Timer starts at 30 seconds
  const [canResend, setCanResend] = useState(false); // Tracks if resend is allowed
  const [resendAttempts, setResendAttempts] = useState(1); // Tracks resend attempts

  const dispatch = useAppDispatch();

  // get masked phone number
  useEffect(() => {
    if (phoneNumber) {
      setDisplayNumber(getMaskedPhoneNumber(phoneNumber));
    }
  }, [phoneNumber]);

  // resend timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true); // Enable resend when timer hits 0
    }
  }, [timer]);

  // login with otp
  const { mutate, isPending } = useMutation({
    mutationFn: loginTypeOtp,
    onSuccess: (_data) => {
      toast.success('Login successful!');
      router.push(ROUTES.WHITELISTED_IPS.path);
      dispatch(login(_data.data));
    },
    onError: (err: Error) => {
      toast.error(getErrorMessage(err));
    },
  });

  // code resend
  const { mutate: codeResendMutate, isPending: isCodeResendPending } =
    useMutation({
      mutationFn: async (
        payload: (sendMobileOtpNoAuthPayload | sendEmailOtpPayload) & {
          isPhone?: boolean;
        }
      ) => {
        const { isPhone, ...data } = payload;
        if (isPhone) {
          return sendMobileOtpNoAuth(data as sendMobileOtpNoAuthPayload); // Cast when `isPhone` is true
        }
        return sendEmailOtp(data as sendEmailOtpPayload); // Cast when `isPhone` is false
      },
      onSuccess: (_, _variable) => {
        const nextDelay = CODE_RESEND_TIMEOUT * (resendAttempts + 1);
        setResendAttempts((prev) => prev + 1);
        setTimer(nextDelay);
        setCanResend(false);
        if (_variable?.isPhone) {
          return toast.success('OTP sent to your phone number!');
        }
        toast.success('OTP sent to your email address!');
      },
      onError: (err: Error) => {
        toast.error(getErrorMessage(err));
      },
    });

  // handle from submit
  const handleSubmitForm = (otp: string) => {
    if (otp.length === 6) {
      if (!email) {
        toast.error('Email not found. Please enter email address again');
        handlePrevious();
        return;
      }
      return mutate({ otp, email: email });
    }
    if (!canResend) return;
    if (phoneNumber) {
      return codeResendMutate({ phone: `+${phoneNumber}`, isPhone: true });
    }
    if (email) {
      return codeResendMutate({ email });
    }
    toast.error('Technical error. Enter email and password again');
    handlePrevious();
  };

  const renderHeader = () => {
    const prefixMessage = 'Enter the 6-digit code';

    let content: React.ReactNode;

    if (isAuthenticator) {
      content = `${prefixMessage} from your authenticator app.`;
    } else if (phoneNumber) {
      content = (
        <>
          {prefixMessage} from your phone number{' '}
          <span className="whitespace-nowrap">{`+${displayNumber}`}</span>
        </>
      );
    } else {
      content = `${prefixMessage} from your email address ${email}`;
    }

    return (
      <Typography variant="h3" weight="bold">
        {content}
      </Typography>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmitForm(values.otp)}
    >
      {isPending ? (
        <Spinner />
      ) : (
        ({ values }) => (
          <Form className="w-full space-y-4">
            <FormWrapper
              headingText={renderHeader()}
              descriptionText={
                <>
                  {email && !phoneNumber && !isAuthenticator ? (
                    <>
                      Verify your email
                      <Typography
                        variant="base"
                        weight="bold"
                        as="span"
                        className="ml-0.5"
                      >
                        {email}.
                      </Typography>
                    </>
                  ) : (
                    ''
                  )}
                  This helps us keep your account secure by verifying that it’s
                  really
                </>
              }
              showContinueButton={false}
              handlePrevious={handlePrevious}
            >
              <FormField name="otp" label="Enter verification code" as="otp" />

              <Button
                type="submit"
                variant={values.otp.length === 6 ? 'default' : 'secondary'}
                className={`w-full h-10 ${values.otp.length === 6 ? 'hover:bg-primary-400' : 'hover:bg-neutral-60'}`}
                disabled={isPending || isCodeResendPending}
              >
                <Typography
                  variant="base"
                  weight="bold"
                  color="text-neutral-900"
                >
                  {getVerificationCodeSubmitButtonText({
                    otp: values.otp,
                    isPending,
                    canResend,
                    isCodeResendPending,
                    timer,
                  })}
                </Typography>
              </Button>
            </FormWrapper>
          </Form>
        )
      )}
    </Formik>
  );
};

export default VerificationCode;
