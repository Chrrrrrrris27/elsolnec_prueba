"use client";

import Link from "next/link";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getUsers } from "src/lib/api";

export default function UsersList() {
  const { data: users, error, isLoading } = useFetchQuery(
    ["users"],
    getUsers,
  );

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;

  return (
    <ul>
      {
        users?.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              {user.name} - {user.email}
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
