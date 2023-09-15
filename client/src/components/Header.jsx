"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center h-[80px] px-5">
      <Link href="/" className="font-bold text-2xl">
        MyBlog
      </Link>

      {status === "authenticated" ? (
        <div className="flex justify-center items-center gap-6">
          <div className="font-bold">{session.user.username}</div>

          <div className="font-bold">
            <Link href="/createPost">Create New Post</Link>
          </div>

          <div className="cursor-pointer" onClick={() => signOut()}>
            Sign Out
          </div>
        </div>
      ) : (
        <nav className="flex justify-center items-center space-x-8 text-lg">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
