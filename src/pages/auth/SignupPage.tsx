import { SignupForm } from "@/shared/ui/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <main className="min-h-screen w-full bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;
