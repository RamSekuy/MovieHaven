import { ReactNode } from "react";
import { Suspense } from "react";

type Props = {
  movieStatus: string;
  children: ReactNode;
};
export default function ListMovie({ movieStatus, children }: Props) {
  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="container mx-auto flex justify-center flex-col max-w-[800px] p-4">
        <h2 className="text-2xl font-semibold mb-4">{movieStatus}</h2>
        <div className="flex flex-wrap justify-center mx-2">
          <Suspense fallback={<div className="spinner"></div>}>
            {children}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
