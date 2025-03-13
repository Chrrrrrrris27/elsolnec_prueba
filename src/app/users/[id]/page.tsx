"use client"
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { use, useEffect, useState } from 'react';
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getUsers } from "src/lib/api";
import { User } from "src/lib/models/User";

interface Params {
  id: string
}

export default function UserPage({ params }: { params: Promise<Params>}) {

  const { id } = use(params);
  const queryClient = useQueryClient();

  const { data: users, error, isLoading } = useFetchQuery<User[]>(
    ["users"],
    getUsers,
    {
      initialData: queryClient.getQueryData(["users"])
    }
  );

  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (users) {
      setUser(users.find(user => user.id.toString() === id));
    }
  
  }, [users, id])
  

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;

  return (
    <div>
      {
        user ?
        <h1>{user?.name}</h1>
        :
        <p>No se encontró el usuario</p>
      }

      <Link href={"/users"}>
        Ir a lista de usuarios
      </Link>
    </div>
  );
}