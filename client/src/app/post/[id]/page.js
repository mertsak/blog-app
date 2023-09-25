"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState("");
  const params = useParams();
  const { data: session, status } = useSession();

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(
        `http://localhost:3002/getPost/${params.id}`
      );
      setPost(data);
    };

    getPost();
  }, []);

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

  function getPathAfterPublic(filePath) {
    const publicIndex = filePath.indexOf("public");
    if (publicIndex !== -1) {
      return filePath.slice(publicIndex + "public".length + 1);
    } else {
      return filePath;
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/deletePost/${post._id}`);
      toast.success("post başarıyla silindi");
      router.push("/");
    } catch (error) {
      toast.error("post silinirken bir hata oluştu");
    }
  };

  return (
    <>
      {post && (
        <div
          className="height-100vh flex-col flex justify-start items-center gap-8 mt-10 "
          key={post._id}
        >
          {session?.user.username === post.author && (
            <div className="flex justify-center items-center gap-4">
              <Link
                href={`/editPost/${post._id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-300"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete()}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded duration-300"
              >
                Delete
              </button>
            </div>
          )}

          <Image
            className="rounded-md w-full h-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] min-w-[300px] max-h-[400px]"
            width={500}
            height={500}
            src={`/${getPathAfterPublic(post.cover)}`}
            alt=""
          />

          <div className="flex flex-col justify-start items-start gap-4 max-w-[400px] sm:max-w-[500px] md:max-w-[600px] bg-gray-200 p-6 rounded-md">
            <h2 className="font-bold text-2xl">{post.title}</h2>

            <p className="flex justify-center items-center gap-2 text-sm font-bold text-gray-500">
              <span>{post.author}</span>
              <time>
                {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>

            <p className="text-lg">{post.summary}</p>

            <p className="text-lg"> {post.content} </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
