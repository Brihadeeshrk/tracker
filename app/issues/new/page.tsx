"use client";

import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import SimpleMde from "react-simplemde-editor";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage: React.FC = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
      className="max-w-xl space-y-7"
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      {/* you can't use {...register("title")} for the simpleMDE as it doesn't allow any extra props, so we need to use the Controller from React Hook Form */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMde placeholder="Description" {...field} />
        )}
      ></Controller>

      <Button>Submit issue</Button>
    </form>
  );
};
export default NewIssuePage;
