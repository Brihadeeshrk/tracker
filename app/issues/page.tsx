import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

type pageProps = {};

const IssuesPage: React.FC<pageProps> = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};
export default IssuesPage;
