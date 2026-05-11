import LoginForm from "@/Components/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="bg-gray-800 p-10 rounded-xl shadow w-full max-w-md">
                <h1 className="text-4xl font-bold text-white mb-4">
                    DevKickstart
                </h1>

                <p className="text-gray-100 mb-6">
                    Inicia sesion para continuar.
                </p>

                <LoginForm />

                <p className="text-gray-400 mt-4 text-center">
                    Don&apos;t have an account?{" "}

                    <a
                      href="/register"
                      className="text-blue-400 hover:text-blue-300"
                    >
                        Create one
                    </a>
                </p>
            </div>
        </main>
    )
}