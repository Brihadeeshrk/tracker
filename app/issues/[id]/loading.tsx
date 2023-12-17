import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetail: React.FC = () => {
  return (
    <div className="space-y-7">
      <Skeleton width="30%" className="h-10" />
      <Skeleton width="50%" className="h-32" />
    </div>
  );
};
export default LoadingIssueDetail;
