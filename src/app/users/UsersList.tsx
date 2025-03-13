"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getUsers } from "src/lib/api";
import { getFilteredUsers } from "src/lib/utils/queryFilters";
import { User } from "src/lib/models/User";
import { Input } from "src/components/ui/input";

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
    <div>
      <div>
        <Input
          name="filter"
          value={queryFilter}
          onChange={handleQueryChange}
          placeholder="Filtrar por..."
        />
        <button
          onClick={handleCleanFilter}
        >
          <span>Limpiar</span>
        </button>
      </div>
      <ul>
        {
          usersFiltered?.map(user => (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>
                {user.name} - {user.email}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
