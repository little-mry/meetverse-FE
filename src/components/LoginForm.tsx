import { useState, type FormEvent } from 'react';
import { loginUser } from '../features/auth/api/authApi';

export default function LoginForm({
  buttonName,
  linkName,
}: {
  buttonName: string;
  linkName: string;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser({ username, password });
      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);
      window.location.href = '/profile';
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form className="flex flex-col space-y-4 text-amber-800" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-1">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="YourUsername"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-black text-white py-2 font-semibold hover:bg-gray-800 transition disabled:bg-gray-500"
      >
        {isLoading ? 'Logging in...' : buttonName}
      </button>

      <div className="flex flex-col items-center space-y-1 pt-2">
        <a href="/register" className="text-sm text-blue-600 hover:underline">
          {linkName}
        </a>
      </div>
    </form>
  );
}
