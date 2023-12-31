import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get("http://localhost:3002/getPosts");
      setPosts(data);
    };

    getPosts();
  }, []);

  function getPathAfterPublic(filePath) {
    const publicIndex = filePath.indexOf("public");
    if (publicIndex !== -1) {
      return filePath.slice(publicIndex + "public".length + 1);
    } else {
      return filePath;
    }
  }

  return (
    <div className="flex-col flex justify-center items-center gap-8">
      {posts.map((post) => {
        return (
          <div className="bg-gray-200 p-6 rounded-md" key={post._id}>
            <Link href={`post/${post._id}`}>
              <Image
                className="rounded-md w-full h-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] min-w-[300px]"
                width={500}
                height={500}
                src={`/${getPathAfterPublic(post.cover)}`}
                alt=""
              />

              <div className="flex flex-col justify-start items-start gap-4 max-w-[400px] sm:max-w-[500px] md:max-w-[600px]">
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
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
