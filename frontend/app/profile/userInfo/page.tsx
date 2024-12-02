import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "@/node_modules/next/image";
import { getUser } from "@/utils/dendaitech/User/GET/UserGET";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function userInfo() {
    const user = await getUser();

    return (
        <div>
            {/* サイドバー */}
            <div className="p-8 container">
                {/* アイコン画像 */}
                <Suspense fallback={<div><Loader2 size={"56"} className="animate-spin" /></div>}>

                    <div className="relative w-28 h-28 p-2">
                        <Image
                            src={`/api/get-icon?id=${user.userId}`}
                            alt="アバター"
                            fill
                            sizes="56px"
                            style={{
                                objectFit: "contain",
                                padding: "2px",
                            }}
                            className="rounded-full"
                        />
                    </div>
                </Suspense>


                <form className="max-w-screen-md">
                    <Label className="font-bold">ユーザー名</Label>
                    <Input></Input>
                    <Label>メールアドレス</Label>
                    <Input></Input>
                    <Label>パスワード</Label>
                    <Input></Input>
                    <div className="flex">
                        <Button className="ml-auto mt-8 bg-DendaiTechBlue">変更</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
