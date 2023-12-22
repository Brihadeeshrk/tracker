import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface EditIssueButtonProps {
  id: number;
}

const EditIssueButton: React.FC<EditIssueButtonProps> = ({ id }) => {
  return (
    <Box>
      <Button>
        <Pencil2Icon />
        <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
      </Button>
    </Box>
  );
};
export default EditIssueButton;
