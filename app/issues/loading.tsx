import { Table } from "@radix-ui/themes";
import cn from "classnames";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssueActions from "./IssueActions";

type LoadingProps = {};

const Loading: React.FC<LoadingProps> = () => {
  const issues = [1, 2, 3, 4, 5];
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
          {issues.map((issue, index) => (
            <Table.Row key={index}>
              <Table.Cell className="flex items-center">
                <Skeleton />
              </Table.Cell>

              <Table.Cell
                className={cn({
                  "hidden font-semibold md:table-cell": true,
                })}
              >
                <Skeleton />
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export default Loading;
