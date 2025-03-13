"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "src/lib/api";
import { User } from "src/lib/models/User";

export default function UsersList() {
  const { data: users, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;

  return (
    <ul>
      {users?.map((user: User) => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}
