import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIWS_QUERY } from "@/sanity/lib/queries";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIWS_QUERY, { id });
  //todo
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
