import Image from "@/node_modules/next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-white">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-1 col-span-2 ml-0">
          <Link href={"/"}>
            <Image
              src={"/header/logo.svg"}
              alt="logo"
              width={200}
              height={40}
              className="h-16 w-auto"
            />
          </Link>
        </div>
        <div className="col-start-3 col-span-1 my-auto">
          <div className="border-l-2 justify-self-center hover:opacity-40">
            <Link href={"/createPost"}>
              <div className="pl-2 flex ">
                <Image
                  src={"/header/pen-tool.svg"}
                  alt="pen-tool"
                  width={5}
                  height={5}
                  className="h-5 w-auto"
                />
                <p>投稿する</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-start-4 col-span-1 mx-auto my-auto">
          <div className="border-l-2 justify-self-center hover:opacity-40">
            <Link href={"/search"}>
              <div className="pl-2 flex">
                <Image
                  src={"/header/search.svg"}
                  alt="search"
                  width={5}
                  height={5}
                  className="h-5 w-auto"
                />
                <p>検索する</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-start-6 col-span-1 mx-auto my-auto">アイコン</div>
      </div>
    </header>
  );
}
