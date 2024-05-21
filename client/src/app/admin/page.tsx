"use client";

export default function AdminLogin() {
  return (
    <main className="w-full justify-center items-center h-screen">
      <div className="w-full md:w-[50%] m-auto h-full flex justify-center items-center">
        <ul>
          <li>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email"
              className="border-2 border-black p-2 my-2"
            />
          </li>
          <li>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="border-2 border-black p-2 my-2"
            />
          </li>
          <li className="flex justify-center items-center">
            <button className="border-2 border-black p-2 my-2">Login</button>
          </li>
        </ul>
      </div>
    </main>
  );
}
