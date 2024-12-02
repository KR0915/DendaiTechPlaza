'use client';
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

export function ProfileSidebar() {
    const { toggleSidebar } = useSidebar()
    const isDesktop = useMediaQuery("(min-width: 768px)");
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

    const handleItemClick = () => {
        if (!isDesktop) {
            toggleSidebar();
        }
    };

    return (
        <Sidebar className="">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="mt-16">
                        {items.map((item) => (
                            <SidebarMenuItem onClick={handleItemClick}key={item.key}>
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
