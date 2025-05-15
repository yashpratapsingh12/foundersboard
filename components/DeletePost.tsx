"use client";

import React from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { toast } from "sonner";

const DeletePost = ({ postid }: { postid: string }) => {
  const handleClick = async () => {
    await client.delete(postid);
    toast.success("Startup has been deleted");
  };
  return (
    <>
      <Button onClick={handleClick}>Delete</Button>
    </>
  );
};

export default DeletePost;
