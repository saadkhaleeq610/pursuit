import { Link } from "react-router-dom";

const VerifyEmail: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center px-4 py-8 gap-y-6  sm:flex-col sm:px-40 md:px-30 ld:px-20">
        <h1 className="text-2xl font-semibold text-pursuit-black">
          Great, now please verify your email
        </h1>
        <h2 className="pt-3 text-md font-normal text-pursuit-black">
          Once verified, you will be able to access hoksatd.zendesk.com and
          start your free trial.
        </h2>
        <p className="text-sm text-pursuit-black">
          Didn’t receive an email? Check your spam folder or{" "}
          <span className="underline">
            <Link to="/resendVerificationEmail">resend email.</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default VerifyEmail;
