import Image from "next/image";

const Post = () => {
  return (
    <div className="flex-col flex lg:flex-row justify-center items-center gap-8">
      <Image
        className="rounded-md w-full h-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] min-w-[300px]"
        width={500}
        height={500}
        src="/post-1.jpg"
        alt=""
      />

      <div className="flex flex-col justify-start items-start gap-4 max-w-[400px] sm:max-w-[500px] md:max-w-[600px]">
        <h2 className="font-bold text-2xl">Lorem ipsum dolor sit amet.</h2>

        <p className="flex justify-center items-center gap-2 text-sm font-bold text-gray-500">
          <a href="#">Mert Sakınç</a>
          <time>2023-01-06 16:45</time>
        </p>

        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
          architecto non itaque ut sed dolores officiis minus odit sunt cum?
        </p>
      </div>
    </div>
  );
};

export default Post;
