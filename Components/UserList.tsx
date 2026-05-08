type Usuario = {
    id: string;
    nombre: string;
};

type Props = {
    usuarios: Usuario[];
};

export default function UserList({
    usuarios,
}: Props) {
    if (usuarios.length === 0) {
        return <p>No hay usuarios</p>;
    }

    return (
        <ul className="space-y-2">
            {usuarios.map((usuario) => (
                <li
                  key={usuario.id}
                  className="border p-4 rounded"
                >
                  {usuario.nombre}
                </li>
            ))}
        </ul>
    );
}