"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getUsers } from "src/lib/api";

export default function UsersList() {
  const { data: users, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 10
  });

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
