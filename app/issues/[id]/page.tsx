import prisma from "@/prisma/client";
import { Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface IssueDetailProps {
  params: { id: string };
}

const IssueDetailPage: React.FC<IssueDetailProps> = async ({ params }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid gap="5" columns={{ initial: "1", md: "2" }} className="flex-col">
      <IssueDetails issue={issue} />
      <EditIssueButton id={issue.id} />
    </Grid>
  );
};
export default IssueDetailPage;
