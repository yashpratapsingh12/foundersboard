"use client";
import Link from "next/link";

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
        <Link href="/">X</Link>
      </button>
    </div>
  );
};

export default SearchFormReset;
