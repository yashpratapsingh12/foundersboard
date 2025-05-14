import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StarupCard, { startupTypeCard } from "./StarupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
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
};

export default UserStartups;
