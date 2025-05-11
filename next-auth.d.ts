import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id?: string; // 👈 Add your custom property here
  }

  interface JWT {
    id?: string;
  }
}