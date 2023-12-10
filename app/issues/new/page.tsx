"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

type pageProps = {};

const NewIssuePage: React.FC<pageProps> = () => {
  return (
    <div className="max-w-xl space-y-7">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea rows={5} variant="soft" placeholder="Description" />

      <Button>Submit issue</Button>
    </div>
  );
};
export default NewIssuePage;
