import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { PostComment } from "src/lib/models/PostComment";

const formSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  email: z.string().email("Formato de email no válido"),
  comment: z.string()
});

type FormData = {
  name: string;
  email: string;
  comment: string;
};

export default function CommentForm({ postId }: { postId: string }) {

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    }
  })

  const queryClient = useQueryClient();

  const onSubmit = (data: FormData) => {
    const currentComments = queryClient.getQueryData<PostComment[]>(["posts", postId, "comments"]) || [];
    const sortComments = currentComments?.sort((a, b) => a.id - b.id);
    const newComment = {
      postId: parseInt(postId),
      id: sortComments ? sortComments[sortComments.length - 1].id + 1 : 1,
      name: data.name,
      email: data.email,
      body: data.comment
    } as PostComment;
    
    const newComments = [...sortComments, newComment];

    queryClient.setQueryData<PostComment[]>(["posts", postId, "comments"], () => {
      return newComments;
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        {/* Comment name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nombre del comentario" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        {/* Comment body */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Comentario" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        {/* Submit */}

        <Button
          type="submit"
        >
          Publicar
        </Button>
      </form>
    </Form>
  );
}