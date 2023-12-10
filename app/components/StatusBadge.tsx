import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import React from "react";

type StatusBadgeProps = {
  type: Status;
};

type BadgeColor = "blue" | "violet" | "green";

const statusMap: Record<Status, { label: string; color: BadgeColor }> = {
  CLOSED: { color: "green", label: "Closed" },
  IN_PROGRESS: { color: "violet", label: "In Progress" },
  OPEN: { color: "blue", label: "Open" },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ type }) => {
  return <Badge color={statusMap[type].color}>{statusMap[type].label}</Badge>;
};

export default StatusBadge;
