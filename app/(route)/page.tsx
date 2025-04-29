import Image from "next/image";
import SearchForm from "../components/SearchForm";
import StarupCard, { startupTypeCard } from "../components/StarupCard";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  // const Posts = await client.fetch(STARTUP_QUERY);
  const { data: Posts } = await sanityFetch({ query: STARTUP_QUERY, params });

  return (
    <>
      <section className="w-full bg-[#EE2B69] min-h-[530px] flex justify-center items-center flex-col py-10 px-6  ">
        <h1 className="uppercase bg-black px-6 py-10 font-extrabold  text-white text-3xl md:text-3xl text-center my-2 w-full mx-auto ">
          Pitch Your Startup
          <br /> Connect with Entrepreneur
        </h1>
        <p className="font-medium text-white text-[20px] text-center">
          Submit Ideas , Vote on Pitches ,and Get Noticed in Virtual
        </p>
        <SearchForm query={query} />
      </section>
      <section className="ml-3 mt-5">
        <p className="text-xl font-semibold">
          {query ? `Searhc results for ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 grid grid-cols-1 md:grid-cols-3">
          {Posts.length > 0 ? (
            Posts.map((item: startupTypeCard) => (
              <StarupCard key={item?._id} Posts={item} />
            ))
          ) : (
            <p className="">No straups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
