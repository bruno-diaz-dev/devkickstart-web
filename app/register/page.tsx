"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const [username, setUsername] =
       useState("");

    const [password, setPassword] =
       useState("");

    async function handleSubmit(
        event: React.FormEvent
    ) {
        event.preventDefault();

        const response = await fetch(
            "http://localhost:5119/api/auth/register",
            {
                method: "POST",

                headers:{
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    nombre: username,
                    password,
                }),
            }
        );

        if (!response.ok) {
            alert("No se pudo crear usuario.");
            return;
        }

        alert("Usuario creado correctamente.");

        router.push("/login");
    }

    return (
        <main className="
          min-h-screen
          bg-gray-950
          flex
          items-center
          justify-center
          p-8
          "
        >
        <div className="
          bg-gray-900
          p=8
          rounded-2xl
          shadow
          w-full
          max-w-md
        ">
        <h1 className="
          text-4xl
          font-bold
          text-white
          mb-6
        ">
            Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="
                border
                border-gray-700
                bg-gray-950
                text-white
                p-3
                rounded-lg
                w-full
              "
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
              border
              border-gray-700
              bg-gray-950
              text-white
              p-3
              rounded-lg
              w-full
              "
            />
            <button
              type="submit"
              className="
                bg-purple-500
                hover:bg-purple-600
                text-white
                px-4
                py-3
                rounded-lg
                transition
                w-full
              "
            >
                Create Account
            </button>
        </form>
        </div>

        </main>
    );
}