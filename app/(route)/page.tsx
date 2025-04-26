import Image from "next/image";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>
      <section className="w-full bg-[#EE2B69] min-h-[530px] flex justify-center items-center flex-col py-10 px-6  ">
        <h1 className="uppercase bg-black px-6 py-10 font-extrabold  text-white text-3xl md:text-3xl text-center my-2 w-full mx-auto ">
          Pitch Your Startup
          <br /> Connect with Entrepreneur
        </h1>
        <p className="font-medium text-white text-[20px] text-center">
          Submit Ideas , Vote on Pitches ,and Get Noticed in Virtual
        </p>
        <SearchForm />
      </section>
    </>
  );
}
