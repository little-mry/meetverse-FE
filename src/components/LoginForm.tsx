export default function LoginForm() {
  return (
    <form className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-black text-white py-2 font-semibold hover:bg-gray-800 transition"
      >
        Login
      </button>

      {/* Links */}
      <div className="flex flex-col items-center space-y-1 pt-2">
        <a href="/register" className="text-sm text-blue-600 hover:underline">
          Register Account
        </a>
      </div>
    </form>
  );
}
