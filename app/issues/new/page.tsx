"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import SimpleMde from "react-simplemde-editor";
import { z } from "zod";

/**
 * In the previous implementation where we had an interface called IssueForm with 2 fields,
 * any change to the form, would have to be made in 2 separate files, one over here and one in validationSchemas.ts
 * to get rid of this redundancy, we can derive this IssueForm type FROM that zod Schema using the z.infer<> methdod
 */

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: IssueForm) => {
    setLoading(true);
    try {
      await axios.post("/api/issues", data);
      setLoading(false);

      router.push("/issues");
    } catch (error: any) {
      setLoading(false);
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
        {errors.title && <ErrorMessage message={errors.title.message} />}
        {/* you can't use {...register("title")} for the simpleMDE as it doesn't allow any extra props, so we need to use the Controller from React Hook Form */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMde placeholder="Description" {...field} />
          )}
        ></Controller>
        {errors.description && (
          <ErrorMessage message={errors.description.message} />
        )}

        <Button disabled={loading} variant="soft">
          {loading ? <LoadingSpinner /> : "Submit issue"}
        </Button>
      </form>
    </div>
  );
};
export default NewIssuePage;
