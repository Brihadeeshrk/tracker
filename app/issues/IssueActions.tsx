import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions: React.FC = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">Create new issue</Link>
      </Button>
    </div>
  );
};
export default IssueActions;
