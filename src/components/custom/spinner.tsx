interface SpinnerProps {
  bgColor?: string;
  hScreen?: boolean;
  containerHeight?: string;
  loaderStyle?: string;
}
function Spinner({
  bgColor = 'bg-neutral-0',
  hScreen = false,
  containerHeight,
  loaderStyle = '',
}: SpinnerProps) {
  return (
    <div
      className={`w-full flex justify-center items-center ${hScreen ? 'h-screen' : containerHeight ? containerHeight : 'h-full '} ${bgColor}`}
    >
      <div
        className={`w-10  h-10 rounded-full  border-4 border-primary-200 border-r-transparent animate-spin ${loaderStyle}`}
        style={{
          animation: `spin-loader 1.8s linear infinite`,
        }}
      ></div>
    </div>
  );
}

export const OnboardingSpinner = () => (
  <Spinner bgColor="bg-neutral-10" hScreen />
);

export default Spinner;
