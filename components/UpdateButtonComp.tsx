"use client";

import React from "react";
import { useRouter } from "next/navigation";
const UpdateButtonComp = () => {
  const route = useRouter();

  const handleClick = () => {};
  return (
    <div>
      <button onClick={handleClick}>Fuck</button>
    </div>
  );
};

export default UpdateButtonComp;
