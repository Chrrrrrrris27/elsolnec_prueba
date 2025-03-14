"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getUsers } from "src/lib/api";
import { getFilteredUsers } from "src/lib/utils/queryFilters";
import { User } from "src/lib/models/User";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { X } from "lucide-react";

export default function UsersList() {

  const [queryFilter, setQueryFilter] = useState<string>("");
  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);

  const { data: users, error, isLoading } = useFetchQuery(
    ["users"],
    getUsers,
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryFilter(e.target.value);
  }

  const handleCleanFilter = () => {
    setQueryFilter("");
  }

  useEffect(() => {
    if (queryFilter.length > 0 && users) {
      const filteredUsers = getFilteredUsers(queryFilter, users);
      setUsersFiltered(filteredUsers);
    } else {
      setUsersFiltered(users || []);
    }
  
    
  }, [queryFilter, users])
  

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;
  
  return (
    <section className="flex flex-col items-center">
      <div className="flex justify-end items-center gap-2 w-full">
        <Input
          name="filter"
          value={queryFilter}
          onChange={handleQueryChange}
          placeholder="Filtrar por..."
          className="w-1xl"
        />
        <Button
          onClick={handleCleanFilter}
          variant={"outline"}
        >
          Limpiar
          <X className="text-destructive"/>
        </Button>
      </div>
      <ul className="mt-5">
        {
          usersFiltered?.map(user => (
            <li
              key={user.id}
              // className="my-2 border-2 rounded-lg hover:bg-secondary hover:cursor-pointer"
            >
              <Link 
                href={`/users/${user.id}`}
                className="p-3 my-2 border-2 rounded-lg hover:bg-secondary hover:cursor-pointer block"
              >
                <span className="text-2xl font-bold">
                  {user.name}
                </span>
                <div className="text-s">
                  <span>
                    {user.username}
                  </span>
                  {" - "}
                  <span className="ml-1">
                    {user.email}
                  </span>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  );
}
