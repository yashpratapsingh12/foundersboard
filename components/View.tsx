import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIWS_QUERY } from "@/sanity/lib/queries";
import { writeclient } from "@/sanity/lib/write-client";
import { after } from "next/server";

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
  console.log("skdqoje", totalViews);

  return (
    <div>
      <div>
        <Ping />
      </div>

      <p>
        <span>{totalViews}</span>
      </p>
    </div>
  );
};

export default View;
