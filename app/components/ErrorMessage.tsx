import { Text } from "@radix-ui/themes";
import React from "react";

type ErrorMessageProps = {
  message: string | undefined;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Text color="red" as="p">
      {message}
    </Text>
  );
};
export default ErrorMessage;
