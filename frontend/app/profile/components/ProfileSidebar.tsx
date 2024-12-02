import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";

export function ProfileSidebar() {
    const items = [
        {
            label: "プロフィール編集",
            key: "info",
            url: "/profile/userInfo",
        },
        {
            label: "投稿一覧",
            key: "post",
            url: "/profile/userPost",
        },
        {
            label: "いいね一覧",
            key: "bookmark",
            url: "/profile/userBookmark",
        },
    ];

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.key}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}>{item.label}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
