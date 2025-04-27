"use client";
import Link from "next/link";
import { X } from "lucide-react";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <div>
      <button
        className="rounded-full bg-black text-white p-3 py-2"
        onClick={reset}
      >
        <Link href="/">
          <X className="size-5" />
        </Link>
      </button>
    </div>
  );
};

export default SearchFormReset;
