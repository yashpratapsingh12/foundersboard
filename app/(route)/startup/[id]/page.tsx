import { startupTypeCard } from "@/app/components/StarupCard";
import { formatdate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound();
  return (
    <>
      <section className="w-full bg-[#EE2B69] !min-h-[230px] flex justify-center items-center flex-col py-10 px-6 ">
        <p className=" w-45  mx-auto  bg-[#FBE843] px-6 py-3 font-bold rounded-sm uppercase relative before:content-[''] before:absolute before:top-2 before:left-2 before:border-t-[10px] before:border-t-black before:border-r-[10px] before:border-r-transparent after:content-[''] after:absolute after:bottom-2 after:right-2 after:border-b-[10px] after:border-b-black after:border-l-[10px] after:border-l-transparent">
          {formatdate(post?._createdAt)}
        </p>
        <h1 className="w-full bg-black text-white w-80 mx-auto text-center rounded-sm px-3 py-5 mt-2 uppercase font-bold">
          {post.title}
        </h1>
        <p className="text-white text-center mt-2 font-semibold ">
          {post.description}
        </p>
      </section>
      <section className="px-6 py-10">
        <img
          src={post.image}
          alt="thumbnail"
          className=" mx-auto  w-auto h-auto rounded-xl"
        />
        <div>
          <div>
            <Link href={``}>
              <Image src={post.author.image} alt="user" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
