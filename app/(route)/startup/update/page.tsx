import UpdateStartup from "@/components/UpdateStartup";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div>
      <UpdateStartup id={id} />
    </div>
  );
};

export default page;
