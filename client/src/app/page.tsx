import Image from "next/image";
import SeatLayout from "./_components/SeatLayout";
export default function Home() {
  return (
    <main className="w-full">
      <section id="hero" className="w-full flex justify-center">
        <SeatLayout />
      </section>
    </main>
  );
}
