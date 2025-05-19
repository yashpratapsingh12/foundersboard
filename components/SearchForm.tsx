import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className=" w-80 text-center bg-white uppercase font-bold rounded-2xl mt-5 py-3 border-3 border-black flex justify-between search-form"
    >
      <input
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="text-center focus:outline-none focus:placeholder-transparent"
      />
      <div className="flex gap-1">
        {query && <SearchFormReset />}

        <button
          type="submit"
          className="rounded-full bg-black p-3 py-2 text-white mr-1"
        >
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
