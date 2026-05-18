"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNotePage() {

    const router = useRouter();

    const [titulo,setTitulo] =
        useState("");

    const [contenido,setContenido] = 
        useState("");

    async function crearNota() {

        const token =
          localStorage.getItem("token");

        const response =
          await fetch(
            "http://localhost:5119/api/notas",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json",

                    Authorization:
                        `Bearer ${token}`
                },
                body:JSON.stringify({
                    titulo,
                    contenido
                })
            }
          );
        if (!response.ok) {
            alert(
                "Error creando nota"
            );
            return;
        }

        router.push("/notes");
    }

    return(
        <main className="
          min-h-screen
          p-10
        ">
            <h1 className="
              text-4xl
              font-bold
              mb-8
            ">
                Nueva nota
            </h1>

            <input
                placeholder="Titulo"

                value={titulo}

                onChange={(e)=>
                    setTitulo(
                        e.target.value
                    )
                }

                className="
                  w-full
                  p-4
                  rounded-lg
                  bg-gray-900
                  mb-4
                "
            />

            <textarea
                placeholder="Escribe..."

                value={contenido}

                onChange={(e)=>
                    setContenido(
                        e.target.value
                    )
                }

                className="
                  w-full
                  p-4
                  rounded-lg
                  bg-gray-900
                "
            />

            <button
                onClick={crearNota}

                className="
                    mt-6
                    bg-purple-600
                    hover:bg-purple-700
                    transition
                    pc-6
                    py-3
                    rounded-lg
                "
            >
                Save
            </button>
        </main>
    );
}