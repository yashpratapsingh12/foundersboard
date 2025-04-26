import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/dist/server/api-utils";
const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" width={144} height={30} />
        </Link>
        <div className=" flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link className="font-work-sans" href="/startup/create">
                <span>create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button>SignOut</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
