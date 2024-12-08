import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaGithub } from "react-icons/fa";


const Navbar = async () => {
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center text-black">
        <Link href="/">
          <img src="/logo_new.png" alt="logo" width={180} height={30} />
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden font-semibold ">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden font-semibold ">LogOut</span>
                  <LogOut className="size-6 sm:hidden text-red-500 mt-[6px]" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                    className="size-10 rounded-full"
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
              >
                <FaGithub className="w-5 h-5 mr-2" />
                Sign in with GitHub
              </button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
