import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import delay from "delay";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import StatusBadge from "@/app/components/StatusBadge";
import ReactMarkdown from "react-markdown";

interface IssueDetailProps {
  params: { id: string };
}

const IssueDetail: React.FC<IssueDetailProps> = async ({ params }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  //   if (typeof params.id !== "number") notFound();
  await delay(2000);

  if (!issue) {
    notFound();
  }

  return (
    <div className="flex-col">
      <Heading>{issue.title}</Heading>
      <Flex gap="3" align="center">
        <StatusBadge type={issue.status} />
        <Text>Created at: {issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt="3" className="prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};
export default IssueDetail;
