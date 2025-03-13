"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getUsers } from "src/lib/api";
import { getFilteredUsers } from "src/lib/utils/getFilteredUsers";
import { User } from "src/lib/models/User";

export default function UsersList() {

  const [queryFilter, setQueryFilter] = useState<string>("");
  const [usersFiltered, setUsersFiltered] = useState<User[]>([]);

  const { data: users, error, isLoading } = useFetchQuery(
    ["users"],
    getUsers,
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    setQueryFilter(query);
    if (query.length === 0) {
      setUsersFiltered(users || []);
      return;
    }
    if (users) {
      const filteredUsers = getFilteredUsers(query, users);
      setUsersFiltered(filteredUsers);
    }
  }

  useEffect(() => {
    if (users) {
      setUsersFiltered(users);
    }
    
  }, [users]);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;
  
  return (
    <div>
      <div>
        <input
          name="filter"
          value={queryFilter}
          onChange={handleQueryChange}
        />
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
