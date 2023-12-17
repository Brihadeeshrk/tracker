import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import cn from "classnames";
import React from "react";
import StatusBadge from "../components/StatusBadge";
import IssueActions from "./IssueActions";
import Link from "next/link";

type pageProps = {};

const IssuesPage: React.FC<pageProps> = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div className="space-y-7">
      <IssueActions />
      <Table.Root className="max-w-full" variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell className="flex items-center">
                <Link href={`/issues/${issue.id}`} className="hover:underline">
                  {issue.title}
                  <div
                    className={cn({
                      "block font-semibold md:hidden ml-3": true,
                    })}
                  >
                    <StatusBadge type={issue.status} />
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell
                className={cn({
                  "hidden font-semibold md:table-cell": true,
                })}
              >
                <StatusBadge type={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export default IssuesPage;
