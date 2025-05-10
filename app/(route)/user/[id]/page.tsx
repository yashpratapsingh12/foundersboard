import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Session } from "inspector/promises";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { StartupCardSkeleton } from "@/components/StarupCard";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  const session = await auth();

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <section>
        <div>
          <div>
            <h3>{user?.name}</h3>
          </div>
          <Image src={user?.image} alt={user.name} width={220} height={220} />
          <p>@{user.username}</p>
          <p>{user?.bio}</p>
        </div>
        <div>
          <p>{session?.id === id ? "Your" : "All"} Startups</p>
          <ul>
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default page;
