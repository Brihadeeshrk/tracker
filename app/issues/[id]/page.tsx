import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface IssueDetailProps {
  params: { id: string };
}

const IssueDetail: React.FC<IssueDetailProps> = async ({ params }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  //   if (typeof params.id !== "number") notFound();

  if (!issue) {
    notFound();
  }

  return (
    <Grid gap="5" columns={{ initial: "1", md: "2" }} className="flex-col">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" align="center">
          <StatusBadge type={issue.status} />
          <Text>Created at: {issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card mt="3" className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>

      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};
export default IssueDetail;
