"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

  }, []);

  return (
    <div>

      <div className="
        bg-gray-900
        rounded-2xl
        shadow
        p-6
        mb-6
        flex
        justify-between
        items-center
      ">

        <div>

          <h1 className="
            text-4xl
            font-bold
            text-white
          ">
            Dashboard
          </h1>

          <p className="
            text-gray-400
            mt-2
          ">
            Bienvenido a DevKickstart
          </p>

        </div>

        <button
          onClick={logout}
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4
            py-2
            rounded-lg
            transition
          "
        >
          Logout
        </button>

      </div>

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      ">

        <div className="
          bg-gray-900
          rounded-2xl
          p-6
        ">

          <h2 className="
            text-2xl
            font-semibold
            text-white
            mb-4
          ">
            Welcome back 👋
          </h2>

          <p className="text-gray-400">
            Tu workspace técnico personal.
          </p>

        </div>

        <div className="
          bg-gray-900
          rounded-2xl
          p-6
        ">

          <h2 className="
            text-2xl
            font-semibold
            text-white
            mb-4
          ">
            Quick Actions
          </h2>

          <div className="flex gap-4">

            <button className="
              bg-blue-500
              hover:bg-blue-600
              px-4
              py-2
              rounded-lg
              text-white
              transition
            ">
              New Note
            </button>

            <button className="
              bg-purple-500
              hover:bg-purple-600
              px-4
              py-2
              rounded-lg
              text-white
              transition
            ">
              New Snippet
            </button>

          </div>

        </div>

        <div className="
          bg-gray-900
          rounded-2xl
          p-6
        ">

          <h2 className="
            text-2xl
            font-semibold
            text-white
            mb-4
          ">
            Recent Notes
          </h2>

          <p className="text-gray-400">
            Aún no tienes notas.
          </p>

        </div>

        <div className="
          bg-gray-900
          rounded-2xl
          p-6
        ">

          <h2 className="
            text-2xl
            font-semibold
            text-white
            mb-4
          ">
            Workspace Stats
          </h2>

          <p className="text-gray-400">
            0 notas creadas.
          </p>

        </div>

      </div>

    </div>
  );
}