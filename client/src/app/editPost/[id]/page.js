"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import { useParams } from "next/navigation";

const EditPost = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [author, setAuthor] = useState("");

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

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(
        `http://localhost:3002/getPost/${params.id}`
      );
      setTitle(data.title);
      setSummary(data.summary);
      setContent(data.content);
      setImage(data.image);
    };

    getPost();
  }, []);

  const updateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    formData.append("author", author);

    await axios
      .put(`http://localhost:3002/updatePost/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("post başarıyla güncellendi");
          router.replace(`/post/${params.id}`);
        } else {
          toast.error("post güncellenirken bir hata oluştu");
        }
      });
  };

  return (
    <div className="height-100vh">
      <form
        onSubmit={updateSubmit}
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
          Edit Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
