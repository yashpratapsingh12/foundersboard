"use client";

import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import React from "react";

const UpdateStartup = ({
  id,
  PostID,
}: {
  id: string | undefined;
  PostID: string;
}) => {
  const post = client.fetch(STARTUP_BY_ID_QUERY, { id: PostID });

  console.log(post);

  return <div></div>;
};

export default UpdateStartup;
