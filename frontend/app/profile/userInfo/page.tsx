import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { getUser } from "@/utils/dendaitech/User/GET/UserGET";
import Image from "@/node_modules/next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function userInfo() {
    const user = await getUser();

    return (
        <SidebarProvider>
            {/* サイドバー */}
            <ProfileSidebar />
            <div className="p-8 container">
                {/* アイコン画像 */}
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

                <form>
                    <Label className="font-bold">ユーザー名</Label>
                    <Input className="w-3/6"></Input>
                    <Label className="font-bold">メールアドレス</Label>
                    <Input className="w-3/6"></Input>
                    <Label className="font-bold">パスワード</Label>
                    <Input className="w-3/6"></Input>
                    
                    <Button className="mt-8 bg-DendaiTechBlue">変更</Button>
                </form>
            </div>
        </SidebarProvider>
    );
}
