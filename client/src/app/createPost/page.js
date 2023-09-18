"use client";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import axios from "axios";

const CreatePost = () => {
  const [author, setAuthor] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // Oturum yükleniyor, bekleyin.
      return;
    }

    if (!session) {
      toast.error("post oluşturabilmek için önce giriş yapmalısınız");
      router.push("/login");
    } else {
      setAuthor(session?.user?.username);
    }
  }, [session, status, router]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  console.log(session);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("author", author);

    await axios
      .post("http://localhost:3002/create ", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("post başarıyla oluşturuldu");
        }

        router.push("/");
      })
      .catch((err) => {
        if (err) {
          toast.error("post oluşturulurken bir hata oluştu");
        }
      });
  };

  return (
    <div className="height-100vh">
      <form
        onSubmit={handleSubmit}
        className="flex justify-start items-start flex-col space-y-6 mt-10 w-1/4 lg:w-1/3 min-w-[350px] max-w-[600px] m-auto"
      >
        <input
          type="text"
          placeholder="Title"
          className="input-style"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          className="input-style"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          accept="image/*"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <ReactQuill
          className="w-full"
          modules={modules}
          formats={formats}
          value={content}
          onChange={setContent}
        />
        <button className="bg-black py-2 rounded-md hover:bg-white text-white hover:text-black duration-300 w-full">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
