"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn("credentials", {
      username,
      password,
      redirect: false,
    }).then((res) => {
      if (res.error) {
        toast.error("lütfen önce kayıt olunuz");
      } else {
        toast.success("giriş işlemi başarılı anasayfaya yönlendirildiniz");
        router.push("/");
      }
    });
  };

  return (
    <div className="height-100vh flex justify-center items-center">
      <form
        className="bg-gray-200 flex justify-center items-center flex-col space-y-6 w-1/4 lg:w-1/3 rounded-md py-10 px-4 lg:px-8 mt-10 min-w-[350px] max-w-[500px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-center my-4">LOGIN</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-style"
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-style"
          type="password"
          placeholder="password"
        />
        <button className="bg-white px-4 py-2 rounded-md hover:bg-black hover:text-white duration-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
