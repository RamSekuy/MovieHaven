"use client";
import Link from "next/link";
import BackEndForm from "./backEndForm";

const LoginForm: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <BackEndForm
          action="/user/v2"
          method="post"
          onSuccess={(response) => {
            console.log(response);
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded mt-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </BackEndForm>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link href="/register" legacyBehavior>
              <a className="text-blue-500">Register</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
