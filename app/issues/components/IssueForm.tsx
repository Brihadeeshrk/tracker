"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Select, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { z } from "zod";
import dynamic from "next/dynamic";
import { Issue, Status } from "@prisma/client";

const SimpleMde = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

/**
 * In the previous implementation where we had an interface called IssueFormData with 2 fields,
 * any change to the form, would have to be made in 2 separate files, one over here and one in validationSchemas.ts
 * to get rid of this redundancy, we can derive this IssueFormData type FROM that zod Schema using the z.infer<> methdod
 */

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm: React.FC<Props> = ({ issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(`${issue?.status}`);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const options: Array<Status> = ["CLOSED", "IN_PROGRESS", "OPEN"];

  const onSubmit = async (data: IssueFormData) => {
    setLoading(true);
    try {
      if (issue) {
        data.status = selectedStatus;
        await axios.patch(`/api/issues/${issue.id}`, data);
        setLoading(false);
        return;
      }
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
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && <ErrorMessage message={errors.title.message} />}
        {/* you can't use {...register("title")} for the simpleMDE as it doesn't allow any extra props, so we need to use the Controller from React Hook Form */}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMde placeholder="Description" {...field} />
          )}
        ></Controller>
        {errors.description && (
          <ErrorMessage message={errors.description.message} />
        )}

        {issue && (
          <div className="flex items-center gap-6">
            <Text>Update Status:</Text>
            <Select.Root
              defaultValue={selectedStatus}
              onValueChange={(e) => setSelectedStatus(e)}
            >
              <Select.Trigger variant="soft" radius="full" />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Status</Select.Label>
                  {options.map((status, index) => (
                    <Select.Item key={index} value={status}>
                      {status}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
        )}

        {issue ? (
          <Button disabled={loading} variant="soft">
            {loading ? <LoadingSpinner /> : "Update issue"}
          </Button>
        ) : (
          <Button disabled={loading} variant="soft">
            {loading ? <LoadingSpinner /> : "Submit issue"}
          </Button>
        )}
      </form>
    </div>
  );
};
export default IssueForm;
