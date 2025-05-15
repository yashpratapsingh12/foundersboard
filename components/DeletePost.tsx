"use client";

import React from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { toast } from "sonner";
import { writeclient } from "@/sanity/lib/write-client";
import { deletePost } from "@/lib/Action";

const DeletePost = ({ postid }: { postid: string }) => {
  const handleClick = async () => {
    const res = deletePost(postid);
  };
  return (
    <>
      <Button onClick={handleClick}>Delete</Button>
    </>
  );
};

export default DeletePost;
