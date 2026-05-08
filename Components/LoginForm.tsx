"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const [token, setToken] = useState("");

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
        }),
      }
    );

    const data = await response.json();

    setToken(data.token);

    localStorage.setItem(
      "token",
      data.token
    );
    router.push("/dashboard");
  }

  return (
    <div className="mb-10">

      <form
        onSubmit={handleSubmit}
        className="mb-4"
      >

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="border border-gray-300 p-2 mr-2 rounded w-64"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition  text-white px-4 py-2 rounded"
        >
          Login
        </button>

      </form>

      {token && (
        <div>
          <p className="font-bold mb-2">
            Token:
          </p>

          <p className="break-all text-sm">
            {token}
          </p>
        </div>
      )}

    </div>
  );
}