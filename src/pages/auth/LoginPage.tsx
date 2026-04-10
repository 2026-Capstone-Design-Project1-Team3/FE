import { LoginForm } from "@/shared/ui/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <main className="min-h-screen w-full bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
