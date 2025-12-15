import { ResetPasswordForm } from "./components/reset-password-form";

interface ResetPasswordProps {
  params: Promise<{ token: string }>;
}

const ResetPassword = async (props: ResetPasswordProps) => {
  const { token } = await props.params;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPassword;
