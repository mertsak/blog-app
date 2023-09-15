"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreatePost = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session);
  console.log(status);

  useEffect(() => {
    if (status === "loading") {
      // Oturum yükleniyor, bekleyin.
      return;
    }

    if (!session) {
      toast.error("post oluşturabilmek için önce giriş yapmalısınız");
      router.push("/login");
    }
  }, [session, status, router]);

  return <div className="height-100vh">CreatePost</div>;
};

export default CreatePost;
