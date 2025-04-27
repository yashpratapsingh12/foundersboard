import React from "react";
import Form from "next/form";

const SearchForm = () => {
  const query = "test";
  const reset = () => {};
  return (
    <Form
      action="/"
      scroll={false}
      className=" w-80 text-center bg-white uppercase font-bold rounded-2xl mt-5 py-3 border-3 border-black"
    >
      <input name="query" defaultValue={query} placeholder="Search Starups" />
      <div>{query && <button type="reset" onClick={reset}></button>}</div>
    </Form>
  );
};

export default SearchForm;
