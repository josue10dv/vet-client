
import type { JSX } from "react";
import UserList from "../components/userList";

export default function UserPage(): JSX.Element {
    return (
        <section className="flex flex-col md:flex-row gap-4 w-full">
            {/* Lista de Usuarios */}
            <UserList list={[
                {
                    id: 'a',
                    name: "John Doe",
                    email: "ejemplo@ejemplo.com",
                    isActive: true,
                    type: "admin",
                    username: "johndoe",
                    createdAt: '2023-10-01'
                }
            ]} />
            {/* Lista de Usuarios */}
            <UserList list={[
                {
                    id: 'a',
                    name: "John Doe",
                    email: "ejemplo@ejemplo.com",
                    isActive: true,
                    type: "admin",
                    username: "johndoe",
                    createdAt: '2023-10-01'
                }
            ]} />
        </section>
    );
}