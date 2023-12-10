"use client";

import { Button, Callout, Link, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import SimpleMde from "react-simplemde-editor";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CiCircleInfo } from "react-icons/ci";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage: React.FC = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error: any) {
      console.log("Error encountered", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-xl space-y-7">
      {error && (
        <Callout.Root color="red" className="">
          <Callout.Icon>
            <CiCircleInfo />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-7">
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

        <Button variant="soft">Submit issue</Button>
      </form>
    </div>
  );
};
export default NewIssuePage;
