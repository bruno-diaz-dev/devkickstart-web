"use client";

import { useEffect, useState } from "react";

import CreateUserForm from "@/Components/CreateUserForm";
import UserList from "@/Components/UserList";
import LoginForm from "@/Components/LoginForm";
import { useRouter } from "next/navigation";

type Usuario = {
  id: string;
  nombre: string;
};

export default function HomePage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const router = useRouter();
  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  async function cargarUsuarios() {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "http://localhost:5119/api/usuarios",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setUsuarios(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 p-8">
      <div className="bg-gray-900 rounded-2xl shadow p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            DevKickstart
          </h1>
          <p className="text-white mt-2">
            Bienvenido a DevKickstart, tu plataforma de desarrollo rápido.
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow p-6 mb-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Crear usuario
        </h2>

        <CreateUserForm
          onUserCreated={cargarUsuarios}
        />
      </div>
      <div className="bg-gray-900 rounded-2xl shadow p-6">

        <h2 className="text-2xl font-semibold text-white mb-4">
          Usuarios
        </h2>

        <UserList
          usuarios={usuarios}
        />
      </div>
    </main>
  );
}