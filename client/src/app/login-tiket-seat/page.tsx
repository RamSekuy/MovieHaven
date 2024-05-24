import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Cinema Ticketing</h1>
      <div className="space-x-4">
        <Link href="/login" legacyBehavior>
          <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            Login
          </a>
        </Link>
        <Link href="/register" legacyBehavior>
          <a className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
            Register
          </a>
        </Link>
        <Link href="/ticketBooking" legacyBehavior>
          <a className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
            Select your seat
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
