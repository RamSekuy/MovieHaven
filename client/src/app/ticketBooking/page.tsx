// pages/index.tsx
import Head from 'next/head';
import SeatLayout from '../_components/seatComponent/SeatLayout';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Movie Ticket Booking</title>
      </Head>
      <main className="flex flex-col items-center">
        <h1 className="text-4xl text-gray-500 font-bold mb-8">Select Your Seat</h1>
        <SeatLayout />
      </main>
    </div>
  );
};

export default Home;
