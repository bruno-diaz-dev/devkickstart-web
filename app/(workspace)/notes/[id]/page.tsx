"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditNotePage() {
    const params = useParams();
    const router = useRouter();

    const id = params.id as string;

    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");

    useEffect(()=> {
        const cargarNota= async () => {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5119/api/Notas`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                alert("Error cargando nota.");
                return;
            }

            const notas = await response.json();

            const nota = notas.find(
                (n: any) => n.id === id
            );

            if (!nota) {
                alert("Nota no encontrada");
                return;
            }

            setTitulo(nota.titulo);
            setContenido(nota.contenido);
        };

        cargarNota();
    }, [id]);

    const actualizarNota = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5119/api/Notas/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({
                    titulo,
                    contenido,
                }),
            }
        );

        if (!response.ok) {
            alert("Error actualizando nota.")
            return;
        }

        router.push("/notes");
    };

    return (
        <div className="p=10 text-white">
            <h1 className="text-4xl font-bold mb-8">
                Editar nota
            </h1>

            <div className="flex flex-col gap-4">
                <input
                    value={titulo}
                    onChange={(e) =>
                        setTitulo(e.target.value)
                    }
                    placeholder="Titulo"
                    className="bg-[#111827] p-4 rounded-lg"
                />

                <textarea
                    value={contenido}
                    onChange={(e) =>
                        setContenido(e.target.value)
                    } 
                    placeholder="Contenido"
                    className="bg-[#111827] p-4 rounded-lg h-64"
                />

                <button
                    onClick={actualizarNota}
                    className="bg-purple-600 px-6 py-3 rounded-lg w-fit"
                >
                    Guardar cambios
                </button>
            </div>
        </div>
    );
}