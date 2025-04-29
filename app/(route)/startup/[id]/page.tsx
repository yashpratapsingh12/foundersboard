import { startupTypeCard } from "@/app/components/StarupCard";
import { formatdate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound();
  return (
    <>
      <section className="w-full bg-[#EE2B69] !min-h-[230px]">
        <p className="bg-[#FBE843]">{formatdate(post?._createdAt)}</p>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </section>
      <div className="text-3xl">{post.title}</div>
    </>
  );
};

export default page;
