import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { PostList } from "./components/PostList";

export default function userPost() {
    return (
        <SidebarProvider>
            <ProfileSidebar />
            <div className="p-8 container">
                <h1 className="text-2xl font-bold mb-6">自分の投稿</h1>
                <PostList />
            </div>
        </SidebarProvider>
    );
}
