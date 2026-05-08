"use client";

import { useState } from "react";

type Props = {
    onUserCreated: () => Promise<void>;
};
export default function CreateUserForm({ onUserCreated }: Props) {
    const [nombre, setNombre] = useState("");

    async function handleSubmit(
        event: React.FormEvent
    ) {
        event.preventDefault();

        await fetch("http://localhost:5119/api/usuarios", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre,
             }),
        });

        await onUserCreated();

        setNombre("");
    }

    return (
        <form
          onSubmit={handleSubmit}
          className="mb-6"
        >
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 mr-2 rounded"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Crear usuario
          </button>
        </form>
    )
}