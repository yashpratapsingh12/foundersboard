"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../assets/public/logo.png";
import { signIn, signOut } from "@/auth";
import { useTransition } from "react";
import { log } from "../lib/Action";

const NavbarClient = ({ session }: { session: any }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link className="font-work-sans" href="/startup/create">
                <span>create</span>
              </Link>
              {/* 
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                </button>
              </form> */}

              <Link href={`/user/${session.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form action={log}>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarClient;
