import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav>
        <Link href="/">
          <Image src={logo} alt="logo" width={144} height={30} />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
