'use client';
import { Button } from "@/components/ui/button";
import Image from "@/node_modules/next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function Header() {
  const { data: session } = useSession();

  return (
      <header className="bg-white fixed top-0 left-0 right-0 z-50 border-b shadow-sm">
        <div className="flex my-auto">
          <div className="ml-2 flex space-x-2">
            <div className="my-auto">
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
            <div className="my-auto">
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
                    <p className="hidden md:block">投稿する</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="my-auto">
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
                    <p className="hidden md:block">検索する</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:mr-2 ml-auto my-auto">
            {session?.accessToken ?
              <Link href={"/profile/userInfo"}>
                <div className="relative w-14 h-14 p-2">
                  <Image
                    src={`/api/get-icon?id=${session.user.id}`}
                    alt="アバター"
                    fill
                    sizes="56px"
                    style={{
                      objectFit: "contain",
                    }}
                    className="hover:opacity-75 rounded-full"
                  />
                </div>
              </Link>
              :
              <div className="ml-auto mr-1 md:mr-2 space-x-2 flex">
                <Link href={"/register"}>
                  <Button type="button" className="max-md:w-20 bg-DendaiTechBlue hover:bg-DendaiTechBlue/75"><p className="max-w-md:text-xs">新規登録</p></Button>
                </Link>
                <Link href={"/signin"}>
                  <Button variant={"outline"} type="button" className="max-md:w-20"><p className="max-w-md:text-xs">ログイン</p></Button>
                </Link>
              </div>
            }
          </div>
        </div>
      </header>
  );
}
