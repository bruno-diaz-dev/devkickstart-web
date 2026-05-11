"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginForm() {
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
      "http://localhost:5119/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (!response.ok) {
      alert("Usuario o password incorrectos.");
      return;
    }

    const data = await response.json();

    localStorage.setItem(
      "token",
      data.token
    );

    router.push("/dashboard");
  }

  return (
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
          bg-gray-900
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
            bg-gray-900
            text-white
            p-3
            rounded-lg
            w-full
            "
          />

          <button
            type="submit"
            className="
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-4
              py-3
              rounded-lg
              transition
              w-full
              "
            >
              Login
            </button>
    </form>
  );
}