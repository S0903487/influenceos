import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">InfluenceOS</h1>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow">
          <LoginForm />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Forgot your password?{' '}
            <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Reset it here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
