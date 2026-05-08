import Sidebar from "@/Components/Sidebar";

export default function WorkspaceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="
          min-h-screen
          bg-gray-950
          flex
        ">
            <Sidebar />

            <section className="flex-1 p-8">
                {children}
            </section>
        </main>
    );
}