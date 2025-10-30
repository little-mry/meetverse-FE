import LoginForm from "../components/LoginForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[rgb(24,25,39)] px-10 pt-0">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <img src="/logo.png" alt="Meetverse Logo" className="w-[clamp(30rem,32vw,32rem)]" />
      </div>

      {/* Card / Form */}
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-8 min-h-[400px] flex flex-col justify-between">
  <LoginForm />
</div>

    </div>
  );
}
