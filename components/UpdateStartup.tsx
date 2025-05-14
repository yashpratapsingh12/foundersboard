"use client";

import React from "react";
import { useRouter } from "next/navigation";

const UpdateStartup = ({ id }: { id: string | undefined }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/startup/update");
  };

  return <button onClick={handleClick}>Edit</button>;
};

export default UpdateStartup;
