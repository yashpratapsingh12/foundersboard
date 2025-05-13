import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIWS_QUERY } from "@/sanity/lib/queries";
import { writeclient } from "@/sanity/lib/write-client";
import { after } from "next/server";
import { EyeIcon } from "lucide-react";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIWS_QUERY, { id });

  after(
    async () =>
      await writeclient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="flex justify-end items-center mt-5 ">
      <div>
        <EyeIcon />
      </div>

      <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize">
        <span className="font-black">{totalViews}</span>
      </p>
    </div>
  );
};

export default View;
