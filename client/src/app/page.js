"use client";
import Post from "@/components/Post";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // Oturum yükleniyor, bekleyin.
      return;
    }

    if (!session) {
      toast.error("Anasayfaya giriş yapabilmek için önce giriş yapmalısınız");
      router.push("/login");
    }
  }, [session, status, router]);

  return (
    <main className="py-10 px-10 lg:px-20 flex justify-center items-center flex-col space-y-16 lg:space-y-12">
      <Post />
      <Post />
      <Post />
    </main>
  );
}
