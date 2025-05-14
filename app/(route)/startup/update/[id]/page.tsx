import UpdateStartup from "@/components/UpdateStartup";
import React from "react";
import { auth } from "@/auth";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const PostID = (await params).id;

  const session = await auth();

  return (
    <div>
      <UpdateStartup id={session?.id} PostID={PostID} />
    </div>
  );
};

export default page;
