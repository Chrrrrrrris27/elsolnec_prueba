"use client"
import { useQueryClient } from "@tanstack/react-query";
import { Building2, CircleUser, Globe, Mail, MapPin, Phone } from "lucide-react";
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
        <section>
          <h1
            className="text-5xl font-bold"
          >
            {user.name}
          </h1>
          <div className="flex justify-between mt-5">
            <div>
              <h2 className="flex items-center gap-1.5 text-2xl font-medium">
                <Building2 className="text-primary"/>
                {user.company.name}
              </h2>
              <div className="pl-7.5">
                <p>{user.company.catchPhrase}</p>
                <p className="font-light">{user.company.bs}</p>
              </div>
            </div>
            <div>
              <h3
                className="flex items-center gap-1.5 text-2xl"
              >
                <CircleUser className="text-primary"/>
                {user.username}
              </h3>
              <h3
                className="flex items-center gap-1.5 text-2xl"
              >
                <Mail className="text-primary"/>
                {user.email}
              </h3>
              <h3
                className="flex items-center gap-1.5 text-2xl"
              >
                <Phone className="text-primary"/>
                {user.phone}
              </h3>
              <h3
                className="flex items-center gap-1.5 text-2xl"
              >
                <Globe className="text-primary"/>
                {user.website}
              </h3>
              <h3
                className="flex items-center gap-1.5 text-2xl"
              >
                <MapPin className="text-primary" />
                <span>
                  {`${user.address.city}, `}
                  <span className="font-normal text-sm">{user.address.street} {user.address.suite}</span>
                </span>
              </h3>
            </div>
          </div>
        </section>
        :
        <p>No se encontró el usuario</p>
      }

      <Link
        href={"/users"}
        className="border-2 rounded-lg p-2 bg-primary-foreground border-primary text-primary inline-block mt-10 hover:bg-primary hover:text-primary-foreground"
      >
        Lista de usuarios
      </Link>
    </div>
  );
}