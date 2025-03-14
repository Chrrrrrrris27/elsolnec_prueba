import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { PostComment } from "src/lib/models/PostComment";
import { Textarea } from "../ui/textarea";
import DialogSuccess from "../dialogs/DialogSuccess";
import { useState } from "react";

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

  const [openModal, setOpenModal] = useState<boolean>(false);

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

    setOpenModal(true);
  }

  return (
    <div className="w-full md:w-2/3 lg:w-1/2  my-10">
      <h4>Agregar comentario</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-3"
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
                  {/* <Input placeholder="Comentario" {...field}/> */}
                  <Textarea
                    {...field}
                    placeholder="Comentario"
                  />
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
      <DialogSuccess
        message="Comentario agregado!"
        isOpen={openModal}
        setIsOpen={setOpenModal}
      />
    </div>
  );
}