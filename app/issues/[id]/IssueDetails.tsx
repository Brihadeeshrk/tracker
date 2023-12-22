import StatusBadge from "@/app/components/StatusBadge";
import { Issue } from "@prisma/client";
import { Box, Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

interface IssueDetailsProps {
  issue: Issue;
}

const IssueDetails: React.FC<IssueDetailsProps> = ({ issue }) => {
  return (
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
  );
};
export default IssueDetails;
