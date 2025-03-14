import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "src/components/ui/card";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getUsers } from "src/lib/api";
import { User } from "src/lib/models/User";

export default function PostCard({title, userId, postId}: {
  title: string,
  userId: number
  postId: number
}) {

  const [user, setUser] = useState<User>();

  const queryClient = useQueryClient();

  const { data: users } = useFetchQuery<User[]>(
    ["users"],
    getUsers,
    {
      initialData: queryClient.getQueryData(["users"])
    }
  );

  useEffect(() => {
    if (users) {
      const findedUser = users.find(user => user.id === userId);
      setUser(findedUser);
    }
  
  }, [users, userId])

  return (
    <Card className="h-full">
      <CardHeader className="h-12">
        <CardTitle className="capitalize line-clamp-3">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-end">
          {
            user && user.name
          }
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link 
          href={`/posts/${postId}`}
          className="hover:underline hover:text-primary"
        >
          Ver más
        </Link>
      </CardFooter>
    </Card>
  );
}