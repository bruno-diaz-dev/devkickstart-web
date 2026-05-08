import LoginForm from "@/Components/LoginForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-blue-800 p-10 rounded-xl shadow w-full max-w-md">
                <h1 className="text-4xl font-bold text-white mb-4">
                    DevKickstart
                </h1>

                <p className="text-gray-100 mb-6">
                    Inicia sesion para continuar.
                </p>

                <LoginForm />
            </div>
        </main>
    )
}