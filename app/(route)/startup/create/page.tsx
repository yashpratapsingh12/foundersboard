import { auth } from "@/auth";

import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  console.log("hello");
  return (
    <>
      <section className="w-full bg-[#EE2B69] !min-h-[230px]">
        <h1 className="uppercase bg-black  py-3 font-extrabold  text-white text-3xl md:text-3xl text-center my-2 w-full mx-auto  ">
          Submit Your Startups
        </h1>
      </section>
      <StartupForm />
    </>
  );
};

export default page;
