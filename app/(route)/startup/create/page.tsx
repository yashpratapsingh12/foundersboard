import { auth } from "@/auth";

import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <div>
        <section className="w-full bg-[#EE2B69] min-h-[230px] pattern flex justify-center items-center flex-col py-10 px-6">
          <h1 className="uppercase bg-black   py-8 font-extrabold  text-white text-3xl md:text-3xl text-center my-2 w-full mx-auto rounded full   ">
            Submit Your Startups
          </h1>
        </section>
        <StartupForm />
      </div>
    </>
  );
};

export default page;
