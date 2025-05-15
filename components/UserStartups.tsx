import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StarupCard, { startupTypeCard } from "./StarupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

const UserStartups = async ({ id }: { id: string }) => {
  // const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  const { data: startups } = await sanityFetch({
    query: STARTUPS_BY_AUTHOR_QUERY,
    params: {
      id,
    },
  });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startups: startupTypeCard) => (
          <StarupCard key={startups._id} id={id} Posts={startups} />
        ))
      ) : (
        <p>No Post Yet</p>
      )}
    </>
  );
  <SanityLive />;
};

export default UserStartups;
