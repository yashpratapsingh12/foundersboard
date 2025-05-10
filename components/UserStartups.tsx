import { client } from "@/sanity/lib/client";
import React from "react";

const UserStartups = async ({ param }: { param: Promise<{ id: string }> }) => {
  const startups = await client.fetch(Author);
  return <div></div>;
};

export default UserStartups;
