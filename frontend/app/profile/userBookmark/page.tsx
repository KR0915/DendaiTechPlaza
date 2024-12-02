import { SidebarProvider } from "@/components/ui/sidebar";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { BookmarkList } from "./components/BookmarkList";

export default async function userBookmark() {
    return (
        <SidebarProvider>
            <ProfileSidebar />
            <div className="p-8 container">
                <h1 className="text-2xl font-bold mb-6">ブックマークした投稿</h1>
                <BookmarkList />
            </div>
        </SidebarProvider>
    );
}
