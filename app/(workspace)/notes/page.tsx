"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Nota = {
    id: string;
    titulo: string,
    contenido: string
};

export default function NotesPage() {
    const [notas, setNotas] =
      useState<Nota[]>([]);
    
    async function cargarNotas() {
        const token =
          localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5119/api/notas",
            {
                headers: {
                    Authorization:
                      `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            console.log(
                "Error cargando notas"
            );
            return;
        }

        const data =
          await response.json();

        setNotas(data);
    }

    useEffect(() => {
        cargarNotas();
    }, []);

    return (
        <div className="p-8">
            <h1 className="
              text-4xl
              font-bold
              mb-8
            ">
                Mis notas
            </h1>

            <div className="space-y-4">
                {notas.map(nota => (
                    <div
                      key={nota.id}
                      className="
                        bg-gray-900
                        rounded-xl
                        p-6
                      "
                    >
                        <h2 className="
                          text-cl
                          font-bold
                        ">
                            {nota.titulo}
                        </h2>
                        
                        <p className="mt-2">
                            {nota.contenido}
                        </p>
                    </div>
                ))}
            </div>

            <Link
              href="/notes/create"
              className="
                fixed
                bottom-8
                right-8
                w-16
                h-16
                rounded-full
                bg-purple-600
                hover:bg-purple-700
                text-white
                text-4xl
                flex
                items-center
                justify-center
                shadow-2xl
                transition
              "
            >
                +
            </Link>
        </div>
    );
} 