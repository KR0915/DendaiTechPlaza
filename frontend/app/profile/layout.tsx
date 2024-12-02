import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProfileSidebar } from "./components/ProfileSidebar";
import CustomTrigger from "./components/custom-slidebar-trigger";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <ProfileSidebar />
            <SidebarInset>
                <CustomTrigger />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}